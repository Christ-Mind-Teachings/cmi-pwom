import store from "store";
import axios from "axios";
import notify from "toastr";
import {status} from "./status";
const transcript = require("./key");

let config; //the current configuration, initially null, assigned by getConfig()

// runtime environment; standalone or integration
// set during initialization
let env = {
  SID: 0,
  BID: 0,
  UID: 1,
  environment: "",
  prefix: "",                       //prefix for non standalone url's
  timingBase: "/public/timing",     //location of audio timing files
  configUrl: "/standalone/config",  //location of book config files
  configStore: "config."            //location of configuration files
};

/*
 * The status contains the save date for each config file. We compare that to the saveDate
 * in the locally stored config file. If it's different or doesn't exist we need to get
 * a new version.
 *
 * return: true - get a new version
 *         false - use the one we've got
 */
function refreshNeeded(cfg) {
  let saveDate = status[cfg.bid];

  if (cfg.saveDate && cfg.saveDate === saveDate) {
    return false;
  }

  cfg.saveDate = saveDate;
  return true;
}

//get config file
function requestConfiguration(url) {
  return axios.get(url);
}

/*
  Fetch audio timing data
*/
export function fetchTimingData(url) {
  return new Promise((resolve, reject) => {
    axios.get(`${env.timingBase}${url}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
  We use book level configuration that is loaded by request via AJAX. Once
  loaded the config is persisted in local storage. A check is made for
  configuration data loaded from storage to determine if the data needs to
  be reloaded. This is indicated using Define-webpack-plugin to set the timestamp
  of configurations that have changed.

  args:
    book: the book identifier, woh, wot, etc
    assign: when true, assign global variable 'config' to retrieved data
*/
export function getConfig(book, assign = true) {
  return new Promise((resolve, reject) => {
    let cfg = store.get(`${env.configStore}${book}`);
    let url;

    //if config in local storage check if we need to get a fresh copy
    if (cfg && !refreshNeeded(cfg)) {
      if (assign) {
        config = cfg;
      }
      resolve(cfg);
      return;
    }

    //get config from server
    url = `${env.configUrl}/${book}.json`;
    requestConfiguration(url)
      .then((response) => {
        //add save date before storing
        response.data.saveDate = status[response.data.bid];
        store.set(`${env.configStore}${book}`, response.data);
        if (assign) {
          config = response.data;
        }
        resolve(response.data);
      })
      .catch(() => {
        config = null;
        reject(`Config file: ${url} is not valid JSON`);
      });
  });
}

/*
  For transcript pages; load the configuration file.
  For non-transcript pages; configuration is loaded by getConfig()

  This is the same as getConfig() except it doesn't resolve passing the data
  but a message indicating source of the configuration file
*/
export function loadConfig(book) {
  return new Promise((resolve, reject) => {
    let cfg = store.get(`${env.configStore}${book}`);
    let url;

    //if config in local storage check if we need to get a fresh copy
    if (cfg && !refreshNeeded(cfg)) {
      config = cfg;
      resolve("config read from cache");
      return;
    }

    //get config from server
    url = `${env.configUrl}/${book}.json`;
    requestConfiguration(url)
      .then((response) => {
        //add save date before storing
        response.data.saveDate = status[response.data.bid];
        store.set(`${env.configStore}${book}`, response.data);
        config = response.data;
        resolve("config fetched from server");
      })
      .catch((error) => {
        config = null;
        reject(`Config file: ${url} is not valid JSON`);
      });
  });
}

/*
 * Get audio info from config file based on url
 */
export function getAudioInfo(url) {
  //check that config has been initialized
  if (!config) {
    throw new Error("Configuration has not been initialized");
  }

  let audioInfo = config.contents.find(p => {
    return url.startsWith(p.url);
  });

  if (!audioInfo) {
    notify.error("Configuration file error, didn't find url in file.");
    return {};
  }

  if (audioInfo.url !== url) {
    audioInfo = audioInfo.contents.find(p => {
      return p.url === url;
    });
  }

  if (!audioInfo) {
    notify.error("Level 2 Configuration file error, didn't find url in file.");
    return {};
  }

  audioInfo.audioBase = env.audioBase;
  return audioInfo;
}

/*
 * get timer info for the current page
 */
export function getReservation(url) {
  let audioInfo = getAudioInfo(url);

  if (audioInfo.timer) {
    return audioInfo.timer;
  }

  return null;
}

/*
  Given a page key, return data from a config file

  returns: book title, page title, url and optionally subtitle.

  args:
    pageKey: a key uniquely identifying a transcript page
    data: optional, data that will be added to the result, used for convenience
*/
export function getPageInfo(pageKey, data = false) {
  let decodedKey = transcript.decodeKey(pageKey);
  let info = {pageKey: pageKey, source: env.title, bookId: decodedKey.bookId};

  if (data) {
    info.data = data;
  }

  return new Promise((resolve, reject) => {

    //invalid pageKey
    if (pageKey === -1) {
      info.bookTitle = "Book Title Unknown";
      info.title = "Title Unknown";
      info.url = "";
      resolve(info);
      return;
    }

    //get configuration data specific to the bookId
    getConfig(decodedKey.bookId, false)
      .then((data) => {
        if (!data) {
          info.bookTitle = "Book Title Unknown";
          info.title = "Title Unknown";
          info.url = "";
        }
        else {
          info.bookTitle = data.title;

          let unit = data.contents[decodedKey.uid];
          if (!unit) {
            info.title = `Title not found, pageKey: ${pageKey}, decodedKey: ${decodedKey}`;
            info.title = "";
          }
          else {

            if (decodedKey.hasQuestions) {
              let question;

              //this shouldn't happen but did once due to test data that got indexed and later
              //deleted but the index remained and caused the code to fail. Took me a long time to
              //find the problem.
              if (decodedKey.qid >= unit.questions.length) {
                console.log("invalid pageKey: %s, specifies out of range qid", pageKey);
                console.log("decodedKey: %o", decodedKey);
                question = unit.questions[unit.questions.length - 1];
              }
              else {
                question = unit.questions[decodedKey.qid];
              }
              info.title = unit.title;
              info.subTitle = question.title;
              info.url = question.url;
            }
            else {
              info.title = unit.title;
              info.url = unit.url;
            }
          }

          resolve(info);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
 * Set environment to standalone or integrated
 */
export function setEnv(constants) {
  env.configStore = constants.configStore;
  env.title = constants.title;
  env.audioBase = constants.audioBase;
  env.environment = constants.env;

  if (constants.env === "standalone") {
    return;
  }

  env.SID += 1;
  env.BID += 2;
  env.UID += 2;
  env.prefix = constants.url_prefix;
  env.timingBase = `${constants.url_prefix}${env.timingBase}`;
  env.configUrl = env.configUrl.replace("/standalone", `${constants.url_prefix}/public`);
  console.log("configUrl: %s", env.configUrl);
}



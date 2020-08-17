import {fetchConfiguration} from "www/modules/_util/cmi";
import axios from "axios";
import notify from "toastr";
import {status} from "./status";
import {getString} from "../_language/lang";
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
  configUrl: "/standalone/config"  //location of book config files
};

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

/**
 * Get the configuration file for 'book'. If it's not found in
 * the cache (local storage) then get it from the server and 
 * save it in cache.
 *
 * @param {string} book - the book identifier
 * @param {boolean} assign - true if the config is to be assigned to global config variable
 * @returns {promise}
 */
export function getConfig(book, assign = true) {
  let lsKey = `cfg${book}`;
  let url = `${env.configUrl}/${book}.json`;

  return new Promise((resolve, reject) => {
    fetchConfiguration(url, lsKey, status).then((resp) => {
      if (assign) {
        config = resp;
      }
      resolve(resp);
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * Load the configuration file for 'book'. If it's not found in
 * the cache (local storage) then get it from the server and 
 * save it in cache.
 *
 * @param {string} book - the book identifier
 * @returns {promise}
 */
export function loadConfig(book) {
  let lsKey = `cfg${book}`;
  let url = `${env.configUrl}/${book}.json`;

  //"book" is a single page, no configuration
  if (!book) {
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    fetchConfiguration(url, lsKey, status)
      .then((resp) => {
        config = resp;
        resolve(true);
      })
      .catch((error) => {
        config = null;
        console.error(error);
        reject(error);
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
    notify.error(getString("error:e4"));
    return {};
  }

  if (audioInfo.url !== url) {
    audioInfo = audioInfo.contents.find(p => {
      return p.url === url;
    });
  }

  if (!audioInfo) {
    notify.error(getString("error:e4"));
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

function pageInfo(decodedKey, contents) {

  let url = transcript.getUrl(decodedKey.key, true);

  let info = contents.find(p => {
    return url.startsWith(p.url);
  });

  if (!info) {
    return {title: "not found", url:""};
  }

  if (info.url !== url) {
    info = info.contents.find(p => {
      return p.url === url;
    });
  }

  if (!info) {
    return {title: "not found", url:""};
  }

  return info;
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
      info.bookTitle = getString("label:l1");
      info.title = getString("label:l2");
      info.url = "";
      resolve(info);
      return;
    }

    //get configuration data specific to the bookId
    getConfig(decodedKey.bookId, false)
      .then((data) => {
        if (!data) {
          info.bookTitle = getString("label:l1");
          info.title = getString("label:l2");
          info.url = "";
        }
        else {
          let pi = pageInfo(decodedKey, data.contents);

          info.bookTitle = data.title;
          info.title = pi.title;
          info.url = pi.url;

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
}



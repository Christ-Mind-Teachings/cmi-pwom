import notify from "toastr";

import {fetchConfiguration} from "common/modules/_ajax/config";
import {gs} from "common/modules/_language/lang";

import {status} from "./status";
const transcript = require("./key");

let g_sourceInfo;
let config; //the current configuration, initially null, assigned by getConfig()

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
  let url = `${g_sourceInfo.configUrl}/${book}.json`;

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
  let url = `${g_sourceInfo.configUrl}/${book}.json`;

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
    notify.error(gs("error:e4", "Configuration file error, didn't find url in file."));
    return {};
  }

  if (audioInfo.url !== url) {
    audioInfo = audioInfo.contents.find(p => {
      return p.url === url;
    });
  }

  if (!audioInfo) {
    notify.error(gs("error:e4", "Configuration file error, didn't find url in file."));
    return {};
  }

  audioInfo.audioBase = g_sourceInfo.audioBase;
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
export function getPageInfo(page, data = false) {
  let decodedKey;
  let pageKey;

  /*
   * Convert arg: page to pageKey if it is passed in as a url
   */
  if (typeof page === "string" && page.startsWith("/t/")) {
    pageKey = transcript.genPageKey(page);
  }
  else {
    pageKey = page;
  }

  decodedKey = transcript.decodeKey(pageKey);
  let info = {pageKey: pageKey, source: g_sourceInfo.title, bookId: decodedKey.bookId};

  if (data) {
    info.data = data;
  }

  return new Promise((resolve, reject) => {

    //invalid pageKey
    if (pageKey === -1) {
      info.bookTitle = gs("label:l1", "Book Title Unknown");
      info.title = gs("label:l2", "Title Unknown");
      info.url = "";
      resolve(info);
      return;
    }

    //get configuration data specific to the bookId
    getConfig(decodedKey.bookId, false)
      .then((data) => {
        if (!data) {
          info.bookTitle = gs("label:l1", "Book Title Unknown");
          info.title = gs("label:l2", "Title Unknown");
          info.url = "";
        }
        else {
          let pi = pageInfo(decodedKey, data.contents);

          info.bookTitle = data.title;
          info.title = pi.title;
          info.url = pi.url;

          //Rick added Feb 24, 2025
          info.audio = pi.audio;
          info.timing = pi.timing;
          info.audioBase = g_sourceInfo.audioBase;

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
export function setEnv(si) {
  g_sourceInfo = si;
}



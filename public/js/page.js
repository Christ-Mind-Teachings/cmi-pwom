/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"page": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/js";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendors~page~transcript","page~transcript"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../cmi-www/src/js/modules/_ajax/quotes.js":
/*!*************************************************!*\
  !*** ../cmi-www/src/js/modules/_ajax/quotes.js ***!
  \*************************************************/
/*! exports provided: getQuoteIds, getQuote, getQuoteData, putQuote, deleteQuote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuoteIds", function() { return getQuoteIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuote", function() { return getQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuoteData", function() { return getQuoteData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putQuote", function() { return putQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteQuote", function() { return deleteQuote; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../cmi-www/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "../cmi-www/src/js/globals.js");


/*
 * Get all quoteId's for userId and key
 *  where key is the first two or more positions of the page key
 *  ie, 10: WOM, etc
 */

function getQuoteIds(userId, key) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quoteKeys/${userId}/${key}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(resp => {
      resolve(resp.data.keys);
      return;
    }).catch(err => {
      console.error(err);
      reject(err);
      return;
    });
  });
}
/**
 * Get Quote by userId and quoteId
 *
 * @param {string} userId - md5 hash of users email address
 * @param {string} quoteId - the paragraph key and creationDate delimited by ":"
 * @returns {object} The requested quote
 */

function getQuote(userId, quoteId) {
  let [paraKey, creationDate] = quoteId.split(":");
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quote/${userId}/${paraKey}/${creationDate}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(resp => {
      resolve(resp.data.quote);
    }).catch(err => {
      notify.error("Network error: failed to get quote");
      reject(err);
    });
  });
}
/*
 * Get quote data from database. What returns doesn not contain a formatted
 * url of the source.
 */

function getQuoteData(userId, paraKey, creationDate) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quoteData/${userId}/${paraKey}/${creationDate}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(resp => {
      resolve(resp.data.quote);
    }).catch(err => {
      reject(err);
    });
  });
}
function putQuote(quote) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quote`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, quote).then(resp => {
      resolve(resp.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
function deleteQuote(userId, paraKey, creationDate) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quote/${userId}/${paraKey}/${creationDate}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(url).then(resp => {
      resolve(resp.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_topics/events.js":
/*!***************************************************!*\
  !*** ../cmi-www/src/js/modules/_topics/events.js ***!
  \***************************************************/
/*! exports provided: initQuoteDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initQuoteDisplay", function() { return initQuoteDisplay; });
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var _randomQuote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomQuote */ "../cmi-www/src/js/modules/_topics/randomQuote.js");
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./share */ "../cmi-www/src/js/modules/_topics/share.js");
/* harmony import */ var _ajax_quotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_ajax/quotes */ "../cmi-www/src/js/modules/_ajax/quotes.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles */ "../cmi-www/src/js/modules/_topics/styles.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");






const quoteMessageSelector = "#quote-modal-message";
let currentQuote;

function showLoading() {
  $("#quote-modal-more").addClass("loading");
}

function cancelLoading() {
  $("#quote-modal-more").removeClass("loading");
}

function generateOption(item) {
  let userInfo = item.userInfo;
  return `
      <option value="${userInfo.userId}">${userInfo.userName}</option>
  `;
}

function buildSelectList(quoteArray) {
  return `
    <label>Quote Sources</label>
    <select name="quote-source-list" id="user-quote-source-select" class="search ui dropdown">
      ${quoteArray.map(item => `${generateOption(item)}`).join("")}
    </select>
  `;
}

function showQuote(q) {
  //persist for shareByEmail
  currentQuote = q;
  let quote = q.quote;

  if (!q.quote) {
    cancelLoading();
    return;
  }

  if (!quote.includes("<p>")) {
    quote = `<p>${quote}</p>`;
  }

  let html = `
    <blockquote>
      ${quote}
      <footer>
        <a href="${q.url}" title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("quote:g2s")}" target="_blank">
          ~ ${q.citation}
        </a>
      </footer>
    </blockquote>
    `;
  $("#quote-modal-content").html(html).attr("class", `content ${Object(_styles__WEBPACK_IMPORTED_MODULE_4__["getRandomStyle"])()}`);
  cancelLoading();
}

function initSelect(qm) {
  let select = buildSelectList(qm.getInternalQuoteArray());
  $("#user-quote-select").html(select);
  $("#user-quote-source-select").on("change", function (e) {
    qm.use($(this).val());
  });
}

function loadQuotes(qm, constants, userInfo) {
  let systemQuoteIds = Object(_ajax_quotes__WEBPACK_IMPORTED_MODULE_3__["getQuoteIds"])(constants.quoteManagerId, constants.sourceId);

  if (userInfo && userInfo.userId !== constants.quoteManagerId) {
    let userQuoteIds = Object(_ajax_quotes__WEBPACK_IMPORTED_MODULE_3__["getQuoteIds"])(userInfo.userId, constants.sourceId);
    Promise.all([systemQuoteIds, userQuoteIds]).then(responses => {
      let q0 = new _randomQuote__WEBPACK_IMPORTED_MODULE_1__["RandomQuotes"](constants.quoteManagerName, constants.quoteManagerId, constants.sourceId);
      q0.qIds = responses[0];
      qm.addQuotes(q0);

      if (responses[1].length > 0) {
        let q1 = new _randomQuote__WEBPACK_IMPORTED_MODULE_1__["RandomQuotes"](userInfo.name, userInfo.userId, constants.sourceId);
        q1.qIds = responses[1];
        qm.addQuotes(q1); //use system quotes to start

        qm.use(constants.quoteManagerId); //build quote select list

        initSelect(qm);
      }
    });
  } else {
    systemQuoteIds.then(ids => {
      let q = new _randomQuote__WEBPACK_IMPORTED_MODULE_1__["RandomQuotes"](constants.quoteManagerName, constants.quoteManagerId, constants.sourceId);
      q.qIds = ids;
      qm.addQuotes(q);
    });
  }

  return qm;
}

function initQuoteDisplay(selector, constants) {
  let qm = new _randomQuote__WEBPACK_IMPORTED_MODULE_1__["QuoteManager"](); //must be signed in to share

  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_0__["getUserInfo"])(); //quote modal settings

  $("#quote-modal").modal({
    allowMultiple: true,
    dimmerSettings: {
      opacity: 0.3
    },
    blurring: true,
    autofocus: false,
    centered: true,
    duration: 400,
    closable: false,
    observeChanges: true,
    transition: "fade up",
    // Share by email
    onApprove: function () {
      return false;
    },
    //More button
    onDeny: function () {
      return true;
    }
  }); //if we're not in development add share to facebook button

  if (location.origin.includes("christmind")) {
    $("#quote-modal-facebook").removeClass("hidden");
  } //share available only to signed in users


  if (userInfo) {
    //initialize quote share
    Object(_share__WEBPACK_IMPORTED_MODULE_2__["initShareByEmail"])(constants); //share modal settings

    $("#share-modal").modal({
      allowMultiple: true,
      dimmerSettings: {
        opacity: 0.3
      },
      blurring: true,
      centered: true,
      duration: 400,
      closable: false,
      transition: "fade up",
      onApprove: function () {
        console.log("send email");
        return Object(_share__WEBPACK_IMPORTED_MODULE_2__["submitEmail"])(currentQuote);
      },
      onDeny: function () {
        console.log("cancel send email");
        return true;
      }
    });
    $("#share-modal").modal("attach events", "#quote-modal-share"); //show email share button

    $("#quote-modal-share").removeClass("hidden");
  }

  qm = loadQuotes(qm, constants, userInfo); //get another quote

  $("#quote-modal-more").on("click", function (e) {
    showLoading();
    qm.getRandomQuote().then(quote => {
      showQuote(quote);
    });
  }); //share quote to FB

  $("#quote-modal-facebook").on("click", function (e) {
    let q = currentQuote;
    let options = {
      method: "share",
      hashtag: "#christmind",
      quote: `${q.quote}\n${q.citation}`,
      href: `${location.origin.includes("localhost") ? "https://www.christmind.info" : location.origin}${q.url}`
    };
    FB.ui(options, function () {});
  }); //quote button click handler

  $(selector).on("click", function (e) {
    qm.getRandomQuote().then(quote => {
      showQuote(quote);
    });
    $("#quote-modal").modal("show");
    showLoading();
  });
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_topics/message.js":
/*!****************************************************!*\
  !*** ../cmi-www/src/js/modules/_topics/message.js ***!
  \****************************************************/
/*! exports provided: displayWarning, displaySuccess */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayWarning", function() { return displayWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displaySuccess", function() { return displaySuccess; });
/*
 * Display a message in a modal. The modal must have a 
 * <div class="ui message"></div>
 */

/*
 * Display a warning message for duration seconds
 */
function displayWarning(selector, message, duration = 0) {
  $(selector).removeClass("positive").addClass("warning").text(message);

  if (duration > 0) {
    setTimeout(() => {
      $(selector).addClass("hidden").removeClass("warning");
    }, duration * 1000);
  }
}
/*
 * Display a success message for duration seconds
 */

function displaySuccess(selector, message, duration = 5) {
  $(selector).removeClass("hidden").addClass("positive").text(message);

  if (duration > 0) {
    setTimeout(() => {
      $(selector).addClass("hidden").removeClass("positive");
    }, duration * 1000);
  }
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_topics/randomQuote.js":
/*!********************************************************!*\
  !*** ../cmi-www/src/js/modules/_topics/randomQuote.js ***!
  \********************************************************/
/*! exports provided: QuoteManager, RandomQuotes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuoteManager", function() { return QuoteManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RandomQuotes", function() { return RandomQuotes; });
/* harmony import */ var _ajax_quotes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/quotes */ "../cmi-www/src/js/modules/_ajax/quotes.js");


function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
/*
 * Manages quotes from more than one user
 *  - Quotes of type RandomQuotes are managed
 */


class QuoteManager {
  constructor() {
    this.quotes = [];
    this.ptr = -1;
  }

  getRandomQuote() {
    return this.quotes[this.ptr].getRandomQuote();
  }

  getInternalQuoteArray() {
    return this.quotes;
  }

  addQuotes(userQuotes) {
    let length = this.quotes.push(userQuotes);
    this.ptr = length - 1;
  } //use quotes from userId


  use(userId) {
    let index = this.quotes.findIndex(q => {
      return q.user === userId;
    });

    if (index > -1) {
      this.ptr = index;
    } else {
      throw new Error(`User: ${userId} not found.`);
    }
  }

}
class RandomQuotes {
  constructor(userName, userId, sourceId) {
    this.quoteIds = [];
    this.usedIds = [];
    this.quotes = {};
    this.userName = userName;
    this.userId = userId;
    this.sourceId = sourceId;
  }

  set qIds(idArray) {
    this.quoteIds = idArray;
  }

  get user() {
    return this.userId;
  }

  get userInfo() {
    return {
      userName: this.userName,
      userId: this.userId
    };
  }

  _resetUsed() {
    this.quoteIds = this.usedIds;
    this.usedIds = [];
  }

  markAsUsed(idx) {
    this.usedIds.push(this.quoteIds[idx]);
    this.quoteIds.splice(idx, 1);
  }

  getRandomQuote() {
    return new Promise((resolve, reject) => {
      if (this.quoteIds.length === 0) {
        if (this.usedIds.length === 0) {
          resolve({}); //no quotes

          return;
        }

        this._resetUsed();
      }

      let idx = _getRandomInt(this.quoteIds.length);

      let key = this.quoteIds[idx];

      if (this.quotes[key]) {
        this.markAsUsed(idx);
        resolve(this.quotes[key]);
        return;
      }

      Object(_ajax_quotes__WEBPACK_IMPORTED_MODULE_0__["getQuote"])(this.userId, key).then(quote => {
        this.quotes[key] = quote;
        this.markAsUsed(idx);
        resolve(quote);
      });
    });
  }

}

/***/ }),

/***/ "../cmi-www/src/js/modules/_topics/share.js":
/*!**************************************************!*\
  !*** ../cmi-www/src/js/modules/_topics/share.js ***!
  \**************************************************/
/*! exports provided: initShareByEmail, submitEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareByEmail", function() { return initShareByEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "submitEmail", function() { return submitEmail; });
/* harmony import */ var _ajax_share__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/share */ "../cmi-www/src/js/modules/_ajax/share.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message */ "../cmi-www/src/js/modules/_topics/message.js");
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_util/sanitize */ "../cmi-www/src/js/modules/_util/sanitize.js");
//import axios from "axios";
//import globals from "../../globals";





const quoteMessageSelector = "#quote-modal-message";
const shareMessageSelector = "#share-modal .message";
let shareInfo = {};
let sid;
function initShareByEmail(constants) {
  sid = constants.sid;
  loadEmailList();
}

function resetSendIndicator() {
  $("#quote-modal-share").addClass("loading blue").removeClass("red");
}

function setSendSuccess() {
  $("#quote-modal-share > i").removeClass("paper plane");
  $("#quote-modal-share > i").addClass("thumbs up");
  $("#quote-modal-share").removeClass("loading");
  setTimeout(() => {
    $("#quote-modal-share > i").removeClass("thumbs up");
    $("#quote-modal-share > i").addClass("paper plane");
  }, 2 * 1000);
}

function setSendFailure() {
  $("#quote-modal-share > i").removeClass("paper plane");
  $("#quote-modal-share > i").addClass("thumbs down");
  $("#quote-modal-share").removeClass("loading blue").addClass("red");
  setTimeout(() => {
    $("#quote-modal-share > i").removeClass("thumbs down");
    $("#quote-modal-share > i").addClass("paper plane");
  }, 2 * 1000);
}
/*
 * format message to wrap pargraphs in <p> tags
 */


function formatMessage(message) {
  message = message.replace(/\n/g, "@@");
  message = message.replace(/@@*/g, "@@");
  let mArray = message.split("@@");
  message = mArray.reduce((current, p) => {
    return `${current}<p>${Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_4__["purify"])(p)}</p>`;
  }, "");
  return message;
}
/*
 * Format recipientArray into a string of email addresses and
 * a structure of recipient variables per Mailgun
 */


function formatRecipientInfo(recipientArray) {
  let addresses = [];
  let info = {};
  recipientArray.forEach(i => {
    let [email, first, last] = i.split(":");
    addresses.push(email);
    info[email] = {
      first: first === "" ? "No First Name" : first,
      last: last === "" ? "No Last Name" : last
    };
  });
  return {
    to: addresses.join(","),
    variables: JSON.stringify(info)
  };
}

function submitEmail(q) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  let formData = $("#email-modal-share-form").form("get values");

  if (formData.mailList.length === 0 && formData.emailAddresses.length === 0) {
    Object(_message__WEBPACK_IMPORTED_MODULE_3__["displayWarning"])(shareMessageSelector, Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e9")); //don't close email address window

    return false;
  }

  shareInfo.to = "";

  if (formData.mailList.length > 0) {
    let info = formatRecipientInfo(formData.mailList);
    shareInfo.to = info.to;
    shareInfo.variables = info.variables;
  }

  if (formData.emailAddresses.length > 0) {
    if (shareInfo.to.length > 0) {
      shareInfo.to = `${shareInfo.to}, ${formData.emailAddresses}`;
    } else {
      shareInfo.to = formData.emailAddresses;
    }
  }

  shareInfo.senderName = userInfo.name;
  shareInfo.senderEmail = userInfo.email;
  shareInfo.sid = sid;
  shareInfo.citation = `~ ${q.citation}`;
  shareInfo.quote = q.quote;
  shareInfo.url = `${location.origin}${q.url}`;

  if (formData.emailMessage) {
    shareInfo.message = formatMessage(formData.emailMessage);
  } // start loading indicator


  resetSendIndicator();
  Object(_ajax_share__WEBPACK_IMPORTED_MODULE_0__["sendMail"])(shareInfo).then(response => {
    if (response === "success") {
      setSendSuccess();
    } else {
      setSendFailure();
      console.log("post message; %s", response);
    }
  }).catch(error => {
    setSendFailure();
    console.error("share error: %s", error);
  });
  return true;
} //generate the option element of a select statement

function generateOption(item) {
  return `<option value="${item.address}:${item.first}:${item.last}">${item.first} ${item.last}</option>`;
}

function makeMaillistSelect(maillist) {
  return new Promise((resolve, reject) => {
    let listnames = Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("label:listnames", true);
    let selectaddress = Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("label:selectaddress", true);
    Promise.all([listnames, selectaddress]).then(resp => {
      resolve(`
        <label>${resp[0]}</label>
        <select name="mailList" id="maillist-modal-address-list" multiple="" class="search ui dropdown">
          <option value="">${resp[1]}</option>
          ${maillist.map(item => `${generateOption(item)}`).join("")}
        </select>
      `);
    });
  });
}
/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error
*/


async function loadEmailList() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  if (!userInfo) return;
  let api = `${userInfo.userId}/maillist`;

  try {
    let maillist = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_0__["getMailList"])(userInfo.userId);
    let selectHtml = await makeMaillistSelect(maillist);
    $("#maillist-modal-select").html(selectHtml);
    $("#maillist-modal-address-list.dropdown").dropdown();
  } catch (err) {
    notify.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e10")}: ${err}`);
  }

  ;
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_topics/styles.js":
/*!***************************************************!*\
  !*** ../cmi-www/src/js/modules/_topics/styles.js ***!
  \***************************************************/
/*! exports provided: getRandomStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomStyle", function() { return getRandomStyle; });
function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
/*
  "carbon-fibre",
  "dark-paths",
  "folk-pattern",
*/


const styles = ["silver-diagonal", "wax-diagonal", "violet-diagonal", "double-bubble", "diamond", "full-bloom", "leaves", "terrazzo", "pow-star", "repeated-square", "triangle-mosaic"];
function getRandomStyle() {
  return styles[_getRandomInt(styles.length)];
}

/***/ }),

/***/ "./src/js/page.js":
/*!************************!*\
  !*** ./src/js/page.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var www_modules_util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! www/modules/_util/store */ "../cmi-www/src/js/modules/_util/store.js");
/* harmony import */ var www_modules_user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! www/modules/_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var www_modules_page_startup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! www/modules/_page/startup */ "../cmi-www/src/js/modules/_page/startup.js");
/* harmony import */ var www_modules_page_notes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! www/modules/_page/notes */ "../cmi-www/src/js/modules/_page/notes.js");
/* harmony import */ var www_modules_util_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! www/modules/_util/url */ "../cmi-www/src/js/modules/_util/url.js");
/* harmony import */ var www_modules_language_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! www/modules/_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/* harmony import */ var www_modules_util_facebook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! www/modules/_util/facebook */ "../cmi-www/src/js/modules/_util/facebook.js");
/* harmony import */ var www_modules_topics_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! www/modules/_topics/events */ "../cmi-www/src/js/modules/_topics/events.js");
/* harmony import */ var _modules_bookmark_start__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/_bookmark/start */ "./src/js/modules/_bookmark/start.js");
/* harmony import */ var _modules_search_search__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/_search/search */ "./src/js/modules/_search/search.js");
/* harmony import */ var _modules_contents_toc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/_contents/toc */ "./src/js/modules/_contents/toc.js");
/* harmony import */ var _modules_about_about__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/_about/about */ "./src/js/modules/_about/about.js");
/* harmony import */ var _notes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./notes */ "./src/js/notes.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* harmony import */ var _setEnv__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./setEnv */ "./src/js/setEnv.js");
/* eslint no-console: off */
 //common modules







 //teaching specific modules








$(document).ready(() => {
  Object(www_modules_util_store__WEBPACK_IMPORTED_MODULE_0__["storeInit"])(_constants__WEBPACK_IMPORTED_MODULE_13__["default"]);
  Object(www_modules_page_startup__WEBPACK_IMPORTED_MODULE_2__["initStickyMenu"])();
  Object(www_modules_language_lang__WEBPACK_IMPORTED_MODULE_5__["setLanguage"])(_constants__WEBPACK_IMPORTED_MODULE_13__["default"]);
  Object(_setEnv__WEBPACK_IMPORTED_MODULE_14__["setRuntimeEnv"])();
  Object(_modules_bookmark_start__WEBPACK_IMPORTED_MODULE_8__["bookmarkStart"])("page");
  _modules_search_search__WEBPACK_IMPORTED_MODULE_9__["default"].initialize();
  www_modules_user_netlify__WEBPACK_IMPORTED_MODULE_1__["default"].initialize();
  _modules_contents_toc__WEBPACK_IMPORTED_MODULE_10__["default"].initialize("page");
  Object(www_modules_page_notes__WEBPACK_IMPORTED_MODULE_3__["initialize"])(_notes__WEBPACK_IMPORTED_MODULE_12__["noteInfo"]);
  _modules_about_about__WEBPACK_IMPORTED_MODULE_11__["default"].initialize(); //support for quote display and sharing

  www_modules_util_facebook__WEBPACK_IMPORTED_MODULE_6__["default"].initialize();
  Object(www_modules_topics_events__WEBPACK_IMPORTED_MODULE_7__["initQuoteDisplay"])("#show-quote-button", _constants__WEBPACK_IMPORTED_MODULE_13__["default"]);
  Object(www_modules_page_startup__WEBPACK_IMPORTED_MODULE_2__["initAnimation"])();
  Object(www_modules_util_url__WEBPACK_IMPORTED_MODULE_4__["showTOC"])();
});

/***/ }),

/***/ 1:
/*!******************************!*\
  !*** multi ./src/js/page.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/page.js */"./src/js/page.js");


/***/ })

/******/ });
//# sourceMappingURL=page.js.map
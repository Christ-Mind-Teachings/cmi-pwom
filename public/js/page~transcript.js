(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["page~transcript"],{

/***/ "../cmi-www/src/js/globals.js":
/*!************************************!*\
  !*** ../cmi-www/src/js/globals.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
  Global constants
*/
/* harmony default export */ __webpack_exports__["default"] = ({
  acolManager: "rmercer33+acol@gmail.com",
  sources: "/public/config/sources.json",
  share: "https://rcd7l4adth.execute-api.us-east-1.amazonaws.com/latest/share",
  acol: "https://rcd7l4adth.execute-api.us-east-1.amazonaws.com/latest/acol/access",
  user: "https://93e93isn03.execute-api.us-east-1.amazonaws.com/latest/user",
  audit: "https://93e93isn03.execute-api.us-east-1.amazonaws.com/latest",
  topicsEndPoint: "https://93e93isn03.execute-api.us-east-1.amazonaws.com/latest",
  bookmarkApi: "https://rcd7l4adth.execute-api.us-east-1.amazonaws.com/latest"
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_audit/audit.js":
/*!*************************************************!*\
  !*** ../cmi-www/src/js/modules/_audit/audit.js ***!
  \*************************************************/
/*! exports provided: searchAudit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchAudit", function() { return searchAudit; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../globals */ "../cmi-www/src/js/globals.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "../cmi-www/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");



function searchAudit(source, query, count, error) {
  const api = `${_globals__WEBPACK_IMPORTED_MODULE_0__["default"].audit}/audit/search`;
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();
  const body = {
    userId: "guest",
    count: count,
    query: query,
    source: source
  };

  if (userInfo) {
    body.userId = userInfo.email;
  }

  if (error) {
    body.error = error;
  } //disable audit


  if (false) {}
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/annotate.js":
/*!*******************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/annotate.js ***!
  \*******************************************************/
/*! exports provided: getLink, initialize, getUserInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLink", function() { return getLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserInput", function() { return getUserInput; });
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bmnet */ "../cmi-www/src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookmark */ "../cmi-www/src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "../cmi-www/node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigator */ "../cmi-www/src/js/modules/_bookmark/navigator.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clipboard */ "../cmi-www/src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");








 //teaching specific constants, assigned at initialization

let teaching = {};
var warningIssued = false;

function warnNotSignedIn() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();

  if (!userInfo && !warningIssued) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.options.timeOut = "10000";
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.success(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m1"));
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.warning(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m2"));
    warningIssued = true;
  }
}

function getAnnotationForm() {
  let form = _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
    <form name="annotation" id="annotation-form" class="ui form">
      <input class="hidden-field" type="text" readonly="" name="creationDate">
      <input class="hidden-field" type="text" name="aid" readonly>
      <input class="hidden-field" type="text" readonly="" name="rangeStart">
      <div class="fields">
        <div class="three wide field">
          <input id="rangeEnd" type="text" name="rangeEnd" maxlength="4" placeholder="${"label:end"}">
        </div>
        <div id="available-topics" class="twelve wide field"></div>
        </div>
      </div>
      <div class="field">
        <input type="text" name="Comment" placeholder="${"label:comment"}">
      </div>
      <div class="field">
        <input type="text" name="newTopics" placeholder="${"label:newtopic"}">
      </div>
      <div class="field">
        <textarea name="Note" placeholder="${"label:notes"}" rows="3"></textarea>
      </div>
      <div class="fields">
        <button class="annotation-submit ui green button" type="submit">${"action:submit"}</button>
        <button class="annotation-cancel ui red basic button">${"action:cancel"}</button>
        <button class="annotation-share ui green disabled basic button">${"action:share"}</button>
        <button class="annotation-note ui blue basic button">${"label:links"}</button>
        <div class="twelve wide field">
          <button class="annotation-delete ui red disabled right floated button">${"action:delete"}</button>
        </div>
      </div>
    </form>
    <div class="note-and-links hide">
      <table id="bookmark-link-table" class="ui selectable celled table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>${"label:linkref"}</th>
            <th>${"label:link"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="bookmark-link-list">
        </tbody>
      </table>
      <form name="linkForm" id="link-form" class="ui form">
        <div class="fields">
          <div class="ten wide field">
            <input required type="text" placeholder="${"label:linknote"}" name="reference">
          </div>
          <div class="five wide field">
            <input required type="text" placeholder="${"label:link"}" name="link">
          </div>
          <button title="add or update" data-index="-1" type="submit" class="green ui icon button">
            <i class="plus circle icon"></i>
          </button>
          <button title="clear fields" type="reset" class="yellow ui icon button">
            <i class="minus circle icon"></i>
          </button>
        </div>
      </form>
    </div>
  `;
  return form;
}

let linkArray = [];
function getLink(index) {
  return linkArray[index];
}

function populateTable(links) {
  return `
    ${links.map((item, index) => _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
      <tr data-index="${index}">
        <td title="${"action:delete"}" class="delete-link-item"><i class="red trash alternate icon"></i></td>
        <td title="${"action:edit"}" class="edit-link-item"><i class="yellow pencil alternate icon"></i></td>
        <td data-name="reference">${item.reference}</td>
        <td data-name="link">${formatLink(item.link)}</td>
        <td title="${"action:follow"}" class="follow-link-item"><i class="green share icon"></i></td>
      </tr>
    `).join("")}
  `;
}

function getIndex() {
  let value = $("#link-form [type='submit']").data("index");
  return parseInt(value, 10);
}

function setIndex(index) {
  $("#link-form [type='submit']").data("index", index);
}

function makeTableRow(item, index) {
  return _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
    <tr data-index="${index}">
      <td title="${"action:delete"}" class="delete-link-item"><i class="red trash alternate icon"></i></td>
      <td title="${"action:edit"}" class="edit-link-item"><i class="yellow pencil alternate icon"></i></td>
      <td data-name="reference">${item.reference}</td>
      <td data-name="link">${item.link}</td>
      <td title="${"action:follow"}" class="follow-link-item"><i class="green share icon"></i></td>
    </tr>
  `;
}

function validateLink(pid, link) {
  let rawLink;
  let pKey = teaching.keyInfo.genParagraphKey(pid);

  try {
    rawLink = JSON.parse(link);
  } catch (error) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m3"));
    return false;
  }

  if (!rawLink.aid || !rawLink.desc || !rawLink.key || !rawLink.userId) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m4"));
    return false;
  }

  if (rawLink.key === pKey) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m5"));
    return false;
  }

  return true;
}
/*
 * format link for display in annotation form
 */


function formatLink(link) {
  let raw = JSON.parse(link);
  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`; //WOM has questions

  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  } else {
    display = `${display}:${raw.desc.pid}`;
  }

  return display;
}

function createLinkHandlers() {
  //add
  $(".transcript").on("submit", "#link-form", function (e) {
    e.preventDefault(); //get state; new or edit

    let index = getIndex();
    let state = index === -1 ? "new" : "edit"; //get link values from form

    let form = $("#link-form").form("get values"); //validate link

    let pid = $(".annotate-wrapper p.cmiTranPara").attr("id");

    if (!validateLink(pid, form.link)) {
      return;
    }

    let linkDisplay = formatLink(form.link);

    if (state === "new") {
      linkArray.push({
        reference: form.reference,
        link: form.link,
        deleted: false
      });
      let row = makeTableRow({
        reference: form.reference,
        link: linkDisplay
      }, linkArray.length - 1);
      $("#bookmark-link-list").append(row);
    } else {
      //update array
      linkArray[index] = {
        reference: form.reference,
        link: form.link,
        deleted: false
      }; //update table

      $(`tr[data-index="${index}"] > td[data-name="reference"]`).text(linkArray[index].reference);
      $(`tr[data-index="${index}"] > td[data-name="link"]`).text(linkDisplay);
      setIndex(-1);
    }

    $("#link-form").form("clear");
  }); //delete; link deleted from bookmark link array

  $(".transcript").on("click", "#bookmark-link-list td.delete-link-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let parent = $(this).parent();
    let index = parseInt(parent.attr("data-index"), 10); //mark deleted item from linkArray

    linkArray[index].deleted = true; //remove item from table

    parent.remove(); //console.log("after delete: link %o", linkArray);
  }); //edit

  $(".transcript").on("click", "#bookmark-link-list td.edit-link-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let index = parseInt($(this).parent().attr("data-index"), 10);
    $("#link-form").form("set values", linkArray[index]);
    setIndex(index);
  });
}

function noteToggle() {
  $(".transcript").on("click", "#annotation-form .annotation-note", function (e) {
    e.preventDefault();
    console.log("note button clicked");
    let nal = $(".note-and-links");

    if (nal.hasClass("hide")) {
      nal.removeClass("hide");
    } else {
      nal.addClass("hide");
    }
  });
}

const wrapper = `
  <div class="annotate-wrapper ui raised segment"></div>`;

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return `
      <div class="item">
        <em>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m6")}</em>
      </div>
    `;
  }

  return `
    ${listArray.map(item => `
      <div class="item">
        <em>${item.topic}</em>
      </div>
    `).join("")}
  `;
}

function generateExtraList(annotation) {
  let extras = [];

  if (annotation.Note) {
    extras.push("N");
  }

  if (annotation.links) {
    extras.push(`L${annotation.links.length}`);
  }

  if (extras.length === 0) {
    return `
      <div class="item">
        <i class="bookmark outline icon"></i>
      </div>
    `;
  }

  return `
    ${extras.map(item => `
      <div class="item">
        ${genExtrasItem(item)}
      </div>
    `).join("")}
  `;
}

function genExtrasItem(item) {
  let icon;

  if (item === "N") {
    icon = "<i class='align justify icon'></i>";
  } else if (item.startsWith("L")) {
    let length = item.substr(1);
    icon = `<i class="linkify icon"></i>[${length}]`;
  }

  return `${icon}`;
}

function generateComment(comment) {
  if (!comment) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m6");
  } else {
    return comment;
  }
}
/*
  Populate form fields
  args:
    pid: the paragraph id of the annotation
    aid: the id of associated highlighted text
    annotation: user data for existing annotations
  */


function initializeForm(pid, aid, annotation) {
  let form = $("#annotation-form");
  let linkform = $("#link-form"); //set link array to empty

  linkArray = []; //a new annotation

  if (!annotation) {
    form.form("set values", {
      rangeStart: pid,
      rangeEnd: pid,
      aid: aid
    });
  } else {
    let topicSelect = [];

    if (annotation.topicList) {
      topicSelect = annotation.topicList.map(t => t.value);
    }

    if (annotation.links) {
      linkArray = annotation.links;
      let html = populateTable(linkArray);
      $("#bookmark-link-list").html(html);
    }

    form.form("set values", {
      rangeStart: annotation.rangeStart,
      rangeEnd: annotation.rangeEnd,
      aid: annotation.aid,
      creationDate: annotation.creationDate,
      Comment: annotation.Comment,
      Note: annotation.Note,
      topicList: topicSelect
    });
  }

  document.getElementById("rangeEnd").focus();
}

function getFormData() {
  return $("#annotation-form").form("get values");
} //returns true if annotation form is open


function annotationFormOpen(currentPid) {
  let selector = $(".transcript .annotation-edit");

  if (selector.length > 0) {
    let pid = selector.first(1).attr("id"); //if currentPid === pid user clicked hidden link in editor, we just exit w/o notice

    if (currentPid !== pid) {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`${"annotate:m8"} ${pid}. ${"annotate:m9"}`);
    }

    return true;
  }

  return false;
}

function bookmarkNavigatorActive() {
  if ($(".transcript").hasClass("bookmark-navigator-active")) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m10"));
    return true;
  }

  return false;
}

function editAnnotation(pid, aid, annotation) {
  let rangeStart = parseInt(annotation.rangeStart.substr(1), 10);
  let rangeEnd = parseInt(annotation.rangeEnd.substr(1), 10); //add class 'annotation-edit' to paragraphs so they can be wrapped

  if (rangeStart !== rangeEnd) {
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(rangeStart, rangeEnd + 1);

    for (let i = 0; i < annotationRange.length; i++) {
      $(`#p${annotationRange[i]}`).addClass("annotation-edit");
    }
  } else {
    $(`#${pid}`).addClass("annotation-edit");
  } //console.log("editAnnotation");


  warnNotSignedIn(); //.disable-selection will prevent text selection during annotation creation/edit

  addSelectionGuard();
  $(".annotation-edit").wrapAll(wrapper);
  $(".annotate-wrapper").prepend(getAnnotationForm());
  $(".annotation-delete.disabled").removeClass("disabled");
  $(".annotation-share.disabled").removeClass("disabled");
  getTopicList(pid, aid, annotation);
}
/*
  Support for creating annotations with no associated selected text
*/


function noteHandler() {
  $(".transcript").on("click", "p.cmiTranPara > span.pnum", function (e) {
    e.preventDefault();
    let pid = $(this).parent("p").attr("id"); //we're already editing this annotation

    if (annotationFormOpen() || bookmarkNavigatorActive()) {
      return;
    }

    let bookmarkData = Object(_bmnet__WEBPACK_IMPORTED_MODULE_0__["getBookmark"])(pid);

    if (bookmarkData.bookmark) {
      let annotation = bookmarkData.bookmark.find(value => typeof value.aid === "undefined"); //we found a note - so edit it

      if (annotation) {
        editAnnotation(pid, undefined, annotation);
        return;
      }
    } //disable text selection while annotation form is open


    addSelectionGuard(); //new note for paragraph

    $(`#${pid}`).addClass("annotation-edit annotation-note");
    $(".annotation-edit").wrapAll(wrapper);
    $(".annotate-wrapper").prepend(getAnnotationForm());
    getTopicList(pid);
  });
}

function hoverNoteHandler() {
  $(".transcript").on("mouseenter", ".has-annotation", function (e) {
    e.preventDefault(); //if bookmark highlights are hidden, return without showing popup

    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      $(this).popup("hide").popup("destroy");
      return;
    }

    let aid = $(this).data("aid");
    let pid = $(this).parent("p").attr("id"); //bookmark wont be found if it is still being created

    let bookmarkData = Object(_bmnet__WEBPACK_IMPORTED_MODULE_0__["getBookmark"])(pid);

    if (!bookmarkData.bookmark) {
      return;
    }

    let annotation = bookmarkData.bookmark.find(value => value.creationDate === aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!annotation) {
      return;
    }

    let topicList = generateHorizontalList(annotation.topicList);
    let comment = generateComment(annotation.Comment);
    let extraHtml = generateExtraList(annotation);
    $(".annotation-information .topic-list").html(topicList);
    $(".annotation-information .range").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:range")}: ${annotation.rangeStart}/${annotation.rangeEnd}`);
    $(".annotation-information .description").html(`${comment}`);
    $(".annotation-information .extra").html(extraHtml);
    $(this).popup({
      popup: ".annotation-information.popup",
      hoverable: true
    }).popup("show"); //create link

    let link = createBookmarkLink(pid, aid);
    $("#popup-button").attr("data-clipboard-text", link);
    _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register("#popup-button"); //set focus on button so pressing Enter will click the button

    $("#popup-button").focus();
  });
}
/*
 * Highlighted text hover; show popup
 */


function hoverHandler() {
  $(".transcript").on("mouseenter", "[data-annotation-id]", function (e) {
    e.preventDefault();
    let aid = $(this).attr("data-annotation-id");
    let pid = $(this).parent("p").attr("id");
    let realAid = $(this).data("aid"); //disable hover if highlights are hidden

    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      $(this).popup("hide").popup("destroy");
      return;
    } //disable hover if highlights are selectively hidden, filtered


    if ($(".transcript").hasClass("topic-filter-active")) {
      if (!$(this).hasClass("show")) {
        $(this).popup("hide").popup("destroy");
        return;
      }
    } //disable popup for paragraphs being edited


    if ($(`#${pid}`).hasClass("annotation-edit")) {
      $(`#${pid} [data-annotation-id]`).each(function () {
        $(this).popup("hide").popup("destroy");
      });
      return;
    } //disable popup for paragraphs wrapped in segment div


    if ($(`#${pid}`).hasClass("selected-annotation")) {
      $(`#${pid} [data-annotation-id]`).each(function () {
        $(this).popup("hide").popup("destroy");
      });
      return;
    } //disable popup for shared annotations


    if ($(this).hasClass("shared")) {
      $(this).popup("hide").popup("destroy");
      return;
    } //bookmark wont be found if it is still being created


    let bookmarkData = Object(_bmnet__WEBPACK_IMPORTED_MODULE_0__["getBookmark"])(pid);

    if (!bookmarkData.bookmark) {
      return;
    }

    let annotation = bookmarkData.bookmark.find(value => value.aid === aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!annotation) {
      return;
    }

    let topicList = generateHorizontalList(annotation.topicList);
    let comment = generateComment(annotation.Comment);
    let extraHtml = generateExtraList(annotation);
    $(".annotation-information .topic-list").html(topicList);
    $(".annotation-information .range").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:range")}: ${annotation.rangeStart}/${annotation.rangeEnd}`);
    $(".annotation-information .description").html(`${comment}`);
    $(".annotation-information .extra").html(extraHtml);
    $(this).popup({
      popup: ".annotation-information.popup",
      hoverable: true
    }).popup("show"); //create link

    let link = createBookmarkLink(pid, realAid);
    $("#popup-button").attr("data-clipboard-text", link);
    _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register("#popup-button"); //set focus on button so pressing Enter will click the button

    $("#popup-button").focus();
  });
}
/*
 * Create a link reference to a CMI bookmark
 *
 * Format: pageKey.000:aid:uid
 */


function createBookmarkLink(pid, aid) {
  let pKey = teaching.keyInfo.genParagraphKey(pid);
  let keyInfo = teaching.keyInfo.describeKey(pKey);
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let link = {
    userId: userInfo.userId,
    key: pKey,
    aid: aid,
    desc: keyInfo
  };
  return JSON.stringify(link);
}
/*
 * Click handler for the button press on annotation popups.
 */


function getReferenceHandler() {
  $("body").on("click", "#popup-button", function (e) {
    //for selected text bookmarks
    $("mark.visible").popup("hide"); //for note style bookmarks

    $(".pnum.has-annotation.visible").popup("hide");
  });
}

function editHandler() {
  $(".transcript").on("click", "[data-annotation-id]", function (e) {
    e.preventDefault();
    let aid = $(this).attr("data-annotation-id");
    let pid = $(this).parent("p").attr("id"); //pid can be undefined when selected content is emphasized <em>

    if (pid === undefined) {
      pid = $(this).parents("p").attr("id");
    } //we're already editing this annotation


    if (annotationFormOpen(pid) || bookmarkNavigatorActive()) {
      return;
    } //disable edit if highlights are hidden


    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      return;
    } //disable edit if highlights are selectively hidden, filtered


    if ($(".transcript").hasClass("topic-filter-active")) {
      if (!$(this).hasClass("show")) {
        return;
      }
    } //disable edit for shared annotations


    if ($(this).hasClass("shared")) {
      return;
    } //hide this popup


    $(this).popup("hide"); //show this highlight, all others are hidden

    $(this).addClass("show");
    let bookmarkData = Object(_bmnet__WEBPACK_IMPORTED_MODULE_0__["getBookmark"])(pid);
    let annotation = bookmarkData.bookmark.find(value => value.aid === aid);
    editAnnotation(pid, aid, annotation);
  });
}
/*
 * Enable text selection by removing .disable-selection unless
 * .user is present. This means user has explicitly disabled
 * text selection.
 */


function removeSelectionGuard() {
  let guard = $("div.transcript.ui.disable-selection:not(.user)");

  if (guard.length > 0) {
    //console.log("removing selection guard");
    guard.removeClass("disable-selection");
  }
}
/*
 * Disable text selection when annotation form is open
 */


function addSelectionGuard() {
  let guard = $("div.transcript.ui");

  if (!guard.hasClass("disable-selection")) {
    //console.log("adding selection guard");
    guard.addClass("disable-selection");
  }
}

function submitHandler() {
  $(".transcript").on("submit", "#annotation-form", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard(); //1. Create new topic begins here

    let formData = getFormData(); //topicList contains topic strings but we want the topic object
    //get it from the select option tag

    if (formData.topicList.length > 0) {
      let topicObjectArray = formData.topicList.map(tv => {
        let topic = $(`#annotation-topic-list > [value='${tv}']`).text();
        return {
          value: tv,
          topic: topic
        };
      });
      formData.topicList = topicObjectArray;
    }

    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show"); //this is a note annotation, no selected text, add page title to formData

    if ($(".transcript .annotation-edit").hasClass("annotation-note")) {
      formData.bookTitle = $("#book-title").text();
    } //get links from annotation


    let links = linkArray.filter(l => l.deleted === false);

    if (links.length > 0) {
      formData.links = links;
    } else {
      //check for deleted links
      let deleted = linkArray.filter(l => l.deleted === true); //links were deleted so remove linkify icon from page if this is not a new annotation

      if (deleted.length > 0 && formData.creationDate.length > 0) {
        $(`i[data-link-aid="${formData.creationDate}"]`).remove();
      }
    }

    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].submit(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit annotation-note");
  });
}
/*
  Handle cancel button pressed on annotation form
*/


function cancelHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-cancel", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard();
    let formData = getFormData();
    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show");
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
  });
}
/*
  Handle share button pressed on annotation form
*/


function shareHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-share", function (e) {
    e.preventDefault();
    let formData = getFormData();
    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show");
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();

    if (!userInfo) {
      userInfo = {
        userId: "xxx"
      };
    } //this is really the annotation-id not the aid


    let annotation_id = formData.aid;
    let aid;
    let rangeArray = [formData.rangeStart, formData.rangeEnd];
    let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
    let pid = rangeArray[0]; //get the real aid

    if (annotation_id.length > 0) {
      aid = $(`[data-annotation-id="${annotation_id}"]`).attr("data-aid");
      $(`[data-annotation-id="${annotation_id}"]`).addClass("show");
    } else {
      aid = $(`#${pid} > span.pnum`).attr("data-aid");
    }

    let url = `https://${location.hostname}${location.pathname}?as=${pid}:${aid}:${userInfo.userId}`;
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1);
    let header2;

    if (userInfo.userId === "xxx") {
      header2 = `
        <h4 class="ui left floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m11")}" class="red window close outline small icon"></i>
          <div class="content">
            ${formData.Comment}
          </div>
        </h4>
        <h4 class="ui right floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:closewin")}" class="share-annotation window close small icon"></i>
        </h4>
      `;
    } else {
      header2 = `
        <h4 class="ui left floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:fbshare")}" class="share-annotation facebook small icon"></i>
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:emailshare")}" class="share-annotation envelope outline small icon"></i>
          <i data-clipboard-text="${url}" title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:cp2clip")}" class="share-annotation linkify small icon"></i>
          <div class="content">
            ${formData.Comment}
          </div>
        </h4>
        <h4 class="ui right floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:closewin")}" class="share-annotation window close small icon"></i>
        </h4>
      `;
    }

    for (let i = 0; i < annotationRange.length; i++) {
      if (i === 0) {
        $(`#p${annotationRange[i]}`).addClass("selected-annotation clearBoth");
      } else {
        $(`#p${annotationRange[i]}`).addClass("selected-annotation");
      }
    }

    $(".selected-annotation").wrapAll("<div class='selected-annotation-wrapper ui clearing raised segment'></div>");
    $(".selected-annotation-wrapper").prepend(header2);

    if (userInfo.userId !== "xxx") {
      _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register(".share-annotation.linkify");
    }
  }); //init click handler for FB and email share dialog

  Object(_navigator__WEBPACK_IMPORTED_MODULE_4__["initShareDialog"])("annotate.js");
}
/*
  bookmark deleted
*/


function deleteHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-delete", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard();
    let formData = getFormData();
    unwrap(); //add links to formData so the linkify icon can be removed

    let links = linkArray;

    if (links.length > 0) {
      formData.links = links;
    }

    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].delete(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
  });
}
/*
  initialize annotation event handlers
*/


function initialize(constants) {
  if (constants) {
    teaching = constants;
  } else {
    teaching = Object(_bookmark__WEBPACK_IMPORTED_MODULE_2__["getTeachingInfo"])();
  }

  submitHandler();
  cancelHandler();
  shareHandler();
  deleteHandler();
  editHandler();
  noteHandler();
  hoverHandler();
  noteToggle();
  createLinkHandlers();
  getReferenceHandler();
  hoverNoteHandler();
}
/*
  Display annotation form
  args:
    highlight - highlighted text object
  */

function getUserInput(highlight) {
  //don't allow multiple annotation forms to be open at the same time
  // - if open cancel the highlight
  if (annotationFormOpen(highlight.pid) || bookmarkNavigatorActive()) {
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel({
      aid: highlight.id
    });
    return;
  } //.disable-selection will prevent text selection during annotation creation/edit


  addSelectionGuard();
  warnNotSignedIn();
  $(`#${highlight.pid}`).addClass("annotation-edit");
  $(".annotation-edit").wrapAll(wrapper); //$(".annotate-wrapper").prepend(form);

  $(".annotate-wrapper").prepend(getAnnotationForm());
  getTopicList(highlight.pid, highlight.id); //show this highlight, all others are hidden

  $(`[data-annotation-id="${highlight.id}"]`).addClass("show");
}
/*
  remove annotation form
*/

function unwrap() {
  $(".annotate-wrapper > form").remove();
  $(".annotate-wrapper > .note-and-links").remove();
  $(".annotation-edit").unwrap();
} //generate the option element of a select statement


function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  } else {
    return `<option value="${topic}">${topic}</option>`;
  }
}

function makeTopicSelect(topics) {
  return `
    <select name="topicList" id="annotation-topic-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:selecttopic")}</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function getTopicList(pid, aid, data) {
  //get topics from server or local storage
  _bmnet__WEBPACK_IMPORTED_MODULE_0__["default"].fetchTopics().then(response => {
    let selectHtml = makeTopicSelect(response.topics);
    $("#available-topics").html(selectHtml); //init annotation form components

    $("select.dropdown").dropdown(); //init form

    initializeForm(pid, aid, data);
  }).catch(error => {
    console.error("topic fetch error: ", error);
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m12")}: ${error}`);
  });
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/bmnet.js":
/*!****************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/bmnet.js ***!
  \****************************************************/
/*! exports provided: netInit, getBookmark, fetchBookmark, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "netInit", function() { return netInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmark", function() { return getBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchBookmark", function() { return fetchBookmark; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../cmi-www/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! store */ "../cmi-www/node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isEqual */ "../cmi-www/node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/findIndex */ "../cmi-www/node_modules/lodash/findIndex.js");
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/cloneDeep */ "../cmi-www/node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selection */ "../cmi-www/src/js/modules/_bookmark/selection.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../globals */ "../cmi-www/src/js/globals.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bookmark */ "../cmi-www/src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/*
  Bookmark data implementation

  Bookmarks for signed in users are queried from and stored to the server. See the
  cmi-api/bookmark repository for API.

  For signed in users, when a transcript page is loaded bookmarks are queried from the server
  and stored locally. Bookmarks for users not signed in are stored only to local storage.

  Operations for create, modify, and delete are performed locally and sent to the server
  for signed in users.
*/










 //const transcript = require("../_config/key");
//const bm_list_store = "bm.www.list";
//const bm_topic_list = "bm.www.topics";

var teaching = {};
function netInit(constants) {
  teaching = constants;
}
/*
  Get bookmark for paragraph pid from local storage. All bookmarks for the page
  are loaded by getBookmarks() and stored locally. We don't need to fetch them again.

  args:
    pid: paragraph id

  Bookmarks are keyed by pageKey and paragraphId. Paragraph Id's start from zero
  but are incremented by one to form the key.
*/

function getBookmark(pid) {
  const pageKey = teaching.keyInfo.genPageKey();
  const bookmarks = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(pageKey);

  if (bookmarks && pid) {
    //generate id
    let id = parseInt(pid.substr(1), 10) + 1;

    if (bookmarks[id]) {
      return {
        bookmark: bookmarks[id]
      };
    }
  } //no bookmark found


  return {};
}
/*
  if user not logged in get bookmarks from local storage
  otherwise get them from the server and store them locally
*/

function getBookmarks() {
  let pageKey = teaching.keyInfo.genPageKey();
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  return new Promise((resolve, reject) => {
    //get bookmarks from server
    if (userInfo) {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].bookmarkApi}/bookmark/query/${userInfo.userId}/${pageKey}`).then(response => {
        //convert to local data structure and store locally
        if (response.data.response) {
          let bookmarks = {};
          response.data.response.forEach(b => {
            let key = teaching.keyInfo.parseKey(b.id); //parson JSON to object

            for (let a of b.bookmark) {
              if (a.selectedText) {
                a.selectedText = JSON.parse(a.selectedText);
              } //console.log("a: %o", a);

            }

            bookmarks[key.pid] = b.bookmark;
          }); //store bookmarks in local storage

          if (Object.keys(bookmarks).length > 0) {
            store__WEBPACK_IMPORTED_MODULE_1___default.a.set(pageKey, bookmarks);
          }

          resolve(bookmarks);
        }
      }).catch(err => {
        reject(err);
      });
    } else {
      //get from local storage
      const bookmarks = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(pageKey);
      resolve(bookmarks);
    }
  });
}
/*
  if user not logged in get bookmarks from local storage
  otherwise get them from the server and store them locally
*/


function queryBookmarks(key) {
  const retentionTime = 1000 * 60 * 60 * 8; //eight hours of milliseconds

  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  const keyInfo = teaching.keyInfo.getKeyInfo();
  return new Promise((resolve, reject) => {
    //get bookmarks from server
    if (userInfo) {
      //set if bookmarks are already in local storage
      let bookmarkList = getBookmarkList(keyInfo); //don't query database - just return from local storage

      if (bookmarkList) {
        let expireDate = bookmarkList.lastFetchDate + retentionTime; //if list has not expired or been invalidated resolve and return
        //otherwise query the server

        if (Date.now() < expireDate) {
          if (bookmarkList.lastBuildDate > 0) {
            resolve(bookmarkList);
            return;
          }
        }
      } //get from the server


      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].bookmarkApi}/bookmark/query/${userInfo.userId}/${key}`).then(response => {
        //convert to local data structure and store locally
        if (response.data.response) {
          //console.log("bookmarks: %o", response.data.response);
          //convert selectedText from JSON to object
          for (let b of response.data.response) {
            for (let a of b.bookmark) {
              if (a.selectedText) {
                a.selectedText = JSON.parse(a.selectedText);
              } //console.log("a: %o", a);

            }
          }

          let bookmarks = buildBookmarkListFromServer(response, keyInfo);
          resolve(bookmarks);
        }
      }).catch(err => {
        reject(err);
        return;
      });
    } else {
      let bookmarks = buildBookmarkListFromLocalStore(keyInfo);
      resolve(bookmarks);
    }
  });
}

function storeBookmarkList(bookmarks, keyInfo) {
  store__WEBPACK_IMPORTED_MODULE_1___default.a.set(teaching.bm_list_store, bookmarks);
}

function getBookmarkList(keyInfo) {
  return store__WEBPACK_IMPORTED_MODULE_1___default.a.get(teaching.bm_list_store);
}
/*
  This is for users not signed in
  Build BookmarkList from locally stored bookmarks. Once built, we only
  rebuild it if it has been invalidated by the modification or creation of
  a bookmark
*/


function buildBookmarkListFromLocalStore(keyInfo) {
  //check if the list needs to be rebuilt
  const list = getBookmarkList(keyInfo);

  if (list) {
    if (list.lastBuildDate > 0) {
      return list;
    }
  }

  let sid = parseInt(keyInfo.sourceId, 10);
  let bookmarks = {}; //build expected structure from local storage

  store__WEBPACK_IMPORTED_MODULE_1___default.a.each((value, key) => {
    if (key.startsWith(sid)) {
      if (!bookmarks[key]) {
        bookmarks[key] = {};
      }

      bookmarks[key] = value;
    }
  });
  bookmarks.lastBuildDate = Date.now();
  storeBookmarkList(bookmarks, keyInfo);
  return bookmarks;
}
/*
  Build Bookmark list from data returned from server
  - this is for users signed in
*/


function buildBookmarkListFromServer(response, keyInfo) {
  let bookmarks = {};
  response.data.response.forEach(b => {
    let keyParts = teaching.keyInfo.parseKey(b.id);

    if (!bookmarks[keyParts.pageKey]) {
      bookmarks[keyParts.pageKey] = {};
    }

    bookmarks[keyParts.pageKey][keyParts.pid] = b.bookmark;
  });
  bookmarks.lastFetchDate = Date.now();
  bookmarks.lastBuildDate = Date.now();
  storeBookmarkList(bookmarks, keyInfo);
  return bookmarks;
}
/*
  Persist annotation
    - in local storage and to server if user is signed in

  args: annotation
*/


function postAnnotation(annotation) {
  //console.log("annotation: ", annotation);
  const pageKey = teaching.keyInfo.genPageKey();
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])(); //the annotation creation data; aka annotationId, aid

  let now = Date.now(); //post to server

  if (userInfo) {
    //this is critical, things get messed up if we don't do this
    let serverAnnotation = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(annotation);

    if (serverAnnotation.selectedText) {
      delete serverAnnotation.selectedText.wrap;
    }

    if (serverAnnotation.selectedText && !serverAnnotation.selectedText.aid) {
      serverAnnotation.selectedText.aid = now.toString(10);
    } //convert selectedText to JSON


    serverAnnotation.selectedText = JSON.stringify(serverAnnotation.selectedText);
    let postBody = {
      userId: userInfo.userId,
      bookmarkId: teaching.keyInfo.genParagraphKey(serverAnnotation.rangeStart, pageKey),
      annotationId: serverAnnotation.creationDate ? serverAnnotation.creationDate : now,
      annotation: serverAnnotation
    }; //console.log("posting: %o", serverAnnotation);

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].bookmarkApi}/bookmark/annotation`, postBody).then(data => {
      if (data.data.message !== "OK") {
        console.error("not OK message: %s", data.data.message);
        toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(data.data.message);
      } else {
        //store locally
        storeAnnotation(annotation, now);
      }
    }).catch(err => {
      console.error(`Error saving annotation: ${err}`);
      toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e1")); //if error and this is a new annotation we need to remove the highlight from the page

      console.log("postBody", postBody);
    });
  } else {
    //store locally
    storeAnnotation(annotation, now);
  }
}
/*
  Delete the annotation 'creationDate' for bookmark 'pid'
*/


function deleteAnnotation(pid, creationDate) {
  const pageKey = teaching.keyInfo.genPageKey();
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])(); //delete annotation from server

  if (userInfo) {
    let bookmarkId = teaching.keyInfo.genParagraphKey(pid, pageKey);
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].bookmarkApi}/bookmark/annotation/${userInfo.userId}/${bookmarkId}/${creationDate}`).then(() => {
      console.log("deleted annotation: %s/%s/%s", userInfo.userId, bookmarkId, creationDate);
    }).catch(err => {
      throw new Error(err);
    });
  }

  return deleteLocalAnnotation(pid, creationDate);
}
/*
  Fetch requested bookmark from server
*/


function fetchBookmark(bookmarkId, userId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].bookmarkApi}/bookmark/${userId}/${bookmarkId}`).then(response => {
      if (response.data.response.Item) {
        for (let a of response.data.response.Item.bookmark) {
          if (a.selectedText) {
            a.selectedText = JSON.parse(a.selectedText);
          }
        }
      }

      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
  When user is signed in the bookmark has been returned from the server
  and saved to local storage. We get the bookmark from there rather than
  having to go back to the server.

  We get the bookmark from local storage when the user is not signed in also.
*/

function getAnnotation(pid, aid) {
  const pageKey = teaching.keyInfo.genPageKey();
  let data;
  let annotation; //remove the 'p' in pid

  pid = parseInt(pid.substr(1), 10) + 1;
  data = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(pageKey);

  if (!data) {
    throw new Error("Expected bookmark data not found in local storage");
  }

  if (!data[pid]) {
    throw new Error(`Expected annotations not found for pid ${pid}`);
  } //filter requested annotation from array


  annotation = data[pid].filter(a => a.creationDate === aid); //return requested annotation

  return annotation[0];
}
/*
  Fetch Indexing topics
  args: force=true, get topics from server even when we have them cached

  topics are cached for 2 hours (1000 * 60sec * 60min * 2) before being requested
  from server
*/


function fetchTopics() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let topics = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(teaching.bm_topic_list); //keep topics in cache for 2 hours

  const retentionTime = 60 * 1000 * 60 * 2;
  return new Promise((resolve, reject) => {
    //topics stored only in local store for users not signed in
    if (!userInfo) {
      //no topics created yet
      if (!topics) {
        topics = {
          lastFetchDate: 0,
          topics: []
        };
        store__WEBPACK_IMPORTED_MODULE_1___default.a.set(teaching.bm_topic_list, topics);
      }

      resolve(topics);
      return;
    } //user signed in
    else if (topics && topics.lastFetchDate + retentionTime > Date.now()) {
        //return topics from cache
        resolve(topics);
        return;
      }

    let sourceId = teaching.keyInfo.getKeyInfo().sourceId.toString(10); //user signed in, we need to get topics from server

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].topicsEndPoint}/user/${userInfo.userId}/topics/${sourceId}`).then(topicInfo => {
      //console.log("topicInfo.data: ", topicInfo.data);
      topicInfo.data.lastFetchDate = Date.now();
      store__WEBPACK_IMPORTED_MODULE_1___default.a.set(teaching.bm_topic_list, topicInfo.data);
      resolve(topicInfo.data);
    }).catch(error => {
      console.error("Error fetching topicList: ", error);
      reject(error);
    });
  });
}
/*
  add new topics to topic-list in application store and sort
  write topics to database if user signed in
*/


function addToTopicList(newTopics) {
  let topics = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(teaching.bm_topic_list);
  let concatTopics = topics.topics.concat(newTopics); //improve sort

  concatTopics.sort((a, b) => {
    let aValue, bValue; //objects have value and topic keys, sort them by topic
    // Note: all topics are now objects

    aValue = a.topic.toLowerCase();
    bValue = b.topic.toLowerCase();

    if (aValue < bValue) {
      return -1;
    }

    if (aValue > bValue) {
      return 1;
    }

    return 0;
  });
  topics.topics = concatTopics;
  store__WEBPACK_IMPORTED_MODULE_1___default.a.set(teaching.bm_topic_list, topics); //add topics to server if user signed in

  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();

  if (userInfo) {
    let postBody = {
      userId: userInfo.userId,
      sourceId: teaching.keyInfo.getKeyInfo().sourceId,
      topicList: newTopics
    }; //console.log("newTopics: %o", newTopics);

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_8__["default"].topicsEndPoint}/user/topics`, postBody).then(response => {//console.log("addToTopicList: %o", response.data);
    }).catch(err => {//console.error("addToTopicList error: %o", err);
    });
  }

  return topics;
}
/*
  Called when a bookmark has been created, modified or deleted. We check if the bookmark
  list exists and if it was created before a bookmark was modified. If so, the list needs
  to be rebuilt.
*/


function inValidateBookmarkList() {
  const keyInfo = teaching.keyInfo.getKeyInfo();
  let bmList = getBookmarkList(keyInfo);

  if (bmList) {
    //console.log("invalidating bmList");
    bmList.lastBuildDate = 0;
    storeBookmarkList(bmList, keyInfo);
  }
}
/*
  store annotation locally
  - if bmList_<source> exists in local store set lastBuildDate = 0 to indicate
    it needs to be recreated.
*/


function storeAnnotation(annotation, creationDate) {
  const pageKey = teaching.keyInfo.genPageKey(); //make annotation key

  let pid = parseInt(annotation.rangeStart.substr(1), 10) + 1; //get bookmark for page

  let data = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(pageKey); //modified/edited bookmark when it has a creationDate attribute

  if (annotation.creationDate) {
    //convert bookmark.creationDate to number
    annotation.creationDate = parseInt(annotation.creationDate, 10);

    if (!data[pid]) {
      throw new Error(`Expected bookmark ${pid} not found.`);
    } //find the index of the annotation in the bookmark


    let index = lodash_findIndex__WEBPACK_IMPORTED_MODULE_4___default()(data[pid], a => a.creationDate === annotation.creationDate);

    if (index === -1) {
      throw new Error(`Did not find annotation ${annotation.creationDate} for pid ${pid}`);
    } //annotation was not modified so return


    if (lodash_isEqual__WEBPACK_IMPORTED_MODULE_3___default()(data[pid][index], annotation)) {
      return;
    } else {
      data[pid][index] = annotation;
    }
  } //new annotation
  else {
      let type;
      annotation.creationDate = creationDate; //add creation date to the selectedText attribute of new annotations

      if (annotation.selectedText) {
        type = "highlight";
        annotation.selectedText.aid = creationDate.toString(10); //add data-aid to new highlite so that it can be edited with a click

        Object(_selection__WEBPACK_IMPORTED_MODULE_7__["updateSelectedText"])(annotation.selectedText.id, annotation.selectedText.aid);
      } else {
        type = "note";
      } //if annotation has links, add linkify icon so it can be clicked


      if (annotation.links) {
        Object(_bookmark__WEBPACK_IMPORTED_MODULE_9__["setQuickLinks"])(annotation, type);
      }

      if (!data) {
        data = {
          [pid]: [annotation]
        };
      } else {
        if (data[pid]) {
          data[pid].push(annotation);
        } else {
          data[pid] = [annotation];
        }
      }
    }

  store__WEBPACK_IMPORTED_MODULE_1___default.a.set(pageKey, data);
  inValidateBookmarkList();
}
/*
  delete local annotation

  args:
    pid: paragraph id
    aid: annotation id
*/


function deleteLocalAnnotation(pid, aid) {
  const pageKey = teaching.keyInfo.genPageKey(); //make annotation id

  pid = parseInt(pid.substr(1), 10) + 1;
  let data = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(pageKey);

  if (!data) {
    throw new Error("Expected bookmark data not found in local storage");
  }

  let annotations = data[pid]; //user pressed delete on an annotation that was not created yet

  if (!annotations) {
    return;
  } //filter deleted annotation from array


  data[pid] = annotations.filter(a => a.creationDate !== parseInt(aid, 10));
  store__WEBPACK_IMPORTED_MODULE_1___default.a.set(pageKey, data); //bookmark has been deleted invalidate bookmark list so it is rebuilt

  inValidateBookmarkList(); //return number of annotations remaining for paragraph

  return data[pid].length;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  addToTopicList: addToTopicList,
  fetchTopics: fetchTopics,
  getAnnotation: getAnnotation,
  deleteAnnotation: deleteAnnotation,
  postAnnotation: postAnnotation,
  getBookmarks: getBookmarks,
  queryBookmarks: queryBookmarks
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/bookmark.js":
/*!*******************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/bookmark.js ***!
  \*******************************************************/
/*! exports provided: getTeachingInfo, setQuickLinks, annotation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeachingInfo", function() { return getTeachingInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQuickLinks", function() { return setQuickLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "annotation", function() { return annotation; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! store */ "../cmi-www/node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bmnet */ "../cmi-www/src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/differenceWith */ "../cmi-www/node_modules/lodash/differenceWith.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_differenceWith__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/cloneDeep */ "../cmi-www/node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/startCase */ "../cmi-www/node_modules/lodash/startCase.js");
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_startCase__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_util/url */ "../cmi-www/src/js/modules/_util/url.js");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navigator */ "../cmi-www/src/js/modules/_bookmark/navigator.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./list */ "../cmi-www/src/js/modules/_bookmark/list.js");
/* harmony import */ var _topics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./topics */ "../cmi-www/src/js/modules/_bookmark/topics.js");
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./selection */ "../cmi-www/src/js/modules/_bookmark/selection.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./annotate */ "../cmi-www/src/js/modules/_bookmark/annotate.js");
/* harmony import */ var _link_setup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../_link/setup */ "../cmi-www/src/js/modules/_link/setup.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");













 //teaching specific constants, assigned at initialization

let teaching = {};
function getTeachingInfo() {
  return teaching;
}

function formatLink(link) {
  let raw = JSON.parse(link.link);
  let href = Object(_link_setup__WEBPACK_IMPORTED_MODULE_12__["getLinkHref"])(raw);
  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`; //WOM has questions

  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  } else {
    display = `${display}:${raw.desc.pid}`;
  }

  return `<a class="item" href="${href}">${link.reference}[${display}]</a>`;
} //generate html for bookmark links


function generateLinkList(links) {
  return `
    ${links.map(item => `
      ${formatLink(item)}
    `).join("")}
  `;
} //add bookmark topics to bookmark selected text to support
//selective display of highlight based on topic


function addTopicsAsClasses(bookmark) {
  if (bookmark.topicList && bookmark.topicList.length > 0) {
    let topicList = bookmark.topicList.reduce((result, topic) => {
      if (typeof topic === "object") {
        return `${result} ${topic.value}`;
      }

      return `${result} ${topic}`;
    }, "");
    $(`[data-annotation-id="${bookmark.aid}"]`).addClass(topicList);
  }
}

function addNoteHighlight(pid, bm) {
  $(`#p${pid} > span.pnum`).addClass("has-annotation").attr("data-aid", bm.creationDate); //mark all paragraphs in bookmark with class .note-style-bookmark

  let end = parseInt(bm.rangeEnd.substr(1), 10);
  let start = pid;

  do {
    $(`#p${start}`).addClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).addClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).addClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}
/*
  Add linkify icon after bookmark so user can click to view links
*/


function setQuickLinks(bm, type) {
  if (bm.links) {
    $(`[data-aid="${bm.creationDate}"]`).after(`<i data-link-aid="${bm.creationDate}" data-type="${type}" class="small bm-link-list linkify icon"></i>`);
  }
}
/*
  Bookmark link click handler. Links are placed on both note and selected text
  bookmarks. When clicked, get the bookmark and display a list of links defined
  in the bookmark. User can optionally click a  link.
*/

function initBmLinkHandler() {
  $(".transcript").on("click", ".bm-link-list.linkify", function (e) {
    e.preventDefault();
    let type = $(this).attr("data-type");
    let pid = $(this).parent("p").attr("id");
    let aid;

    if (type === "note") {
      aid = parseInt($(this).prev("span").attr("data-aid"), 10);
    } else if (type === "highlight") {
      aid = parseInt($(this).prev("mark").attr("data-aid"), 10);
    } //console.log("bookmark type: %s, pid: %s, aid: %s", type, pid, aid);
    //bookmark wont be found if it is still being created


    let bookmarkData = Object(_bmnet__WEBPACK_IMPORTED_MODULE_2__["getBookmark"])(pid);

    if (!bookmarkData.bookmark) {
      return;
    }

    let annotation = bookmarkData.bookmark.find(value => value.creationDate === aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!annotation) {
      return;
    }

    let linkList = generateLinkList(annotation.links);
    $(".bm-link-list-popup").html(linkList);
    $(this).popup({
      popup: ".bm-link-info.popup",
      hoverable: true,
      on: "click"
    }).popup("show");
  });
}
/*
  Highlight all annotations with selected text
  ** except for paragraph of a shared annotation 0 sharePid
*/


function getPageBookmarks(sharePid) {
  //identify paragraphs with bookmarks
  _bmnet__WEBPACK_IMPORTED_MODULE_2__["default"].getBookmarks().then(response => {
    if (response) {
      //mark each paragraph containing bookmarks
      for (let id in response) {
        let hasBookmark = false; //let hasAnnotation = false;

        let pid = id - 1;
        let count = 0;

        for (const bm of response[id]) {
          if (bm.selectedText) {
            Object(_selection__WEBPACK_IMPORTED_MODULE_10__["markSelection"])(bm.selectedText, count, sharePid);
            addTopicsAsClasses(bm);
            setQuickLinks(bm, "highlight");
            _topics__WEBPACK_IMPORTED_MODULE_9__["default"].add(bm);
            count++;
            hasBookmark = true;
          } else {
            addNoteHighlight(pid, bm);
            setQuickLinks(bm, "note");
          }
        }

        if (hasBookmark) {
          $(`#p${pid} > span.pnum`).addClass("has-bookmark");
        }
        /*
        if (hasAnnotation) {
          $(`#p${pid} > span.pnum`).addClass("has-annotation");
        }
        */

      }

      _topics__WEBPACK_IMPORTED_MODULE_9__["default"].bookmarksLoaded();
    }
  }).catch(error => {
    console.error(error);
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_13__["getString"])("error:e2"));
  });
}
/*
  Clean up form values and prepare to send to API
*/


function createAnnotation(formValues) {
  //console.log("createAnnotation");
  let annotation = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(formValues);
  annotation.rangeStart = annotation.rangeStart.trim();
  annotation.rangeEnd = annotation.rangeEnd.trim();

  if (!annotation.rangeEnd.startsWith("p")) {
    annotation.rangeEnd = `p${annotation.rangeEnd}`;
  } //delete empty fields


  if (annotation.Comment === "") {
    delete annotation.Comment;
  }

  if (annotation.Note === "") {
    delete annotation.Note;
  }

  if (annotation.creationDate === "") {
    delete annotation.creationDate;
  }

  if (annotation.aid === "") {
    delete annotation.aid;
  } else {
    annotation.selectedText = Object(_selection__WEBPACK_IMPORTED_MODULE_10__["getSelection"])(annotation.aid);

    if (annotation.creationDate) {
      annotation.selectedText.aid = annotation.creationDate.toString(10);
    }

    delete annotation.textId;
  }

  if (annotation.topicList.length === 0) {
    delete annotation.topicList;
  } //keep track of topics added or deleted


  Object(_selection__WEBPACK_IMPORTED_MODULE_10__["updateSelectionTopicList"])(annotation);
  delete annotation.newTopics;
  delete annotation.hasAnnotation; //persist the bookmark

  _bmnet__WEBPACK_IMPORTED_MODULE_2__["default"].postAnnotation(annotation);
}
/*
  new topics entered on the annotation form are formatted
  to keep only alpha chars and comma. Commas are used to delimit
  topics.

  Topics are converted from string to array and first character is
  uppercased.

  Multi word topics are supported. Each word is capitalized and the topic
  is formatted as an object like so:

    {value: "HolySpirit", topic: "Holy Spirit"}
*/


function formatNewTopics({
  newTopics
}) {
  //only allow alpha chars and comma's and spaces
  let topics = newTopics.replace(/[^a-zA-Z0-9, ]/g, "");

  if (!topics || topics === "") {
    return [];
  } //remove leading and trailing comma's


  topics = topics.replace(/^,*/, "");
  topics = topics.replace(/,*$/, "");
  let newTopicArray = topics.split(",");
  newTopicArray = newTopicArray.map(t => t.trim());
  newTopicArray = newTopicArray.map(t => lodash_startCase__WEBPACK_IMPORTED_MODULE_5___default()(t));
  newTopicArray = newTopicArray.map(t => {
    if (/ /.test(t)) {
      return {
        value: t.replace(/ /g, ""),
        topic: t
      };
    } else {
      return {
        value: t,
        topic: t
      };
    }
  });
  return newTopicArray;
}
/*
  Add new topics entered by user on annotation form to topic list
  and store locally and on the server
  - then create and submit new annotation
*/


function addToTopicList(newTopics, formValues) {
  //Check for new topics already in topic list
  _bmnet__WEBPACK_IMPORTED_MODULE_2__["default"].fetchTopics().then(response => {
    //remove duplicate topics from and return the rest in difference[]
    let newUniqueTopics = lodash_differenceWith__WEBPACK_IMPORTED_MODULE_3___default()(newTopics, response.topics, (n, t) => {
      if (!t.value) {
        return t === n.value;
      }

      return t.value === n.value;
    }); //these are the new topics

    if (newUniqueTopics.length > 0) {
      //add new topics to topic list
      _bmnet__WEBPACK_IMPORTED_MODULE_2__["default"].addToTopicList(newUniqueTopics); //add new topics to this annotations topicList

      formValues.topicList = formValues.topicList.concat(newUniqueTopics); //add newTopics to formValues for posting to server

      formValues.newTopics = newUniqueTopics; //post the bookmark

      createAnnotation(formValues);
    }
  }).catch(err => {
    //error
    throw new Error(`bookmark.js:addToTopicList() error: ${err}`);
  });
} //toggle selected text highlights


function highlightHandler() {
  $(".toggle-bookmark-highlight").on("click", function (e) {
    e.preventDefault();
    let el = $(".transcript");

    if (el.hasClass("hide-bookmark-highlights")) {
      el.removeClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Hide Highlighted Text");
    } else {
      el.addClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Show Highlighted Text");
    }
  });
}
/*
 * Turn off/on bookmark creation feature. When feature is enabled users cannot select
 * and copy text from transcript
 */


function bookmarkFeatureHandler() {
  $("#bookmark-toggle-disable-selection").on("click", function (e) {
    e.preventDefault();
    let el = $(".transcript");

    if (el.hasClass("disable-selection") && el.hasClass("user")) {
      //console.log("removing selection guard - user initiated")
      el.removeClass("disable-selection user");
      $(".toggle-bookmark-selection").text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_13__["getString"])("menu:m1"));
      store__WEBPACK_IMPORTED_MODULE_1___default.a.set(teaching.bm_creation_state, "enabled");
    } else {
      //console.log("adding selection guard - user initiated")
      el.addClass("disable-selection user");
      $(".toggle-bookmark-selection").text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_13__["getString"])("menu:m2"));
      store__WEBPACK_IMPORTED_MODULE_1___default.a.set(teaching.bm_creation_state, "disabled");
    }
  });
}
/*
 * The bookmark feature is initially enabled. Check local storage to see if
 * it has been disabled by the user. If so, disable it on page load.
 */


function initializeBookmarkFeatureState() {
  let state = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(teaching.bm_creation_state);

  if (state && state === "disabled") {
    //console.log("triggering selection guard disable");
    $("#bookmark-toggle-disable-selection").trigger("click");
  }
}
/*
  initialize transcript page
*/


function initTranscriptPage(sharePid, constants) {
  //get existing bookmarks for page
  getPageBookmarks(sharePid); //add support for text selection

  Object(_selection__WEBPACK_IMPORTED_MODULE_10__["initialize"])(constants); //show/hide bookmark highlights

  highlightHandler(); //disable/enable bookmark creation feature

  bookmarkFeatureHandler();
  initializeBookmarkFeatureState(); //setup bookmark link listener

  Object(_link_setup__WEBPACK_IMPORTED_MODULE_12__["createLinkListener"])(_annotate__WEBPACK_IMPORTED_MODULE_11__["getLink"]);
  initBmLinkHandler(); //setup bookmark navigator if requested

  let pid = Object(_util_url__WEBPACK_IMPORTED_MODULE_6__["showBookmark"])();

  if (pid) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_7__["initNavigator"])(pid, teaching);
  }
}

const annotation = {
  /*
    This is called when user submits data from annotation form.
    args:
      formData: annotation form data
  */
  submit(formData) {
    let newTopics = formatNewTopics(formData); //add new topics to topic list and create annotation

    if (newTopics.length > 0) {
      addToTopicList(newTopics, formData);
    } else {
      //post the bookmark
      createAnnotation(formData);
    } //mark paragraph as having bookmark


    if (!formData.aid) {
      //bookmark has no selected text
      $(`#${formData.rangeStart} > span.pnum`).addClass("has-annotation"); //mark all paragraphs in bookmark with class .note-style-bookmark

      let end = parseInt(formData.rangeEnd.substr(1), 10);
      let start = parseInt(formData.rangeStart.substr(1), 10);
      let pid = start;

      do {
        $(`#p${start}`).addClass("note-style-bookmark");

        if (start === pid) {
          $(`#p${start}`).addClass("note-style-bookmark-start");
        }

        if (start === end) {
          $(`#p${start}`).addClass("note-style-bookmark-end");
        }

        start++;
      } while (start <= end);
    } else {
      $(`#${formData.rangeStart} > span.pnum`).addClass("has-bookmark"); //this is a new annotation

      if (formData.creationDate === "") {
        let bookmarks = Object(_bmnet__WEBPACK_IMPORTED_MODULE_2__["getBookmark"])(formData.rangeStart);
        let annotationCount = 0;

        if (bookmarks.bookmark && bookmarks.bookmark.length > 0) {
          annotationCount = bookmarks.bookmark.reduce((count, annotation) => {
            if (annotation.aid && annotation.aid !== formData.aid) {
              count = count + 1;
            }

            return count;
          }, 0);
        }

        Object(_selection__WEBPACK_IMPORTED_MODULE_10__["updateHighlightColor"])(formData.aid, annotationCount);
      }
    }
  },

  //user pressed cancel on annotation form
  cancel(formData) {
    //no creationDate means a new annotation that hasn't been stored
    if (!formData.creationDate && formData.aid) {
      Object(_selection__WEBPACK_IMPORTED_MODULE_10__["deleteNewSelection"])(formData.aid);
    }
  },

  //delete annotation
  delete(formData) {
    //if annotation has selected text unwrap and delete it
    if (formData.aid) {
      Object(_selection__WEBPACK_IMPORTED_MODULE_10__["deleteSelection"])(formData.aid);
    } else {
      //remove mark from paragraph
      $(`#${formData.rangeStart} > span.pnum`).removeClass("has-annotation"); //remove all paragraphs in bookmark with class .note-style-bookmark

      let end = parseInt(formData.rangeEnd.substr(1), 10);
      let start = parseInt(formData.rangeStart.substr(1), 10);
      let pid = start;

      do {
        $(`#p${start}`).removeClass("note-style-bookmark");

        if (start === pid) {
          $(`#p${start}`).removeClass("note-style-bookmark-start");
        }

        if (start === end) {
          $(`#p${start}`).removeClass("note-style-bookmark-end");
        }

        start++;
      } while (start <= end);
    } //if annotation has links, remove the linkify icon


    if (formData.links) {
      $(`i[data-link-aid="${formData.creationDate}"]`).remove();
    } //mark as having no annotations if all have been deleted


    let remainingAnnotations = _bmnet__WEBPACK_IMPORTED_MODULE_2__["default"].deleteAnnotation(formData.rangeStart, formData.creationDate);

    if (remainingAnnotations === 0) {
      $(`#${formData.rangeStart} > span.pnum`).removeClass("has-bookmark");
    } //delete topics from the page topic list


    _topics__WEBPACK_IMPORTED_MODULE_9__["default"].delete(formData);
  }

};
/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (pid, constants) {
    teaching = constants; //provide teaching constants to bmnet

    Object(_bmnet__WEBPACK_IMPORTED_MODULE_2__["netInit"])(teaching);

    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage(pid, constants);
    } //initialize bookmark list modal - available on all pages


    _list__WEBPACK_IMPORTED_MODULE_8__["default"].initialize(constants);
  }
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/clipboard.js":
/*!********************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/clipboard.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clipboard */ "../cmi-www/node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");


 //var clipboard;

var clipboard = new Map();

function setEvents(clip) {
  clip.on("success", e => {
    //console.log("e.text: %s", e.text);
    if (e.text.indexOf("tocbook") > -1) {
      //modal dialog is displayed so notify won't work
      $(".toc.modal > .message").html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("clip:url")}</p>`);
      setTimeout(() => {
        $(".toc.modal > .message > p").remove();
      }, 2000);
    } else {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("clip:link"));
    }

    e.clearSelection();
  });
  clip.on("error", () => {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e3"));
  });
}

function createInstance(selector) {
  var object = new clipboard__WEBPACK_IMPORTED_MODULE_0___default.a(selector);
  setEvents(object);
  return object;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  register: function (selector) {
    let clip = clipboard.get(selector);

    if (!clip) {
      clip = createInstance(selector);
      clipboard.set(selector, clip);
    }

    return clip;
  },
  destroy: function (selector) {
    let clip = clipboard.get(selector);

    if (clip) {
      clip.destroy();
      clipboard.delete(selector);
    }
  }
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/list.js":
/*!***************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/list.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bmnet */ "../cmi-www/src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/flatten */ "../cmi-www/node_modules/lodash/flatten.js");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/uniqWith */ "../cmi-www/node_modules/lodash/uniqWith.js");
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqWith__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! store */ "../cmi-www/node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/*
  Display list of bookmarks for user/source and allow for filtering by topic
*/





 //import {getSourceId, getKeyInfo} from "../_config/key";
//const transcript = require("../_config/key");
//import {getPageInfo} from "../_config/config";

const uiBookmarkModal = ".bookmark.ui.modal";
const uiOpenBookmarkModal = ".bookmark-modal-open";
const uiModalOpacity = 0.5; //teaching specific constants

let teaching = {};

function bookmarkModalState(option, modalInfo) {
  const name = teaching.bm_modal_key;
  let info;

  switch (option) {
    case "get":
      info = store__WEBPACK_IMPORTED_MODULE_4___default.a.get(name);

      if (!info) {
        info = {
          modal: {
            filter: false
          }
        };
      }

      return info;

    case "set":
      store__WEBPACK_IMPORTED_MODULE_4___default.a.set(name, modalInfo);
      break;

    default:
      throw new Error("Invalid value for 'option' argument: use 'set' or 'get'");
  }
} //generate the option element of a select statement


function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  }

  return `<option value="${topic}">${topic}</option>`;
} //generate select html for Topics


function makeTopicSelect(topics) {
  return `
    <label>Filter Topic(s)</label>
    <select name="topicList" id="bookmark-topic-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("label:selecttopic")}</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("annotate:m13");
  }

  return `
    <div class="ui horizontal bulleted list">
      ${listArray.map(item => `
        <div class="item">
          <em>${typeof item === "object" ? item.topic : item}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function generateParagraphList(pid, bkmk, url, pTopicList) {
  if (bkmk.length === 0) {
    return `
      <div class="bookmark-item item"> <!-- ${pid} -->
        <i class="bookmark icon"></i>
        <div class="content">
          <div class="header">
            <a href="${url}?bkmk=${pid}">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("label:para")}: ${pid}</a>
          </div>
        </div>
      </div> <!-- item: ${pid} -->
    `;
  }

  let topicString = pTopicList.reduce((result, item) => {
    if (typeof item === "object") {
      return `${result} ${item.value}`;
    }

    return `${result} ${item}`;
  }, "");
  return `
    <div class="${topicString} bookmark-item item"> <!-- ${pid} -->
      <i class="bookmark icon"></i>
      <div class="content">
        <div class="header">
          <a href="${url}?bkmk=${pid}">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("label:para")}: ${pid}</a>
        </div>
        <div class="list">
          ${bkmk.map(annotation => `
            <div class="item"> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
              <i class="right triangle icon"></i>
              <div class="content">
                <div class="header">
                  ${generateHorizontalList(annotation.topicList)}
                </div>
                <div class="description">
                  ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("annotate:m7")}
                </div>
              </div>
            </div> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
          `).join("")}
        </div>
      </div>
    </div> <!-- item: ${pid} -->
  `;
}

function generateBookmarksForPage(bookmarks, url) {
  let html = ""; //loop over all paragraphs containing bookmarks

  for (let pid in bookmarks) {
    //omit topic list keys
    if (!pid.startsWith("tpList")) {
      let paragraphId = `p${(parseInt(pid, 10) - 1).toString(10)}`;
      html += generateParagraphList(paragraphId, bookmarks[pid], url, bookmarks[`tpList${pid}`]);
    }
  }

  return html;
}

function generatePageTitle(page) {
  let title = `${page.title}`;

  if (page.subTitle) {
    title = `${title}: ${page.subTitle}`;
  }

  return title;
}

function generateBookmarksForBookPages(pages) {
  return `
    ${pages.map(page => `
      <div class="item"> <!-- item: ${page.title} -->
        <i class="file icon"></i>
        <div class="content">
          <div class="header">
            ${generatePageTitle(page)}
          </div>
          <div class="list">
            ${generateBookmarksForPage(page.bookmarks, page.url)}
          </div>
        </div>
      </div>
    `).join("")}
  `;
}

function generateBookmarkList(books) {
  if (books.length === 0) {
    return _language_lang__WEBPACK_IMPORTED_MODULE_5__["__lang"]`
      <h2 class="ui center aligned icon header">
        <i class="circular bookmark icon"></i>
        ${"bmlist:header"}
      </h2>
      <p>
        ${"bmlist:intro"}
      </p>
      <ul>
        <li>${"bmlist:item1"}</li>
        <li>${"bmlist:item2"}</li>
      </ul>
      <p>
        ${"bmlist:link"}
      </p>
    `;
  }

  return `
    ${books.map(book => `
      <div data-bid="${book.bookId}" class="item"> <!-- item: ${book.bookId} -->
        <div class="right floated content">
          <div data-book="${book.bookId}" class="green ui small button">Open</div>
        </div>
        <i class="book icon"></i>
        <div class="content">
          <div class="${book.bookId}-header header">
            ${book.bookTitle}
          </div>
          <div id="${book.bookId}-list" class="hide-bookmarks list">
            ${generateBookmarksForBookPages(book.pages)}
          </div>
        </div>
      </div> <!-- item: ${book.bookId} -->
    `).join("")}
  `;
}
/*
  The argument is an array of pages containing bookmarks. Create a new
  array with one entry per book with an array of pages for that book
*/


function combinePages(pages) {
  let books = {};
  let bookArray = []; //rearrange the data into a single object per page

  pages.forEach(page => {
    if (!books[page.bookId]) {
      books[page.bookId] = {};
      books[page.bookId].bookId = page.bookId;
      books[page.bookId].bookTitle = page.bookTitle;

      if (page.subTitle) {
        books[page.bookId].subTitle = page.subTitle;
      }

      books[page.bookId].pages = [];
    }

    let pageInfo = {
      pageKey: page.pageKey,
      title: page.title,
      url: page.url,
      bookmarks: page.data
    };

    if (page.subTitle) {
      pageInfo.subTitle = page.subTitle;
    }

    books[page.bookId].pages.push(pageInfo);
  }); //copy from books to bookArray keeping the original order

  pages.forEach(page => {
    if (books[page.bookId]) {
      bookArray.push(books[page.bookId]);
      delete books[page.bookId];
    }
  });
  let allTopics = []; //add a list of all topics used for each bookmark

  bookArray.forEach(book => {
    book.pages.forEach(page => {
      for (let pid in page.bookmarks) {
        //console.log(page.bookmarks[pid]);
        if (page.bookmarks[pid].length > 0) {
          let tpl = page.bookmarks[pid].map(annotation => {
            if (annotation.topicList) {
              return annotation.topicList;
            } else {
              //bookmark has no topics
              return [];
            }
          }); //collect all topics used for modal dropdown select control

          let uniqueArray = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_3___default()(lodash_flatten__WEBPACK_IMPORTED_MODULE_2___default()(tpl), (a, b) => {
            if (a.value === b.value) {
              return true;
            }

            return false;
          });
          page.bookmarks[`tpList${pid}`] = uniqueArray;
          allTopics.push(uniqueArray);
        }
      }
    });
  });
  let flatTopics = lodash_flatten__WEBPACK_IMPORTED_MODULE_2___default()(allTopics);
  let sortedFlatTopics = flatTopics.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  let allUniqueTopics = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_3___default()(sortedFlatTopics, (a, b) => {
    if (a.value === b.value) {
      return true;
    }

    return false;
  });
  return {
    bookArray,
    topics: allUniqueTopics
  };
}
/*
  set bookmark modal form to previous state
*/


function restoreModalState() {
  let {
    modal
  } = bookmarkModalState("get");
  let form = $("#bookmark-filter-form");
  console.log("modal: ", modal);

  if (modal.filter) {
    form.form("set value", "topicList", modal.topics);
    $(".bookmark-filter-submit").trigger("click", {
      init: true
    });
  }
}

function filterResetHandler() {
  //clear filter
  $(".bookmark-filter-reset").on("click", function (e) {
    e.preventDefault();
    let form = $("#bookmark-filter-form");
    form.form("clear");
    let hiddenBookmarkItems = $(".cmi-bookmark-list .hide-bookmark-item.bookmark-item");
    hiddenBookmarkItems.each(function () {
      $(this).removeClass("hide-bookmark-item");
    }); //keep track of the state of the bookmark Modal

    let bookmarkModalInfo = bookmarkModalState("get"); //update book title to reflect number of bookmarks

    $("[data-bid]").each(function () {
      let bid = $(this).data("bid");
      $(`.${bid}-header`).text(`${bookmarkModalInfo[bid].header} (${bookmarkModalInfo[bid].count})`);
    });
    bookmarkModalInfo["modal"].filter = false;
    delete bookmarkModalInfo["modal"].topics;
    bookmarkModalState("set", bookmarkModalInfo);
  });
}

function filterSubmitHandler() {
  //apply topic filter
  $(".bookmark-filter-submit").on("click", function (e, data) {
    e.preventDefault();
    let form = $("#bookmark-filter-form");
    let topics = form.form("get value", "topicList");
    let topicRegExp = new RegExp(`\\b(${topics.join("|")})\\b`);

    if (topics.length === 0) {
      return;
    }

    let bookmarkItems = $(".cmi-bookmark-list .bookmark-item");
    bookmarkItems.each(function () {
      let classList = $(this).attr("class");

      if (classList.match(topicRegExp)) {
        //the bookmark could be hidden from a previous filter, so just remove the class
        //in case it's there
        $(this).removeClass("hide-bookmark-item");
      } else {
        $(this).addClass("hide-bookmark-item");
      }
    }); //keep track of the state of the bookmark Modal

    let bookmarkModalInfo = bookmarkModalState("get");
    let fullTopic = topics.map(t => {
      return {
        value: t,
        topic: $(`#bookmark-topic-list > [value='${t}']`).text()
      };
    }); //if we have data we're initializing and so we don't need to save state

    if (!data) {
      bookmarkModalInfo["modal"].filter = true;
      bookmarkModalInfo["modal"].topics = topics;
      bookmarkModalInfo["modal"].fullTopic = fullTopic;
      bookmarkModalState("set", bookmarkModalInfo);
    }

    $("[data-bid]").each(function () {
      let bid = $(this).data("bid");
      let filtered = $(`[data-bid="${bid}"] .bookmark-item.hide-bookmark-item`).length;
      let remaining = bookmarkModalInfo[bid].count - filtered; //update title to reflect number of bookmarks shown after filter applied

      $(`.${bid}-header`).html(`${bookmarkModalInfo[bid].header} (<span class="bookmark-filter-color">${remaining}</span>/${bookmarkModalInfo[bid].count})`);
    });
  });
} //set click listener to open/close book level bookmarks


function openCloseHandler() {
  $(".cmi-bookmark-list").on("click", "[data-book]", function (e) {
    e.stopPropagation();
    let bookId = $(this).attr("data-book");
    let bookList = $(`#${bookId}-list`);

    if (bookList.hasClass("hide-bookmarks")) {
      bookList.removeClass("hide-bookmarks");
      $(this).text("Close").removeClass("green").addClass("yellow");
    } else {
      bookList.removeClass("yellow").addClass("green hide-bookmarks");
      $(this).text("Open").removeClass("yellow").addClass("green");
    }
  });
}
/*
  This is called each time the user displays the bookmark list
  - the first time it's called we need to generate html for all bookmarks
  - subsequent calls will regenerate html only if bookmarks have been added
    or deleted since the last time html was generated.
*/


function populateModal(bookmarks) {
  let initialCall = true;
  let html;
  let info = [];
  /*
    We need to populate the modal html if it hasn't been done yet or
    if a bookmark has been added or changed since we last did it.
    - check if we need to do it.
  */

  let lbd = $(".cmi-bookmark-list").attr("data-lbd");

  if (lbd) {
    //check if it is different from that found in booimarks
    lbd = parseInt(lbd, 10);

    if (lbd === bookmarks.lastBuildDate) {
      //don't need to update
      return;
    } else {
      initialCall = false;
    }
  } //record time bookmark was last generated


  $(".cmi-bookmark-list").attr("data-lbd", bookmarks.lastBuildDate); //get page info for each page with bookmarks

  for (let pageKey in bookmarks) {
    if (pageKey !== "lastFetchDate" && pageKey !== "lastBuildDate") {
      info.push(teaching.getPageInfo(pageKey, bookmarks[pageKey]));
    }
  } //we have an array of bookmarks, each element represents a page


  Promise.all(info).then(responses => {
    let {
      bookArray,
      topics
    } = combinePages(responses); //console.log("unique topics: %o", topics);
    //generate html and attach to modal dialog

    html = generateBookmarkList(bookArray);
    $(".cmi-bookmark-list").html(html);
    let select = makeTopicSelect(topics);
    $("#bookmark-modal-topic-select").html(select);
    $("#bookmark-topic-list").dropdown();
    $("#bookmark-modal-loading").removeClass("active").addClass("disabled");
    let bookmarkModalInfo = bookmarkModalState("get"); //get number of bookmarks for each book

    $("[data-bid]").each(function () {
      let info = {};
      let bid = $(this).data("bid");
      info.count = $(`[data-bid="${bid}"] .bookmark-item`).length;
      info.header = $(`.${bid}-header`).text().trim(); //update title to reflect number of bookmarks

      $(`.${bid}-header`).text(`${info.header} (${info.count})`);
      bookmarkModalInfo[bid] = info;
    }); //only do this the first time 

    if (initialCall) {
      bookmarkModalState("set", bookmarkModalInfo);
      openCloseHandler();
      filterSubmitHandler();
      filterResetHandler(); //restore past state if needed

      restoreModalState();
    }
  }).catch(err => {
    console.error(err);
  });
}
/*
  We query bookmarks just once per day and whenever bookmarks have changed
*/


function initList() {
  const {
    sourceId
  } = teaching.keyInfo.getKeyInfo();
  _bmnet__WEBPACK_IMPORTED_MODULE_0__["default"].queryBookmarks(sourceId).then(response => {
    console.log("calling populateModal()");
    populateModal(response);
  }).catch(err => {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("error:e4"));
    console.error("Error getting bookmarks for: %s from server", sourceId, err);
  });
}

function initBookmarkModal() {
  $(uiBookmarkModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    autofocus: false,
    centered: true,
    duration: 400,
    inverted: true,
    observeChanges: true,
    transition: "horizontal flip",
    onShow: function () {
      //console.log("calling initList()");
      initList();
    },
    onVisible: function () {},
    onHidden: function () {}
  });
  $(uiOpenBookmarkModal).on("click", e => {
    e.preventDefault(); //populateBookmarkModal(uiBookmarkModalDiv);

    $(uiBookmarkModal).modal("show");
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (constants) {
    teaching = constants;
    initBookmarkModal();
  }
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/navigator.js":
/*!********************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/navigator.js ***!
  \********************************************************/
/*! exports provided: initShareDialog, initNavigator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareDialog", function() { return initShareDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavigator", function() { return initNavigator; });
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/intersection */ "../cmi-www/node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/intersectionWith */ "../cmi-www/node_modules/lodash/intersectionWith.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/range */ "../cmi-www/node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! store */ "../cmi-www/node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "../cmi-www/node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shareByEmail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shareByEmail */ "../cmi-www/src/js/modules/_bookmark/shareByEmail.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clipboard */ "../cmi-www/src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");









 //const transcript = require("../_config/key");
//const bm_modal_store = "bm.www.modal";
//const bm_list_store = "bm.www.list";
//teaching specific constants

let teaching = {};
let shareEventListenerCreated = false;
let gPageKey;

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("annotate:m13");
  }

  return `
    <div class="ui horizontal bulleted list">
      ${listArray.map(item => `
        <div class="item">
          <em>${typeof item === "object" ? item.topic : item}</em>
        </div>
      `).join("")}
    </div>
  `;
}
/*
  generate html for annotation
  args: annotation - annotation object
        topics - filter array

  if topics.length > 0 then generate html only for
  annotations that have topics found in the filter array
*/


function generateAnnotation(annotation, topics = []) {
  let match;

  if (!annotation.topicList) {
    annotation.topicList = [];
  } //convert annotation topics list into string array


  let topicList = annotation.topicList.map(topic => {
    if (typeof topic === "object") {
      return topic.value;
    }

    return topic;
  });

  if (topics.length > 0) {
    match = lodash_intersection__WEBPACK_IMPORTED_MODULE_0___default()(topicList, topics);
  }

  if (topics.length === 0 || match.length > 0) {
    return `
      <div class="item"> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="header">
            ${generateHorizontalList(annotation.topicList)}
          </div>
          <div class="description">
            <a data-aid="${annotation.aid}" class="annotation-item" data-range="${annotation.rangeStart}/${annotation.rangeEnd}">
              ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("annotate:m7")}
            </a>
          </div>
        </div>
      </div> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
    `;
  } else {
    return `<!-- annotation filtered: ${topics.join(" ")} -->`;
  }
}

function generateBookmark(actualPid, bkmk, topics) {
  return `
    <div class="ui list">
      <div class="item">
        <i class="bookmark icon"></i>
        <div class="content">
          <div class="header">
            Paragraph: ${actualPid}
          </div>
          <div class="list">
            ${bkmk.map(annotation => `
              ${generateAnnotation(annotation, topics)}
            `).join("")}
          </div>
        </div>
      </div>
    </div>
 `;
}
/*
  returns the url for the first annotation of the arg bookmark
  Note: deleted annotations are empty arrays so skip over them.
*/


function getBookmarkUrl(bookmarks, pageKey, pid) {
  let url;
  let bookmark = bookmarks[pageKey][pid];
  let selectedText = bookmark[0].selectedText;

  if (selectedText) {
    url = `${bookmark[0].selectedText.url}?bkmk=${bookmark[0].rangeStart}`;
  } else {
    //we have a bookmark with no selected text, have to get the url in another way
    url = `${teaching.url_prefix}${teaching.keyInfo.getUrl(pageKey)}?bkmk=${bookmark[0].rangeStart}`;
  } //console.log("url: %s", url);


  return url;
}

function getNextPageUrl(pos, pageList, filterList, bookmarks) {
  if (pos > pageList.length) {
    return Promise.resolve(null);
  }

  let found = false;
  let pagePos;
  let pid;

  outer: for (pagePos = pos; pagePos < pageList.length; pagePos++) {
    let pageMarks = bookmarks[pageList[pagePos]];

    for (pid in pageMarks) {
      for (let a = 0; a < pageMarks[pid].length; a++) {
        //no filter in effect
        if (!filterList || filterList.length === 0) {
          found = true;
          break outer;
        } else {
          //compare the filter topic (a) with bookmark topics ({value, topic})
          let match = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1___default()(filterList, pageMarks[pid][a].topicList || [], (a, b) => {
            if (a === b.value) {
              return true;
            }

            return false;
          });

          if (match.length > 0) {
            found = true;
            break outer;
          }
        }
      }
    }
  }

  return new Promise(resolve => {
    if (found) {
      let pageKey = pageList[pagePos];
      let url = getBookmarkUrl(bookmarks, pageKey, pid); //it's possible the url was not found so check for that

      if (url) {
        resolve(url);
      } else {
        resolve(null);
      }
    } else {
      //console.log("next url is null");
      resolve(null);
    }
  });
}

function getPrevPageUrl(pos, pageList, filterList, bookmarks) {
  if (pos < 0) {
    return Promise.resolve(null);
  }

  let found = false;
  let pagePos;
  let pid;

  outer: for (pagePos = pos; pagePos >= 0; pagePos--) {
    let pageMarks = bookmarks[pageList[pagePos]];

    for (pid in pageMarks) {
      for (let a = 0; a < pageMarks[pid].length; a++) {
        //no filter in effect
        if (!filterList || filterList.length === 0) {
          found = true;
          break outer;
        } else {
          let match = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1___default()(filterList, pageMarks[pid][a].topicList || [], (a, b) => {
            if (a === b.value) {
              return true;
            }

            return false;
          });

          if (match.length > 0) {
            found = true;
            break outer;
          }
        }
      }
    }
  }

  return new Promise(resolve => {
    if (found) {
      let pageKey = pageList[pagePos];
      let url = getBookmarkUrl(bookmarks, pageKey, pid); //console.log("prev url is %s", url);

      resolve(url);
    } else {
      //console.log("prev url is null");
      resolve(null);
    }
  });
}

function getNextPrevUrl(pageKey, bookmarks, bmModal) {
  let pages = Object.keys(bookmarks);
  let pos = pages.indexOf("lastFetchDate");
  let urls = {
    next: null,
    prev: null
  };

  if (pos > -1) {
    pages.splice(pos, 1);
  }

  pos = pages.indexOf(pageKey);

  if (pos === -1) {
    return Promise.reject("bookmark not found");
  } //console.log("current page: %s", pageKey);


  let nextPromise = getNextPageUrl(pos + 1, pages, bmModal["modal"].topics, bookmarks);
  let prevPromise = getPrevPageUrl(pos - 1, pages, bmModal["modal"].topics, bookmarks);
  return Promise.all([prevPromise, nextPromise]);
}
/*
  Given the postion (currentPos) in pageMarks of the current pid, find the previous
  one. Return the actualPid or null.

  Omit bookmarks that don't have at least one topic found in topics[]. If topics[]
  has no data then no filtering is done.

  args:
    currentPos - position in pageMarks of the current paragraph
    pageMarks - an array of paragraph keys with bookmarks
    pageBookmarks - bookmarks found on the page
    topics - an array of topics by which to filter bookmarks
*/


function getPreviousPid(currentPos, pageMarks, pageBookmarks, topics) {
  //there is no previous bookmark
  if (currentPos < 1) {
    return null;
  } //no filtering


  if (topics.length === 0) {
    return `p${(parseInt(pageMarks[currentPos - 1], 10) - 1).toString(10)}`;
  } else {
    //topic filtering - look through all previous paragraphs for the first one
    //containing an annotation found in topics[]
    for (let newPos = currentPos - 1; newPos >= 0; newPos--) {
      let bookmark = pageBookmarks[pageMarks[newPos]];

      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].topicList && bookmark[i].topicList.length > 0) {
          let inter = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1___default()(bookmark[i].topicList, topics, (a, b) => {
            if (a.value === b) {
              return true;
            }

            return false;
          });

          if (inter.length > 0) {
            //we found a bookmark containing a topic in the topicList
            return `p${(parseInt(pageMarks[newPos], 10) - 1).toString(10)}`;
          }
        }
      }
    } //there are no remaining bookmarks with a topic in topics


    return null;
  }
}
/*
  Given the postion (currentPos) in pageMarks of the current pid, find the next
  one. Return the actualPid or null.

  Omit bookmarks that don't have at least one topic found in topics[]. If topics[]
  has no data then no filtering is done.

  args:
    currentPos - position in pageMarks of the current paragraph
    pageMarks - an array of paragraph keys with bookmarks
    pageBookmarks - bookmarks found on the page
    topics - an array of topics by which to filter bookmarks
*/


function getNextPid(currentPos, pageMarks, pageBookmarks, topics) {
  //there is "no" next bookmark
  if (currentPos + 1 === pageMarks.length) {
    return null;
  } //no filtering


  if (topics.length === 0) {
    return `p${(parseInt(pageMarks[currentPos + 1], 10) - 1).toString(10)}`;
  } else {
    //topic filtering - look through all previous paragraphs for the first one
    //containing an annotation found in topics[]
    for (let newPos = currentPos + 1; newPos < pageMarks.length; newPos++) {
      let bookmark = pageBookmarks[pageMarks[newPos]];

      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].topicList && bookmark[i].topicList.length > 0) {
          let inter = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_1___default()(bookmark[i].topicList, topics, (a, b) => {
            if (a.value === b) {
              return true;
            }

            return false;
          });

          if (inter.length > 0) {
            //we found a bookmark containing a topic in the topicList
            return `p${(parseInt(pageMarks[newPos], 10) - 1).toString(10)}`;
          }
        }
      }
    } //there are no remaining bookmarks with a topic in topics


    return null;
  }
}
/*
  args: pageKey - identifies the current page
        pid - paragraph id
        allBookmarks - an array of all bookmarks
        bmModal - contains topics for filtering
        whoCalled - when the function is called by a click handler the value is
                    either "previous" or "next". When "previous", a new value
                    for previous bookmark needs to be determind, ditto for "next"

  Note: the value of pid is the actual paragraph id and not the key which is pid + 1.
  Bookmark info is stored according to key so we increment the pid to access the data
*/


function getCurrentBookmark(pageKey, actualPid, allBookmarks, bmModal, whoCalled) {
  let pidKey;
  let topics = [];
  let filterTopics;

  if (bmModal["modal"].filter) {
    topics = bmModal["modal"].topics;
    filterTopics = generateHorizontalList(bmModal["modal"].fullTopic);
  } //convert pid to key in bookmark array


  pidKey = (parseInt(actualPid.substr(1), 10) + 1).toString(10);
  let paragraphBookmarks = allBookmarks[pageKey][pidKey]; //the current bookmark (actualPid) does not exist
  //this would happen where url includes ?bkmk=p3 and p3 does not have a bookmark

  if (!paragraphBookmarks) {
    return false;
  }

  let html = generateBookmark(actualPid, paragraphBookmarks, topics);

  if (filterTopics) {
    $("#filter-topics-section").removeClass("hide");
    $(".bookmark-navigator-filter").html(filterTopics);
  } else {
    $("#filter-topics-section").addClass("hide");
  }

  $(".bookmark-navigator-header-book").text($("#book-title").text());
  $("#bookmark-content").html(html); //get links to next and previous bookmarks on the page

  let pageMarks = Object.keys(allBookmarks[pageKey]);
  let pos = pageMarks.indexOf(pidKey); //if topic filtering is enabled

  let prevActualPid;
  let nextActualPid;
  prevActualPid = getPreviousPid(pos, pageMarks, allBookmarks[pageKey], topics);
  nextActualPid = getNextPid(pos, pageMarks, allBookmarks[pageKey], topics);
  $(".bookmark-navigator .current-bookmark").attr("data-pid", `${actualPid}`); //console.log("prev: %s, next: %s", prevActualPid, nextActualPid);
  //set previous to inactive

  if (!prevActualPid) {
    $(".bookmark-navigator .previous-bookmark").addClass("inactive");
    $(".bookmark-navigator .previous-bookmark").html(`<i class='up arrow icon'></i> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("action:prev")}`);
  } else {
    //add data-pid attribute to link for previous bkmk
    $(".bookmark-navigator .previous-bookmark").attr("data-pid", prevActualPid);
    $(".bookmark-navigator .previous-bookmark").removeClass("inactive");
    $(".bookmark-navigator .previous-bookmark").html(`<i class="up arrow icon"></i> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("action:prev")} (${prevActualPid})`);
  }

  if (!nextActualPid) {
    $(".bookmark-navigator .next-bookmark").addClass("inactive");
    $(".bookmark-navigator .next-bookmark").html(`<i class='down arrow icon'></i> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("action:next")}`);
  } else {
    //add data-pid attribute to link for next bkmk
    $(".bookmark-navigator .next-bookmark").attr("data-pid", nextActualPid);
    $(".bookmark-navigator .next-bookmark").removeClass("inactive");
    $(".bookmark-navigator .next-bookmark").html(`<i class="down arrow icon"></i> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("action:next")} (${nextActualPid})`);
  }

  return true;
}
/*
  Setup the bookmark navigator for the page.
  arg: pid - paragraph id.
*/


function bookmarkManager(actualPid) {
  let sourceId = teaching.keyInfo.getSourceId();
  let pageKey = teaching.keyInfo.genPageKey().toString(10);
  let bmList = store__WEBPACK_IMPORTED_MODULE_3___default.a.get(teaching.bm_list_store);
  let bmModal = store__WEBPACK_IMPORTED_MODULE_3___default.a.get(teaching.bm_modal_store);

  if (bmList) {
    //store globally
    gPageKey = pageKey; //get previous and next url's

    getNextPrevUrl(pageKey, bmList, bmModal).then(responses => {
      //console.log("next/prev urls: ", responses);
      //set prev and next hrefs
      if (responses[0] !== null) {
        $(".bookmark-navigator .previous-page").attr({
          "href": responses[0]
        });
      } else {
        $(".bookmark-navigator .previous-page").addClass("inactive").removeAttr("href");
      }

      if (responses[1] !== null) {
        $(".bookmark-navigator .next-page").attr({
          "href": responses[1]
        });
      } else {
        $(".bookmark-navigator .next-page").addClass("inactive").removeAttr("href");
      } //identify current bookmark in navigator
      //returns false if actualPid does not contain a bookmark


      if (!getCurrentBookmark(pageKey, actualPid, bmList, bmModal, "both")) {
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_9__["__lang"]`${"fragment:f1"} ${actualPid} ${"fragment:f2"}`);
        return;
      } //init navigator controls


      initClickListeners(); //indicate bookmark navigator is active by adding class to ./transcript

      $(".transcript").addClass("bookmark-navigator-active"); //show the navigator and scroll

      $(".bookmark-navigator-wrapper").removeClass("hide-bookmark-navigator");
      setTimeout(scrollIntoView, 250, actualPid, "bookmarkManager");
    }).catch(err => {
      console.error(err);

      if (err === "bookmark not found") {
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_9__["__lang"]`${"fragment:f1"} ${actualPid} ${"fragment:f2"}`);
      }
    });
  } else {
    console.log(teaching.bm_list_store);
  }
}
/*
  Update previous and next bookmark links on navigator.

  args:
    pid: the actual pid to display
    update: either "previous", or "next" depending on what click handler called the function
*/


function updateNavigator(pid, update) {
  //console.log("updateNavigator, pid: %s, update: %s", pid, update);
  let bmList = store__WEBPACK_IMPORTED_MODULE_3___default.a.get(teaching.bm_list_store);
  let bmModal = store__WEBPACK_IMPORTED_MODULE_3___default.a.get(teaching.bm_modal_store);
  getCurrentBookmark(gPageKey, pid, bmList, bmModal, update);
}
/*
  An annotation is selected and the user can choose from sharing options. This dialog
  is set up by adding the .selected-annotation class.

  It is cleared here thus removing the share dialog
*/


function clearSelectedAnnotation() {
  let selected = $(".selected-annotation"); //remove dialog

  if (selected.length > 0) {
    $(".selected-annotation-wrapper > .header").remove();
    selected.unwrap().removeClass("selected-annotation");
    $(".bookmark-selected-text.show").removeClass("show"); //clear text selection guard applied whey bookmark is edited
    // if .user exists then guard is user initiated and we don't clear it

    let guard = $("div.transcript.ui.disable-selection:not(.user)");

    if (guard.length > 0) {
      console.log("removing selection guard");
      guard.removeClass("disable-selection");
    }
  }
}

function scrollComplete(message, type) {
  console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from bookmark navigator ${caller}(${id})`, type);
  });
}
/*
  Click handler for FB and email share dialog. This can be called from this
  module when the bookmark navigator is active or from annotate.js when
  the share button is clicked from the annotation edit dialog.
*/


function initShareDialog(source) {
  if (shareEventListenerCreated) {
    return;
  } //console.log("initShareDialog(%s)", source);
  //share icon click handler


  $(".transcript").on("click", ".selected-annotation-wrapper .share-annotation", function (e) {
    e.preventDefault();
    let annotation = $(".selected-annotation-wrapper mark.show");
    let userInfo;
    let pid, aid, text;

    if ($(this).hasClass("close")) {
      clearSelectedAnnotation();
      return;
    }

    userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_8__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("annotate:m14"));
      return;
    }

    let url = $(".selected-annotation-wrapper i[data-clipboard-text]").attr("data-clipboard-text"); //check for intermittent error in url

    let pos = url.indexOf("undefined");
    let channel;

    if ($(this).hasClass("facebook")) {
      channel = "facebook";
    } else if ($(this).hasClass("envelope")) {
      channel = "email";
    } else if ($(this).hasClass("linkify")) {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("error:e5"));
        return;
      } //work is already done


      channel = "clipboard";
      return;
    }

    pid = $(".selected-annotation-wrapper p").attr("id"); //no highlighted text so grab the whole paragraph

    if (annotation.length === 0) {
      text = $(`#${pid}`).text().replace(/\n/, " ");
    } else {
      text = annotation.text().replace(/\n/, " ");
    }

    let srcTitle = $("#src-title").text();
    let bookTitle = $("#book-title").text();
    let citation = `~ ${srcTitle}: ${bookTitle}`;

    if (channel === "facebook") {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("error:e5"));
        return;
      }

      let options = {
        method: "share",
        hashtag: "#christmind",
        quote: `${text}\n${citation}`,
        href: url
      };
      FB.ui(options, function () {});
    } else if (channel === "email") {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("error:e5"));
        return;
      }

      Object(_shareByEmail__WEBPACK_IMPORTED_MODULE_6__["shareByEmail"])(text, citation, url);
    }
  });
  shareEventListenerCreated = true;
}

function initClickListeners() {
  //previous bookmark
  $(".bookmark-navigator .previous-bookmark").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator previous-bookmark(${actualPid})`, type);
    });
    updateNavigator(actualPid, "previous");
  });
  $(".bookmark-navigator .next-bookmark").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator next-bookmark(${actualPid})`, type);
    });
    updateNavigator(actualPid, "next");
  });
  $(".bookmark-navigator .current-bookmark").on("click", function (e) {
    e.preventDefault();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator current-bookmark(${actualPid})`, type);
    });
  });
  $(".bookmark-navigator .close-window").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    $(".bookmark-navigator-wrapper").addClass("hide-bookmark-navigator");
    $(".transcript").removeClass("bookmark-navigator-active");
  }); //highlights an annotation by wrapping it in a segment

  $(".bookmark-navigator").on("click", ".annotation-item", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_8__["getUserInfo"])();

    if (!userInfo) {
      userInfo = {
        userId: "xxx"
      };
    } //this is the annotation-id on the bookmark in the navigator


    let annotation_id = $(this).attr("data-aid");
    let aid;
    let dataRange = $(this).attr("data-range");
    let rangeArray = dataRange.split("/");
    let pid = rangeArray[0]; //get the aid from the highlight if it exists, won't exist for note level bookmark

    if (annotation_id !== "undefined") {
      aid = $(`[data-annotation-id='${annotation_id}']`).attr("data-aid");
      $(`[data-annotation-id="${aid}"]`).addClass("show");
    } else {
      //this is a note level bookmark, get aid from the pid
      aid = $(`#${pid} > span.pnum`).attr("data-aid");
    }

    let url = `https://${location.hostname}${location.pathname}?as=${pid}:${aid}:${userInfo.userId}`;
    let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_2___default()(numericRange[0], numericRange[1] + 1);
    let header;

    if (userInfo.userId === "xxx") {
      header = `
        <h4 class="ui header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_9__["getString"])("annotate:m11")}" class="red window close outline small icon"></i>
          <div class="content">
            ${$(this).text()}
          </div>
        </h4>
      `;
    } else {
      header = _language_lang__WEBPACK_IMPORTED_MODULE_9__["__lang"]`
        <h4 class="ui header">
          <i title="${"action:fbshare"}" class="share-annotation facebook small icon"></i>
          <i title="${"action:emailshare"}" class="share-annotation envelope outline small icon"></i>
          <i data-clipboard-text="${url}" title="${"action:cp2clip"}" class="share-annotation linkify small icon"></i>
          <div class="content">
            ${$(this).text()}
          </div>
        </h4>
      `;
    }

    for (let i = 0; i < annotationRange.length; i++) {
      $(`#p${annotationRange[i]}`).addClass("selected-annotation");
    }

    $(".selected-annotation").wrapAll("<div class='selected-annotation-wrapper ui raised segment'></div>");
    $(".selected-annotation-wrapper").prepend(header);

    if (userInfo.userId !== "xxx") {
      _clipboard__WEBPACK_IMPORTED_MODULE_7__["default"].register(".share-annotation.linkify");
    }
  }); //init click events for FB and email sharing

  initShareDialog("bookmark/navigator.js");
}
/*
  User clicked a bookmark link in the bookmark list modal.

  Initialize the bookmark navigator so they can follow the list of bookmarks
*/


function initNavigator(actualPid, constants) {
  teaching = constants;
  bookmarkManager(actualPid);
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/selection.js":
/*!********************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/selection.js ***!
  \********************************************************/
/*! exports provided: highlightSkippedAnnotations, updateSelectionTopicList, deleteNewSelection, deleteSelection, getSelection, updateHighlightColor, markSelection, updateSelectedText, highlight, initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightSkippedAnnotations", function() { return highlightSkippedAnnotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectionTopicList", function() { return updateSelectionTopicList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteNewSelection", function() { return deleteNewSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSelection", function() { return deleteSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelection", function() { return getSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHighlightColor", function() { return updateHighlightColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markSelection", function() { return markSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedText", function() { return updateSelectedText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlight", function() { return highlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "../cmi-www/node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotate */ "../cmi-www/src/js/modules/_bookmark/annotate.js");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/isFinite */ "../cmi-www/node_modules/lodash/isFinite.js");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isFinite__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/difference */ "../cmi-www/node_modules/lodash/difference.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _topics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./topics */ "../cmi-www/src/js/modules/_bookmark/topics.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");


const textPosition = __webpack_require__(/*! dom-anchor-text-position */ "../cmi-www/node_modules/dom-anchor-text-position/index.js");

const textQuote = __webpack_require__(/*! dom-anchor-text-quote */ "../cmi-www/node_modules/dom-anchor-text-quote/index.js");

const wrapRange = __webpack_require__(/*! wrap-range-text */ "../cmi-www/node_modules/wrap-range-text/index.js"); //const uuid = require("uuid/v4");







 //all annotations on the page

let pageAnnotations = {}; //all annotations that were not highlighted due to shared annotation conflict

let skippedAnnotations = [];
function highlightSkippedAnnotations() {
  let sequence = 0;

  if (skippedAnnotations.length === 0) {
    return;
  }

  let node;

  for (let a of skippedAnnotations) {
    let annotation = pageAnnotations[a]; //console.log("annotation: %o", annotation);
    //all skipped annotations are on the same pid, so get id just once

    if (!node) {
      node = document.getElementById(annotation.pid);
    }

    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
    sequence += 1;
  }
}
/*
  add or update selected text class list with topics
*/

function updateSelectionTopicList(annotation) {
  let topicList; //annotation has no selected text

  if (!annotation.aid) {
    return;
  } //if annotation.topicList exists convert it to a string


  if (annotation.topicList && annotation.topicList.length > 0) {
    topicList = annotation.topicList.reduce((result, topic) => {
      return `${result} ${topic.value}`;
    }, "");
  } else {
    return;
  }

  let topicListArray = [];

  if (topicList) {
    topicList = topicList.trim();
    topicListArray = topicList.split(" ");
  } //get existing classes and convert to an array


  let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
  let classArray = existingClasses.split(" "); //remove bookmmark-selected-text

  let bstIndex = classArray.findIndex(item => item === "bookmark-selected-text");

  if (bstIndex > -1) {
    classArray.splice(bstIndex, 1);
  } //remove colorClass


  let ccIndex = classArray.findIndex(item => item.startsWith("colorClass"));

  if (ccIndex > -1) {
    classArray.splice(ccIndex, 1);
  } //classes have been added or deleted


  let deletedTopics = lodash_difference__WEBPACK_IMPORTED_MODULE_4___default()(classArray, topicListArray);
  let addedTopics = lodash_difference__WEBPACK_IMPORTED_MODULE_4___default()(topicListArray, classArray); //console.log("deletedTopics: %o", deletedTopics);
  //console.log("addedTopics: %o", addedTopics);
  //remove deleted topics

  if (deletedTopics.length > 0) {
    let dt = deletedTopics.join(" ");
    $(`[data-annotation-id="${annotation.aid}"]`).removeClass(dt); //track page topics

    _topics__WEBPACK_IMPORTED_MODULE_5__["default"].deleteTopics(deletedTopics);
  } //add added topics


  if (addedTopics.length > 0) {
    let at = addedTopics.join(" ");
    $(`[data-annotation-id="${annotation.aid}"]`).addClass(at); //track page topics
    //get object topics from annotation

    let addedObjectTopics = annotation.topicList.filter(topic => {
      let found = addedTopics.find(item => {
        return item === topic.value;
      });
      return found !== undefined;
    });
    _topics__WEBPACK_IMPORTED_MODULE_5__["default"].addTopics(addedObjectTopics);
  } //topics.report();

}
/*
  if the annotation is new then remove the highlight and
  delete from pageAnnotations
*/

function deleteNewSelection(id) {
  //no id when annotation has no associated text
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id]; //new highlite is not associated with a bookmark annotation so it doesn't have an 'aid' attribute

  if (highlite.aid) {
    return;
  } //remove highlight


  highlite.wrap.unwrap(); //delete the annotation

  delete pageAnnotations[id];
}
/*
  unwrap selected text and delete
*/

function deleteSelection(id) {
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id];

  if (!highlite) {
    return;
  } //remove highlight


  highlite.wrap.unwrap(); //delete the annotation

  delete pageAnnotations[id];
}
function getSelection(id) {
  return pageAnnotations[id];
}
function updateHighlightColor(id, sequence) {
  let colorClasses = ["colorClass1", "colorClass2", "colorClass3", "colorClass4", "colorClass5", "colorClass6"];
  $(`[data-annotation-id="${id}"]`).addClass(colorClasses[sequence % 6]);
}
/*
  Highlight selected text
  args:
    annotation: a bookmark annotation with selected text
    sequence: the sequence of this annotation within the paragraph
    sharePid: the pid of a shared bookmark, null otherwise. The pid is highlighted after
              the sharedPid is closed
*/

function markSelection(annotation, sequence = 0, sharePid = null) {
  let node = document.getElementById(annotation.pid);

  if (!sharePid || sharePid !== annotation.pid) {
    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
  } else if (sharePid) {
    console.log("highlight of %s skipped due to share", sharePid);
    skippedAnnotations.push(annotation.id);
  }

  pageAnnotations[annotation.id] = annotation;
}
function updateSelectedText(id, aid) {
  $(`[data-annotation-id="${id}"]`).attr("data-aid", aid);
}
function highlight(annotation, toNode = document.body) {
  var anno_id = annotation.id;

  if (annotation.target.source) {
    var selectors = annotation.target.selector;

    for (var i = 0; i < selectors.length; i++) {
      var selector = selectors[i];
      var type = selector.type;

      switch (type) {
        case "TextPositionSelector":
          // skip existing marks
          var existing_marks = document.querySelectorAll(`[data-annotation-id="${anno_id}"]`);

          if (existing_marks.length === 0) {
            var mark = document.createElement("mark");
            mark.dataset["annotationId"] = anno_id; //the id of the bookmark annotation that contains this annotation

            if (annotation.aid) {
              mark.dataset["aid"] = annotation.aid;
            }

            mark.classList.add("bookmark-selected-text"); //this sometimes fails and is fixed by adjusting the selector

            var range;

            try {
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            } catch (err) {
              console.log("adjusting selector.end");
              selector.end--;
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            }
          }

          break;
      }
    }
  }
}

function getSelectedText(range, fromNode = document.body) {
  if (range.collapsed) return null;
  var textPositionSelector = textPosition.fromRange(fromNode, range);
  Object.assign(textPositionSelector, {
    type: "TextPositionSelector"
  });
  var textQuoteSelector = textQuote.fromRange(fromNode, range);
  Object.assign(textQuoteSelector, {
    type: "TextQuoteSelector"
  });
  var selectedText = {
    type: "Annotation",
    title: $("#book-title").text(),
    url: location.pathname,
    pid: range.startContainer.parentNode.id,
    id: Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])(),
    target: {
      type: "SpecificResource",
      source: location.href,
      selector: [textPositionSelector, textQuoteSelector]
    }
  };
  return selectedText;
}
/*
  Capture user text selection
*/


function initialize(constants) {
  $("div.transcript.ui").on("mouseup", function (e) {
    e.preventDefault(); //ignore text selection when disabled by user or when annotation is 
    //being created

    if ($(this).hasClass("disable-selection")) {
      //console.log("selection prevented by selection guard");
      return;
    }

    if (document.getSelection().isCollapsed) {
      return;
    }

    let selObj = document.getSelection(); //console.log("selection: %o", selObj);
    //Safari calls this function twice for each selection, the second time
    //rangeCount === 0 and type == "None"

    if (selObj.rangeCount === 0) {
      //console.log("selObj.rangeCount === 0)");
      return;
    }

    if (selObj.getRangeAt(0).collapsed) {
      //console.log("range collapsed");
      return;
    }

    let range = selObj.getRangeAt(0);
    processSelection(range);
  }); //init annotation input, edit, and delete

  Object(_annotate__WEBPACK_IMPORTED_MODULE_2__["initialize"])(constants);
}
/*
  create annotation from selected text
*/

function processSelection(range) {
  //console.log("range: %o", range);
  //check for overlap with other highlighted text
  let startParent = range.startContainer.parentElement.localName;
  let endParent = range.endContainer.parentElement.localName;

  if (startParent === "span") {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e6"));
    console.log("selection includes <p>");
    return;
  }

  if (startParent === "mark" || endParent === "mark") {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e7"));
    console.log("overlapping selections");

    if (location.hostname === "localhost") {
      debugger;
    }

    return;
  }

  let rangeStart = range.startContainer.parentElement.id; //let rangeStart = range.commonAncestorContainer.id;

  let rangeEnd = range.endContainer.parentElement.id; //the range must start with a transcript paragraph, one whose id = "p<number>" or an <em> found
  //within a paragraph

  if (!rangeStart) {
    console.log("selection parent element: %s", range.startContainer.parentElement.nodeName);
    return;
  }

  if (!rangeStart.startsWith("p")) {
    console.log("range does not start with <p>");
    return;
  }

  let pid = parseInt(rangeStart.substr(1), 10);

  if (!lodash_isFinite__WEBPACK_IMPORTED_MODULE_3___default()(pid)) {
    console.log("Pid: %s !isFinite()");
    return;
  } //not sure how to handl text selected across paragraphs, so disallow it.


  if (rangeStart !== rangeEnd) {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e8"));
    console.log("multi paragraph selection: start: %s, end: %s", rangeStart, rangeEnd);
    return;
  }

  let node = document.getElementById(rangeStart); //create annotation

  let selectedText = getSelectedText(range, node);

  if (selectedText) {
    highlight(selectedText, node); //persist annotation

    pageAnnotations[selectedText.id] = selectedText;
    Object(_annotate__WEBPACK_IMPORTED_MODULE_2__["getUserInput"])(selectedText);
  }
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/shareByEmail.js":
/*!***********************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/shareByEmail.js ***!
  \***********************************************************/
/*! exports provided: initShareByEmail, shareByEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareByEmail", function() { return initShareByEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareByEmail", function() { return shareByEmail; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../cmi-www/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../globals */ "../cmi-www/src/js/globals.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_user/netlify */ "../cmi-www/src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");




 //teaching specific constants

let teaching = {};
let shareInfo = {}; //load email list and setup submit and cancel listeners

function initShareByEmail(constants) {
  teaching = constants;
  loadEmailList(); //submit

  $("form[name='emailshare']").on("submit", function (e) {
    e.preventDefault();
    const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.warning(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("annotate:m14"));
      $(".email-share-dialog-wrapper").addClass("hide");
      return;
    }

    let formData = $("#email-share-form").form("get values");

    if (formData.mailList.length === 0 && formData.emailAddresses.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("error:e9"));
      return;
    }

    shareInfo.to = "";

    if (formData.mailList.length > 0) {
      shareInfo.to = formData.mailList.join(",");
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
    shareInfo.sid = teaching.sid; //console.log("shareInfo: %o", shareInfo);
    //hide form not sure if this will work

    $(".email-share-dialog-wrapper").addClass("hide");
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_globals__WEBPACK_IMPORTED_MODULE_2__["default"].share, shareInfo).then(response => {
      if (response.status === 200) {
        toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("action:emailsent"));
      } else {
        toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(response.data.message);
      }
    }).catch(error => {
      console.error("share error: %s", error);
    });
  }); //cancel

  $("form[name='emailshare'] .email-share-cancel").on("click", function (e) {
    e.preventDefault(); //hide form

    $(".email-share-dialog-wrapper").addClass("hide");
  });
} //generate the option element of a select statement

function generateOption(item) {
  return `<option value="${item.address}">${item.first} ${item.last}</option>`;
}

function makeMaillistSelect(maillist) {
  return `
    <label>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:listnames")}</label>
    <select name="mailList" id="maillist-address-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:selectaddress")}</option>
      ${maillist.map(item => `${generateOption(item)}`).join("")}
    </select>
  `;
}
/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error
*/


function loadEmailList() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])();

  if (!userInfo) {
    return;
  }

  let maillist = [];
  let api = `${userInfo.userId}/maillist`;
  axios__WEBPACK_IMPORTED_MODULE_0___default()(`${_globals__WEBPACK_IMPORTED_MODULE_2__["default"].user}/${api}`).then(response => {
    maillist = response.data.maillist;
    let selectHtml = makeMaillistSelect(maillist);
    $("#maillist-select").html(selectHtml);
    $("#maillist-address-list.dropdown").dropdown();
  }).catch(err => {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("error:e10")}: ${err}`);
  });
}
/*
*/


function shareByEmail(quote, citation, url) {
  shareInfo = {
    citation,
    quote,
    url
  }; //show input form

  $(".hide.email-share-dialog-wrapper").removeClass("hide");
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_bookmark/topics.js":
/*!*****************************************************!*\
  !*** ../cmi-www/src/js/modules/_bookmark/topics.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/*
  Keeps track of topics used by page annotations that have selectedText

  The list of topics is added to the bookmark menu option on transcript pages
  and allows the user to show only highlighted text of the selected topic.

  When the user selects a topic, the class .topic-filter-active is added to .transcript
  and the class .show is added to each highlight containing the selected topic. This works
  because each highlight contains a class that corresponds to each topic the annotation 
  contains.
*/

let topics = new Map();
let listRefreshNeeded = true;
let deletedKeys = [];
const uiPageTopicsModal = "#page-topics-modal";
const uiOpenPageTopicsModal = "#page-topics-modal-open";
const uiModalOpacity = 0.5; //generate the option element of a select statement

function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  }

  return `<option value="${topic}">${topic}</option>`;
} //generate select html for Topics


function makeTopicSelect(topics) {
  return `
    <select name="pageTopicList" id="page-topics-topic-list" class="search ui dropdown">
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function formatTopic(topic) {
  if (topic === "__reset__") {
    return `<div class='reset-filter item'>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:clearfilter")}</div>`;
  }

  return `<div class="item">${topic}</div>`;
}

function makeTopicSelectElement() {
  let topicMap = getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    return topicMap.get(key);
  });
  topics.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }

    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  return makeTopicSelect(topics);
}

function getTopics() {
  return topics;
}
/*
  Generate html for page topic list and reset listRefreshNeeded indicator
*/


function makeTopicList(topicMap) {
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    let t = topicMap.get(key);
    return t.topic;
  });
  listRefreshNeeded = false;

  if (topics.length === 0) {
    return `<div class='ntf item'>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("annotate:m15")}</div>`;
  }

  topics.sort();
  topics.unshift("__reset__");
  return `
    ${topics.map(topic => `${formatTopic(topic)}`).join("")}
  `;
} //topic selection click handler


function topicSelectHandler() {
  $("#topic-menu-item").on("click", "#topic-menu-select > .item", function (e) {
    e.preventDefault(); //class .ntf indicates there are no topics, so just return

    if ($(this).hasClass("ntf")) {
      return;
    }

    let active; //clear the topic filter

    if ($(this).hasClass("reset-filter")) {
      active = $("#topic-menu-select > .active.item"); //check for unexpected condition

      if (active.length === 0) {
        return;
      }

      let activeTopic = active.text();

      if (activeTopic === "Clear Filter") {
        //there is not active filter so return
        return;
      }

      active.removeClass("active"); //remove .show from previously selected highlights

      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show"); //remove filter indication from .transcript

      $(".transcript").removeClass("topic-filter-active"); //reset header text

      $("#topic-menu-item").prev(".header").text(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
      $("#topic-menu-item").prev(".header").attr("data-filter", "none");
      return;
    } //filter already active


    if ($(this).hasClass("active")) {
      return;
    } //look for already active filter and remove it


    active = $("#topic-menu-select > .active.item");

    if (active.length > 0) {
      let activeTopic = active.text();
      active.removeClass("active"); //remove .show from previously selected highlights

      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show");
    } //mark topic as active


    $(this).addClass("active"); //mark transcript as having an active filter

    $(".transcript").addClass("topic-filter-active"); //add class .show to each highlight containing the selected topic

    let topic = $(this).text(); //check for multi-word topic and remove spaces

    if (/ /.test(topic)) {
      topic = topic.replace(/ /g, "");
    }

    $(`mark.bookmark-selected-text.${topic}`).addClass("show"); //mark menu option as having an active filter

    $("#topic-menu-item").prev(".header").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: <span class="red">${topic}</span>`);
    $("#topic-menu-item").prev(".header").attr("data-filter", topic);
  });
}
/*
  If topics have been added or deleted from the topic list then
  the dropdown menu option needs to be updated
*/


function updateTopicList() {
  /*
  if (listRefreshNeeded) {
    let html = makeTopicList(topics);
    $("#topic-menu-select").html(html);
  }
  */
  //check if there is a topic filter on a deleted key, if so, clear
  //the filter
  if (deletedKeys.length > 0) {
    let activeFilter = $("#topic-menu-item").prev(".header").attr("data-filter"); //no active filter

    if (activeFilter === "none") {
      return;
    }

    let found = deletedKeys.reduce((fnd, item) => {
      if (item.topic === activeFilter) {
        return fnd + 1;
      }

      return fnd;
    }, 0); //reset the filter

    if (found > 0) {
      //console.log("active filter topic has been deleted: %o", deletedKeys);
      //remove filter indication from .transcript
      $(".transcript").removeClass("topic-filter-active"); //reset header text to indicate filter has cleared

      $("#topic-menu-item").prev(".header").text(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
      $("#topic-menu-item").prev(".header").attr("data-filter", "none");
    }
  }
}
/*
  Keep track of topics on the page. If we have a untracted topic add it
  to 'topic' and set count to 1. If the topic is already tracked just 
  increment the count

  All topics look like this: {value: "nospaces", topic: "might have spaces"}
*/


function increment(newTopic) {
  let key = newTopic.value; //if newTopic is not in topics, add it and set count to 1

  if (!topics.has(key)) {
    newTopic.count = 1;
    topics.set(key, newTopic);
    listRefreshNeeded = true;
  } else {
    //otherwise increment the count
    let savedTopic = topics.get(key);
    savedTopic.count += 1;
    topics.set(key, savedTopic);
  }
}
/*
  Decrement count for tracked topic
*/


function decrement(trackedTopic) {
  let key = trackedTopic;

  if (typeof key === "object") {
    key = key.value;
  }

  if (!topics.has(key)) {
    throw new Error(`Unexpected error: topic ${key} not found in topic Map`);
  } else {
    let trackedTopicValue = topics.get(key); //no more bookmarks on page with this topic

    if (trackedTopicValue.count === 1) {
      topics.delete(key);
      listRefreshNeeded = true;
      deletedKeys.push(trackedTopicValue);
    } else {
      //decrement count and store value
      trackedTopicValue.count -= 1;
      topics.set(key, trackedTopicValue);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  //add topics from an annotation - this happens when bookmarks are loaded
  //and before the topicList is rendered
  add(annotation) {
    if (!annotation.selectedText) {
      return;
    }

    if (annotation.topicList && annotation.topicList.length > 0) {
      annotation.topicList.forEach(topic => {
        increment(topic);
      });
    }
  },

  delete(formData) {
    if (!formData.topicList) {
      return;
    }

    if (formData.topicList && formData.topicList.length > 0) {
      formData.topicList.forEach(topic => {
        decrement(topic);
      });
      updateTopicList();
    }
  },

  addTopics(topicArray) {
    //console.log("addTopics()");
    topicArray.forEach(topic => {
      increment(topic);
    });
    updateTopicList();
  },

  deleteTopics(topicArray) {
    topicArray.forEach(topic => {
      decrement(topic);
    });
    updateTopicList();
  },

  //generate topic select list and setup listeners
  bookmarksLoaded() {
    initPageTopicsModal();
    /*
    let html = makeTopicList(topics);
    $("#topic-menu-select").html(html);
     //init click handler
    topicSelectHandler();
    */
  },

  //given a topic value return the topic.topic
  getTopic(value) {
    let t = topics.get(value);

    if (t) {
      return t.topic;
    }

    return null;
  },

  report() {
    for (var [key, value] of topics) {
      console.log("%s: %s", key, value);
    }
  }

});
/*
  Get topic select element for page-topic-modal
*/

function getTopicList() {
  if (!listRefreshNeeded) return;
  let selectHtml = makeTopicSelectElement();
  $("#page-topics-modal-topic-select").html(selectHtml);
  $("#page-topics-topic-list").dropdown();
  $("#page-topics-modal-loading").removeClass("active").addClass("disabled");
  listRefreshNeeded = false;
}

function initPageTopicsModal() {
  $(uiPageTopicsModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    autofocus: false,
    centered: true,
    duration: 400,
    inverted: true,
    observeChanges: true,
    transition: "horizontal flip",
    onShow: function () {
      getTopicList();
    },
    onVisible: function () {},
    onHidden: function () {}
  });
  $(uiOpenPageTopicsModal).on("click", e => {
    e.preventDefault(); //populateBookmarkModal(uiBookmarkModalDiv);

    $(uiPageTopicsModal).modal("show");
  });
  filterSubmitHandler();
  filterResetHandler();
}
/*
  Apply topic filter to bookmarks on page
*/


function filterSubmitHandler() {
  //apply topic filter
  $("#page-topics-filter-submit").on("click", function (e) {
    e.preventDefault();
    let form = $("#page-topics-filter-form");
    let filterTopic = form.form("get value", "pageTopicList");
    let topicTopic = $(`#page-topics-topic-list > [value='${filterTopic}']`).text();
    setTopicFilter({
      value: filterTopic,
      topic: topicTopic
    });
    /*
    let bookmarkItems = $(".cmi-bookmark-list .bookmark-item");
    bookmarkItems.each(function() {
      let classList = $(this).attr("class");
      if (classList.match(topicRegExp)) {
        //the bookmark could be hidden from a previous filter, so just remove the class
        //in case it's there
        $(this).removeClass("hide-bookmark-item");
      }
      else {
        $(this).addClass("hide-bookmark-item");
      }
    });
     //keep track of the state of the bookmark Modal
    let bookmarkModalInfo = bookmarkModalState("get");
     //if we have data we're initializing and so we don't need to save state
    if (!data) {
      bookmarkModalInfo["modal"].filter = true;
      bookmarkModalInfo["modal"].topics = topics;
      bookmarkModalState("set", bookmarkModalInfo);
    }
     $("[data-bid]").each(function() {
      let bid = $(this).data("bid");
      let filtered = $(`[data-bid="${bid}"] .bookmark-item.hide-bookmark-item`).length;
      let remaining = bookmarkModalInfo[bid].count - filtered;
       //update title to reflect number of bookmarks shown after filter applied
      $(`.${bid}-header`).html(`${bookmarkModalInfo[bid].header} (<span class="bookmark-filter-color">${remaining}</span>/${bookmarkModalInfo[bid].count})`);
    });
    */
  });
}
/*
  Clear bookmark filter
*/


function filterResetHandler() {
  //clear filter
  $(".page-topics-filter-reset").on("click", function (e) {
    e.preventDefault(); //mark transcript as having an active filter

    if ($(".transcript").hasClass("topic-filter-active")) {
      //clear active filter
      let currentFilter = $("#current-topic-filter").attr("data-filter");
      $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
    }

    $(".transcript").removeClass("topic-filter-active"); //clear active filter from menu

    $("#current-topic-filter").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
    $("#current-topic-filter").attr("data-filter", ""); //mark bookmark icon green - no filter applied

    $("#bookmark-dropdown-menu > span > i").eq(0).removeClass("yellow").addClass("green"); //close the modal
    //$(uiPageTopicsModal).modal("hide");
  });
}
/*
  Show selected text from bookmarks that contain topic. If there is an active filter
  already clear it first.

  Args: topic; show only bookmarks with this topic
*/


function setTopicFilter(topic) {
  //mark transcript as having an active filter
  if ($(".transcript").hasClass("topic-filter-active")) {
    //clear active filter
    let currentFilter = $("#current-topic-filter").attr("data-filter"); //new filter is the same as the current, no need to do anything

    if (currentFilter === topic.value) {
      return;
    }

    $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
  } else {
    $(".transcript").addClass("topic-filter-active");
  }

  $(`mark.bookmark-selected-text.${topic.value}`).addClass("show"); //mark menu option as having an active filter

  $("#current-topic-filter").html(`Topic Filter: <span class="red">${topic.topic}</span>`);
  $("#current-topic-filter").attr("data-filter", topic.value); //mark bookmark icon as yellow - filter is applied

  $("#bookmark-dropdown-menu > span > i").eq(0).removeClass("green").addClass("yellow"); //close the modal

  $(uiPageTopicsModal).modal("hide");
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_config/key.js":
/*!************************************************!*\
  !*** ../cmi-www/src/js/modules/_config/key.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  WWW: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuu.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-www/node_modules/sprintf-js/src/sprintf.js").sprintf; //source id: each source has a unique id
//WOM = 10
//JSB = 11
//ACIM = 12
//RAJ = 13
//WWW = 99 This is the Library


const sourceId = 99;
const sid = "www";
const prefix = ""; //length of pageKey excluding decimal portion

const keyLength = 7; // books (bid)

const books = ["acq", "profile"];
const bookIds = ["xxx", ...books];
const profile = ["xxx", "email", "topicMgt"];
const acq = ["xxx", "welcome", "overview", "quick", "bookmark", "search", "audio", "accounts", "profile", "video", "email", "tech", "contact"];
const contents = {
  acq: acq,
  profile: profile
};

function splitUrl(url) {
  let u = url; //remove leading "/"

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}
/*
  return the position of unit in the bid array
*/


function getUnitId(bid, unit) {
  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0,
    qid: 0
  };
  let parts = splitUrl(url); //key.bid = indexOf(bookIds, parts[0]);

  key.bid = bookIds.indexOf(parts[0]);

  if (key.bid === -1) {
    return -1;
  }

  key.uid = getUnitId(parts[0], parts[1]);

  if (key.bid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s", key.sid, key.bid, key.uid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
  genParagraphKey(paragraphId, key: url || pageKey)

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuIqq.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: 0,
    message: "ok",
    sid: sourceId,
    bookId: "",
    uid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = bookIds[bid]; //subtract 1 from key value to get index

  decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10) - 1;
  return decodedKey;
}

function getBooks() {
  return books;
}
/*
  Return the number of chapters in the book (bid).
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}
/*
 * Convert page key to url
 */


function getUrl(key) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid + 1];
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-www/src/js/modules/_language/lang.js":
/*!***************************************************!*\
  !*** ../cmi-www/src/js/modules/_language/lang.js ***!
  \***************************************************/
/*! exports provided: setLanguage, getString, __lang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return setLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getString", function() { return getString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__lang", function() { return __lang; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../cmi-www/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "../cmi-www/node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);


const [NOTLOADED, LOADING, LOADED, FAILED] = [0, 1, 2, 3];
let status = NOTLOADED;
let language = {
  notReady: true
};
/*
 * Load language file for prompts set programatically
 *
 * English is the default and stored in /public/lang/en.json.
 * Non english languages are stored in /t/<sid>/public/lang.
 */

function setLanguage(constants) {
  let lang = "en";
  let url; //loading started

  status = LOADING;

  if (constants.lang) {
    lang = constants.lang;
  }

  url = `/public/lang/${lang}.json`;

  if (lang !== "en" && constants.env === "integration") {
    url = `${constants.url_prefix}${url}`;
  } //console.log("requesting lang: %s.json from: %s", lang, url);


  axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(response => {
    //console.log("language %o", response.data);
    language = response.data;
    status = LOADED;
    console.log("%s loaded", lang);
  }).catch(error => {
    status = FAILED;
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(`Failed to load language: ${lang}`);
    console.error("language load failed: %o", error);
  });
}

function waitForReady(s, k) {
  return new Promise((resolve, reject) => {
    function wait(s, k, ms, max = 8, cnt = 0) {
      if (cnt === 0) {
        console.log("waiting for max count: %s", max);
      } else {
        console.log("waiting count: %s", cnt);
      } // if (language.hasOwnProperty("notReady")) {


      if (status === LOADING) {
        if (cnt < max) {
          setTimeout(() => wait(s, k, ms, max, cnt + 1), ms);
        } else {
          console.log("terminating wait at count %s", cnt);
          resolve("timeout");
        }
      } else {
        console.log("Language ready at wait count: %s", cnt);
        resolve(keyValue(s, k));
      }
    } //if (language.hasOwnProperty("notReady")) {


    if (status == LOADING) {
      wait(s, k, 250);
    } else {
      resolve(keyValue(s, k));
    }
  });
}

function keyValue(s, k) {
  if (status === NOTLOADED) {
    return "shared language not loaded";
  }

  if (status !== LOADED) {
    return `state ${status}`;
  }

  if (!language[s]) {
    return null;
  }

  if (!k) {
    return language[s];
  }

  if (!language[s][k]) {
    return null;
  }

  return language[s][k];
}
/*
 * Get string for argument 'key'. Key can be in two parts
 * delimited by a ':'. The second part is optional.
 */


function getString(key, wait = false) {
  if (typeof key !== "string") {
    return null;
  }

  let [s, k] = key.split(":");

  if (wait) {
    return waitForReady(s, k);
  }

  return keyValue(s, k);
}
/*
 * This is a tagged template function that populates
 * a template string with values from the language
 * object.
 */

function __lang(strings, ...values) {
  const tokens = values.map(value => {
    let t = getString(value);

    if (!t) {
      return value;
    }

    return t;
  });
  return strings.reduce((result, string, i) => {
    return `${result}${string}${tokens[i] || ""}`;
  }, "");
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_link/setup.js":
/*!************************************************!*\
  !*** ../cmi-www/src/js/modules/_link/setup.js ***!
  \************************************************/
/*! exports provided: getLinkHref, createLinkListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLinkHref", function() { return getLinkHref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLinkListener", function() { return createLinkListener; });
const {
  getUrl: www_getUrl
} = __webpack_require__(/*! ../_config/key */ "../cmi-www/src/js/modules/_config/key.js");

const {
  getUrl: acim_getUrl
} = __webpack_require__(/*! acim/modules/_config/key */ "../cmi-www/src/js/modules/_config/key.js");

const {
  getUrl: oe_getUrl
} = __webpack_require__(/*! oe/modules/_config/key */ "../cmi-www/src/js/modules/_config/key.js");

const {
  getUrl: acol_getUrl
} = __webpack_require__(/*! acol/modules/_config/key */ "../cmi-www/src/js/modules/_config/key.js");

const {
  getUrl: jsb_getUrl
} = __webpack_require__(/*! jsb/modules/_config/key */ "../cmi-www/src/js/modules/_config/key.js");

const {
  getUrl: raj_getUrl
} = __webpack_require__(/*! raj/modules/_config/key */ "../cmi-www/src/js/modules/_config/key.js");

const {
  getUrl: wom_getUrl
} = __webpack_require__(/*! wom/modules/_config/key */ "../cmi-www/src/js/modules/_config/key.js");

function getUrl(source, key) {
  let url;

  switch (source) {
    case "acol":
      url = acol_getUrl(key, true);
      break;

    case "acim":
      url = acim_getUrl(key, true);
      break;

    case "acimoe":
      url = oe_getUrl(key, true);
      break;

    case "jsb":
      url = jsb_getUrl(key, true);
      break;

    case "raj":
      url = raj_getUrl(key, true);
      break;

    case "wom":
      url = wom_getUrl(key, true);
      break;

    case "www":
      url = www_getUrl(key, true);
      break;

    default:
      url = "/invalid/source";
  }

  return url;
}

function getLinkHref(link) {
  let url = getUrl(link.desc.source, link.key);

  if (location.pathname === url) {
    return `#${link.desc.pid}`;
  }

  return `${url}?v=${link.desc.pid}`;
}
function createLinkListener(getLink) {
  $(".transcript").on("click", "td.follow-link-item", function (e) {
    e.preventDefault(); //get link info

    let index = $(this).parent("tr").attr("data-index");
    let linkInfo = getLink(index); //build url

    let link = JSON.parse(linkInfo.link); //let url = getUrl(link.desc.source, link.key);
    //console.log("url: %s", url);

    location.href = getLinkHref(link);
  });
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_page/notes.js":
/*!************************************************!*\
  !*** ../cmi-www/src/js/modules/_page/notes.js ***!
  \************************************************/
/*! exports provided: initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../cmi-www/node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const uiNotesModal = ".notes.ui.modal";
const uiOpenNotesModal = ".notes-modal-open";
const uiModalOpacity = 0.5; //about notes

let notes;

function showNote(noteName) {
  const note = notes[noteName];

  if (notes.__current__ !== noteName) {
    if (note.title) {
      $(".notes.modal .notes-title").text(note.title);
    }

    if (note.image) {
      $(".notes.modal .notes-image").attr("src", note.image);
    }

    if (note.content) {
      $(".notes.modal .notes-content").html(note.content);
    }
  }

  notes.__current__ = noteName;
  $(uiNotesModal).modal("show");
}

function initialize(info = {}) {
  //info about notes; image, url, title
  notes = info;
  notes["__current__"] = "__nonote"; //dialog settings

  $(uiNotesModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    observeChanges: true
  });
  $(uiOpenNotesModal).on("click", e => {
    e.preventDefault();
    let noteName = $(e.currentTarget).attr("data-note");

    if (!notes[noteName]) {
      console.log("Note %s not found in notes configuration", noteName);
      return;
    }

    if (!notes[noteName].contents) {
      //console.log("requesting note: %s", noteName);
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: "get",
        url: notes[noteName].url,
        responseType: "text"
      }).then(response => {
        //console.log("Note response: %s", response.data);
        notes[noteName].content = response.data;
        showNote(noteName);
      }).catch(err => {
        console.error("Error fetching note: %s", noteName, err);
      });
    } else {
      showNote(noteName);
    }
  });
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_page/startup.js":
/*!**************************************************!*\
  !*** ../cmi-www/src/js/modules/_page/startup.js ***!
  \**************************************************/
/*! exports provided: initTranscriptPage, initStickyMenu, initAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTranscriptPage", function() { return initTranscriptPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initStickyMenu", function() { return initStickyMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAnimation", function() { return initAnimation; });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "../cmi-www/node_modules/gsap/index.js");

function initTranscriptPage() {
  initStickyMenu();
  labelParagraphs();
  createParagraphNumberToggleListener();
}
/*
 * For all transcript paragraphs -
 *   That are not footnotes and that don't have class .omit
 *
 * Assign id="p + paragraph number" and class="cmiTranPara"
 *
 * This is used for bookmarks and audio playback and also represent
 * paragraphs that are indexed for search
 *
 * This code is specific to transcript pages but included in
 * common.js because bookmarks and playfromhere features depend
 * on paragraphs having class cmiTranPara.
 */

function labelParagraphs() {
  var count = 0;
  var omit = 0;
  var transcriptParagraphs = $(".transcript p");

  if (transcriptParagraphs.length === 0) {
    return;
  } //add .cmiTranPara, #id and paragraph numbers to each paragraph that doesn't have .omit


  transcriptParagraphs.each(function (idx) {
    //skip omitted paragraphs (they are omitted in the markdown file)
    if ($(this).hasClass("omit")) {
      omit++;
      return;
    } //skip footnote paragraphs


    if ($(this).parents("div.footnotes").length > 0) {
      //console.log("footnote paragraph");
      return;
    }

    count++;
    $(this).attr("id", "p" + idx).addClass("cmiTranPara").prepend(`<span class='pnum'>(p${idx})&nbsp;</span>`);
  }); //log number of not omitted paragraphs
  //-- used to verify search indexing
  //console.log("page: number of paragraphs: %s", count + omit);
  //console.log("conf: number of paragraphs: %s", config.unit.pNum);
} //create listener to toggle display of paragraph numbers


function createParagraphNumberToggleListener() {
  $(".toggle-paragraph-markers").on("click", function (e) {
    e.preventDefault();
    let el = $(".transcript.ui.text.container");

    if (el.hasClass("hide-pnum")) {
      el.removeClass("hide-pnum");
    } else {
      el.addClass("hide-pnum");
    }
  });
}
/*
  Fix main menu to top of page when scrolled
*/


function initStickyMenu() {
  // fix main menu to page on passing
  $(".main.menu").visibility({
    type: "fixed"
  }); // show dropdown on hover

  $(".main.menu  .ui.dropdown").dropdown({
    on: "hover"
  });
}
function initAnimation(selector = "[data-book]") {
  let delay = 0.2;
  $("#page-contents").on("mouseover", selector, function (e) {
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      className: "+=gsap-hover"
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      scale: "1.1"
    });
  });
  $("#page-contents").on("mouseout", selector, function (e) {
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      className: "-=gsap-hover"
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      scale: "1.0"
    });
  });
}

/***/ }),

/***/ "../cmi-www/src/js/modules/_share/share.js":
/*!*************************************************!*\
  !*** ../cmi-www/src/js/modules/_share/share.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/url */ "../cmi-www/src/js/modules/_util/url.js");
/* harmony import */ var _bookmark_bmnet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_bookmark/bmnet */ "../cmi-www/src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var _bookmark_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_bookmark/selection */ "../cmi-www/src/js/modules/_bookmark/selection.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "../cmi-www/node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "../cmi-www/node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/*
  NOTE: When an annotation is shared and seen on a computer with bookmarks there could be a conflict between the users
        bookmarks and the shared bookmark. Not sure what to do in this case...

        An idea:
        Disable highlighting annotations on the paragraph of the shared annotation:w

        Approach:
        Load all bookmarks except that of a shared annotation.
        Add a close button to the shared annotation
        When the close button is pressed then add the omitted bookmark

*/





 //const key = require("../_config/key");
//teaching specific constants

let teaching = {}; //persist shared annotation so it can be unwraped when closed

let sharedAnnotation;
/*
  check if user has bookmark that was not highlighted due to shared annotion and
  highlight the bookmarks annotations. This is called if there is a problem getting
  the requested bookmark and when the user closes the share raised segment
*/

function clearSharedAnnotation() {
  console.log("clearSharedAnnotation"); //unwrap shared annotation

  if (sharedAnnotation.selectedText) {
    sharedAnnotation.selectedText.wrap.unwrap();
  } //remove wrapper


  $("#shared-annotation-wrapper > .header").remove();
  $(".shared-selected-annotation").unwrap();
  $(".selected-annotation").removeClass("shared-selected-annotation");
  $(".bookmark-selected-text.shared").removeClass("shared"); //highlight user annotations that were skipped because they were on same paragraph as shared annotation

  Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
}

function initCloseHandler() {
  $(".share-annotation-close").on("click", function (e) {
    e.preventDefault();
    clearSharedAnnotation();
  });
} //highlights an annotation by wrapping it in a segment


function wrapRange(annotation) {
  let rangeArray = [annotation.rangeStart, annotation.rangeEnd];
  let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
  let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1);
  let header = `
    <h4 class="ui header">
      <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("action:close")}" class="share-annotation-close small window close icon"></i>
      <div class="content">
        ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("annotate:m7")}
      </div>
    </h4>
  `;

  for (let i = 0; i < annotationRange.length; i++) {
    $(`#p${annotationRange[i]}`).addClass("shared-selected-annotation");
  }

  $(".shared-selected-annotation").wrapAll("<div id='shared-annotation-wrapper' class='ui raised segment'></div>");
  $("#shared-annotation-wrapper").prepend(header); //scroll into view

  scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById("shared-annotation-wrapper"), {
    align: {
      top: 0.2
    }
  });
}
/*
  Display annotation requested by query parameter "as"
  ?as=pid:annotationId:userId
*/


function showAnnotation() {
  let info = Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["showAnnotation"])();

  if (!info) {
    return false;
  }

  let [pid, aid, uid] = decodeURIComponent(info).split(":"); //make sure pid exists

  if (!pid) {
    return false;
  }

  if ($(`#${pid}`).length === 0) {
    // console.log("invalid pid: %s", pid);
    return false;
  }

  let bookmarkId = teaching.keyInfo.genParagraphKey(pid);
  /*
    fetch shared bookmark and wrap it in a raised segment
    - if user has a bookmark in the same paragraph as the shared annotation, it will not be highlighted so
      if we fail to get the bookmark or can't find the shared annotation we need to highlight the users
      annotations for the paragraph before returning
  */

  Object(_bookmark_bmnet__WEBPACK_IMPORTED_MODULE_1__["fetchBookmark"])(bookmarkId, uid).then(response => {
    //bookmark not found
    if (!response.Item) {
      // console.log("bookmark not found");
      Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
      return;
    }

    let bookmark = response.Item.bookmark; // console.log("bookmark from fetch: %o", bookmark);

    let annotation = bookmark.find(a => a.creationDate.toString(10) === aid);

    if (!annotation) {
      // console.log("annotation not found");
      Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
      return;
    } // console.log("annotation: %o", annotation);


    let node = document.getElementById(annotation.rangeStart);

    if (annotation.selectedText) {
      Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlight"])(annotation.selectedText, node);
    }

    $(`[data-aid="${aid}"]`).addClass("shared");
    wrapRange(annotation);
    sharedAnnotation = annotation;
    initCloseHandler(); //console.log("sharing pid: %s", pid);
    //stop page loading indicator

    Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
  }).catch(err => {
    //stop page loading indicator
    Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
    console.error(err);
  });
  return pid;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (constants) {
    teaching = constants;
    return showAnnotation();
  }
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_user/netlify.js":
/*!**************************************************!*\
  !*** ../cmi-www/src/js/modules/_user/netlify.js ***!
  \**************************************************/
/*! exports provided: getUserInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserInfo", function() { return getUserInfo; });
/* harmony import */ var netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! netlify-identity-widget */ "../cmi-www/node_modules/netlify-identity-widget/build/netlify-identity.js");
/* harmony import */ var netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! md5 */ "../cmi-www/node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ "../cmi-www/node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/url */ "../cmi-www/src/js/modules/_util/url.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_language/lang */ "../cmi-www/src/js/modules/_language/lang.js");
/*eslint no-console: "off" */





let login_state_key = "login.state";
let userInfo;
let testUsers = {
  "rick": {
    email: "rmercer33@gmail.com",
    userId: md5__WEBPACK_IMPORTED_MODULE_1___default()("rmercer33@gmail.com"),
    name: "Rick Mercer",
    roles: ["acol", "timer", "editor"]
  },
  "julie": {
    email: "julief8@me.com",
    userId: md5__WEBPACK_IMPORTED_MODULE_1___default()("julief8@me.com"),
    name: "Julie Franklin",
    roles: ["timer", "editor"]
  },
  "yodi": {
    email: "yodi@yodith.com",
    userId: md5__WEBPACK_IMPORTED_MODULE_1___default()("yodi@yodith.com"),
    name: "Yodi Debebe",
    roles: ["timer"]
  },
  "hettie": {
    email: "hcmercer@gmail.com",
    userId: md5__WEBPACK_IMPORTED_MODULE_1___default()("hcmercer@gmail.com"),
    name: "Hettie Mercer",
    roles: []
  }
};

function devUserInfo() {
  let user = Object(_util_url__WEBPACK_IMPORTED_MODULE_3__["getUser"])();

  if (user && testUsers[user]) {
    return testUsers[user];
  } else {
    //use rick
    return testUsers["rick"];
  }

  return null;
}

function prodUserInfo() {
  if (userInfo) {
    return {
      email: userInfo.email,
      userId: md5__WEBPACK_IMPORTED_MODULE_1___default()(userInfo.email),
      name: userInfo.user_metadata.full_name,
      roles: userInfo.app_metadata.roles,
      avatar_url: userInfo.user_metadata.avatar_url
    };
  }

  return null;
}

function getUserInfo(name) {
  return prodUserInfo();
}
/*
  Modify menubar icons "bookmark" and "sign in" to
  indicate user is signed in
*/

function setAsSignedIn() {
  let userInfo = getUserInfo(); //change sign-in icon to sign-out and change color from red to green

  Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("action:signout", true).then(resp => {
    $(".login-menu-option > span").html("<i class='green sign out icon'></i>").attr("data-tooltip", `${resp}: ${userInfo.name}`);
  }); //change bookmark menu icon to green from red

  $(".main.menu a > span > i.bookmark.icon").addClass("green").removeClass("red"); //add color to menu background to further indicate signed in status

  $(".main.menu .ui.text.container").addClass("signed-in"); //reveal profile-management menu option

  $(".hide.profile-management.item").removeClass("hide");
}
/*
  Modify menubar icons "bookmark" and "sign in" to
  indicate user is signed in
*/


function setAsSignedOut() {
  //change sign-in icon to sign-out and change color from red to green
  Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("action:signin", true).then(resp => {
    $(".login-menu-option > span").html("<i class='red sign in icon'></i>").attr("data-tooltip", resp);
  }); //change bookmark menu icon to green from red

  $(".main.menu a > span > i.bookmark.icon").addClass("red").removeClass("green"); //removed signed-in class

  $(".main.menu .ui.text.container").removeClass("signed-in"); //hide profile-management menu option

  $(".profile-management.item").addClass("hide");
}
/*
  ACOL restricts access to some contents based on the "acol" user role. When the user
  logs in, redirect them to the acol home page if they are currently viewing an acol
  transcript page. This will ensure that the TOC will give them access to all content.

  Otherwise they can just stay where they are on login.
*/


function manageState(state) {
  const acolHome = "/t/acol/";
  let currentState = store__WEBPACK_IMPORTED_MODULE_2___default.a.get(login_state_key) || "init";

  switch (state) {
    case "init":
      //state 'init' on page load
      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(login_state_key, state);
      break;

    case "dialog":
      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(login_state_key, state);
      break;

    case "login":
      if (currentState === "dialog") {
        //if user has "acol" role, refresh page to enable access to all content
        if (userInfo.app_metadata.roles && userInfo.app_metadata.roles.find(r => r === "acol")) {
          //if user is on an acol transcript page
          if (location.pathname.startsWith(acolHome) && location.pathname !== acolHome) {
            //refresh page
            location.href = acolHome;
          }
        }
      }

      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(login_state_key, state);
      break;
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function () {
    //console.log("Init user authentication");

    /*
     * if user already logged in, change icon to log out
     */
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("init", user => {
      //userInfo = user;
      manageState("init");
    });
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("login", login => {
      userInfo = login;
      setAsSignedIn();
      manageState("login");
    });
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("logout", () => {
      setAsSignedOut();
      userInfo = null;
      location.href = "/";
    });
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("error", err => {
      console.error("user.on('error'): ", err);
    });
    $(".login-menu-option").on("click", e => {
      e.preventDefault();

      if (userInfo) {
        netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.logout();
      } else {
        manageState("dialog");
        netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.open();
      }
    }); //init authentication

    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.init({//container: "#netlify-modal"
    });
  }
});

/***/ }),

/***/ "../cmi-www/src/js/modules/_util/url.js":
/*!**********************************************!*\
  !*** ../cmi-www/src/js/modules/_util/url.js ***!
  \**********************************************/
/*! exports provided: loadComplete, loadStart, showParagraph, showTOC, showBookmark, showSearchMatch, showAnnotation, getUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadComplete", function() { return loadComplete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStart", function() { return loadStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showParagraph", function() { return showParagraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTOC", function() { return showTOC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showBookmark", function() { return showBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSearchMatch", function() { return showSearchMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showAnnotation", function() { return showAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "../cmi-www/node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
 //timeout interval before calling scroll

const INTERVAL = 250; // get query string from window.location unless the arg 'qString' is not
// null, in that case it represents the query string

function getQueryString(key, qString) {
  let queryString;

  if (qString) {
    queryString = qString.substring(1);
  } else {
    queryString = window.location.search.substring(1);
  }

  let vars = queryString.split("&");

  for (let i = 0; i < vars.length; i++) {
    let getValue = vars[i].split("=");

    if (getValue[0] === key) {
      return getValue[1];
    }
  }

  return null;
}

function scrollComplete(message, type) {//console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from url.js ${caller}(${id})`, type);
  });
} //remove query string from url


function resetUrl() {
  history.replaceState({}, document.title, location.origin + location.pathname);
} //called when query request is complete


function loadComplete() {
  $("#transcript-page-loading").removeClass("active");
} //show loading for long loading steps - like showing annotations

function loadStart() {
  let aInfo = getQueryString("as");

  if (aInfo) {
    $("#transcript-page-loading").addClass("active");
    resetUrl();
  }
}
/*
  Check for url query string requesting to scroll given paragraph into view
  Syntax: ?v=pid, example: ?v=p20

  Scroll paragraph 20 into view on page load
*/

function showParagraph() {
  let pId = getQueryString("v");

  if (pId) {
    setTimeout(scrollIntoView, INTERVAL, pId, "showParagraph");
    resetUrl();
  }
}
/*
  Check for query string containing ?tocbook. This is a request to display
  the table of contents for the specified book
*/

function showTOC() {
  let book = getQueryString("tocbook");

  if (book) {
    $(`[data-book="${book}"]`).trigger("click");
  }
}
function showBookmark() {
  let pId = getQueryString("bkmk");

  if (pId) {
    resetUrl();
    return pId;
  }

  return null;
}
function showSearchMatch() {
  let pId = getQueryString("srch");

  if (pId) {
    resetUrl();
    return pId;
  }

  return null;
}
function showAnnotation() {
  let aInfo = getQueryString("as");

  if (aInfo) {
    resetUrl();
    return aInfo;
  }

  return null;
}
/*
  used for testing
*/

function getUser() {
  let user = getQueryString("user");

  if (user) {
    resetUrl();
    return user;
  }

  return null;
}

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/_config/config */ "./src/js/modules/_config/config.js");
/*
  Teaching specific data
*/
const keyInfo = __webpack_require__(/*! ./modules/_config/key */ "./src/js/modules/_config/key.js");


let env = "standalone";
let sid = "pwom";
let lang = "pl";
let title = "Droga Mistrzostwa";
let bucket = "assets.christmind.info";
/* harmony default export */ __webpack_exports__["default"] = ({
  env: env,
  //sa or prod, sa=standalone
  lang: lang,
  sid: sid,
  title: title,
  audioBase: `https://s3.amazonaws.com/${bucket}/${sid}/audio`,
  searchEndpoint: `https://d9lsdwxpfg.execute-api.us-east-1.amazonaws.com/latest/${sid}`,
  bm_modal_key: `bm.${sid}.modal`,
  //list
  bm_creation_state: `bm.${sid}.creation`,
  //bookmark
  bm_list_store: `bm.${sid}.list`,
  //bmnet
  bm_topic_list: `bm.${sid}.topics`,
  //bmnet
  bm_modal_store: `bm.${sid}.modal`,
  //navigator
  configStore: `config.${sid}.`,
  url_prefix: `/t/${sid}`,
  //navigator
  getPageInfo: _modules_config_config__WEBPACK_IMPORTED_MODULE_0__["getPageInfo"],
  //list
  keyInfo: keyInfo //list, bmnet

});

/***/ }),

/***/ "./src/js/lang.js":
/*!************************!*\
  !*** ./src/js/lang.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//Polish
/* harmony default export */ __webpack_exports__["default"] = ({
  label: {
    key: "Klucz",
    l1: "Nieznany tytuł książki",
    l2: "Tytuł nieznany",
    l3: "Spis treści",
    l4: "Szukaj",
    l5: "z",
    l6: "Last Search Result"
  },
  notify: {
    n1: "Kliknięcie jest ignorowane, gdy audio nie jest odtwarzane.",
    n2: "Uwaga! Dane znaczników czasu zostaną utracone, jeśli zamkniesz okno bez wysłania danych.",
    n3: "Twoje dane zostaną utracone",
    n4: "Dziękuję! Przesłanie danych powiodło się.",
    n5: "Przykro mi, przesłanie danych nie powiodło się.",
    n6: "Przywrócono częściowe dane znaczników czasu. Możesz kontynuować od miejsca, w którym skończyłeś.",
    n7: "Sesja wprowadzania znaczników czasu jest niezakończona. Zacznij wprowadzać znaczniki w miejscu, gdzie poprzednio skończyłeś.",
    n8: "Sesja wprowadzania znaczników czasu jest kompletna, jednak dane nie zostały przekazane. Proszę prześlij nam dane.",
    n9: "Wyszukiwanie nie dało żadnych rezultatów.",
    n10: "Brak rezultatów wyszukiwania w",
    n11: "Wyróżnienie nie powiodło się.",
    n12: "wyniki wyszukiwania"
  },
  search: {
    s1: "Wyszukiwanie rozpoczęte...",
    s2: "Szukanie",
    s3: "Szukaj",
    s4: "z",
    s5: "znalezione",
    s6: "dopasowania",
    s7: "Rezultaty wyszukiwania",
    s8: "Błąd wyszukiwania",
    s9: "nie znaleziono żadnych dopasowań",
    s10: "Akapit",
    s11: "Rezultaty ostatniego wyszukiwania"
  },
  html: {
    h1: "Niech to..! Przesłanie danych nie powiodło się.",
    h2: "Aby przesłać dane ponownie, spróbuj odświeżyć stronę albo ponów próbę za jakiś czas. Dane nie zostaną utracone. Ten formularz zostanie wyświetlony następnym razem, gdy odwiedzisz stronę."
  },
  error: {
    e1: "Nieoczekiwana liczba punktów danych w istniejącym zbiorze danych znaczników czasu. Skontaktuj się proszę z Rick'iem. Nie można wprowadzać znaczników czasu dopóki problem nie zostanie rozwiązany.",
    e2: "Nie powiodło się wczytanie znaczników czasu pliku audio",
    e3: "Niepoprawna konfiguracja pliku",
    e4: "Błąd konfiguracji pliku. Nie znaleziono adresu url.",
    e5: "Nie znaleziono tytułu",
    e6: "Nie powiodło się wczytanie pliku konfiguracji"
  }
});

/***/ }),

/***/ "./src/js/modules/_about/about.js":
/*!****************************************!*\
  !*** ./src/js/modules/_about/about.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_driver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/driver */ "./src/js/modules/_util/driver.js");
/* harmony import */ var _config_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_config/key */ "./src/js/modules/_config/key.js");
/* harmony import */ var _config_key__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config_key__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var www_modules_bookmark_clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! www/modules/_bookmark/clipboard */ "../cmi-www/src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");





function createClickHandlers() {
  //help menu
  $("#help-menu").on("click", "div.item", function (e) {
    e.preventDefault();

    if ($(this).hasClass("page-tour")) {
      console.log("pageDriver");
      Object(_util_driver__WEBPACK_IMPORTED_MODULE_0__["pageDriver"])();
    }

    if ($(this).hasClass("page-navtour")) {
      //console.log("page Nav Driver");
      Object(_util_driver__WEBPACK_IMPORTED_MODULE_0__["pageNavigationDriver"])();
    }

    if ($(this).hasClass("transcript-tour")) {
      //console.log("transcriptDriver");
      Object(_util_driver__WEBPACK_IMPORTED_MODULE_0__["transcriptDriver"])();
    }

    if ($(this).hasClass("about-src")) {
      location.href = "/about/";
    }

    if ($(this).hasClass("read-documentation")) {
      location.href = "/acq/quick/";
    }

    if ($(this).hasClass("view-documentation")) {
      location.href = "/acq/video/";
    }

    if ($(this).hasClass("contact-me")) {
      location.href = "/acq/contact/";
    }

    if ($(this).hasClass("profile-management")) {
      location.href = "/profile/email/";
    }

    if ($(this).hasClass("topic-management")) {
      location.href = "/profile/topicMgt/";
    }
  }); //quick links

  $("#quick-links").on("click", "div.item", function (e) {
    e.preventDefault();
    let href = $(this).attr("data-href");
    location.href = href;
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize() {
    createClickHandlers(); //get pagekey and setup copy to clipboard

    if ($(".copy-page-key").length > 0) {
      let pageKey = _config_key__WEBPACK_IMPORTED_MODULE_1___default.a.genPageKey();
      $(".copy-page-key").attr("data-clipboard-text", pageKey).text(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_3__["getString"])("label:key")}: ${pageKey}`);
      www_modules_bookmark_clipboard__WEBPACK_IMPORTED_MODULE_2__["default"].register(".copy-page-key");
    }
  }

});

/***/ }),

/***/ "./src/js/modules/_bookmark/start.js":
/*!*******************************************!*\
  !*** ./src/js/modules/_bookmark/start.js ***!
  \*******************************************/
/*! exports provided: bookmarkStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookmarkStart", function() { return bookmarkStart; });
/* harmony import */ var www_modules_bookmark_bookmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! www/modules/_bookmark/bookmark */ "../cmi-www/src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var www_modules_bookmark_shareByEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! www/modules/_bookmark/shareByEmail */ "../cmi-www/src/js/modules/_bookmark/shareByEmail.js");
/* harmony import */ var www_modules_share_share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! www/modules/_share/share */ "../cmi-www/src/js/modules/_share/share.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/*
  Initialize bookmark modules
*/
//bookmark code common to all teachings


 //teaching specific 


 //export function bookmarkStart(pid) {

function bookmarkStart(page) {
  let pid;

  if (page === "transcript") {
    pid = www_modules_share_share__WEBPACK_IMPORTED_MODULE_2__["default"].initialize(_constants__WEBPACK_IMPORTED_MODULE_3__["default"]); //get page info and set as heading under '?' menu option

    let key = _constants__WEBPACK_IMPORTED_MODULE_3__["default"].keyInfo.genPageKey();
    Object(_config_config__WEBPACK_IMPORTED_MODULE_4__["getPageInfo"])(key).then(info => {
      //console.log("pageInfo: %o", info);
      let title = `${info.source}<br/>${info.bookTitle}`;

      if (info.subTitle) {
        title = `${title}<br/>${info.subTitle}`;
      }

      title = `${title}<br/>${info.title}`;
      $("#transcript-page-info").html(title);
    });
  }

  www_modules_bookmark_bookmark__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(pid, _constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
  Object(www_modules_bookmark_shareByEmail__WEBPACK_IMPORTED_MODULE_1__["initShareByEmail"])(_constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
}

/***/ }),

/***/ "./src/js/modules/_config/config.js":
/*!******************************************!*\
  !*** ./src/js/modules/_config/config.js ***!
  \******************************************/
/*! exports provided: fetchTimingData, getConfig, loadConfig, getAudioInfo, getReservation, getPageInfo, setEnv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTimingData", function() { return fetchTimingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadConfig", function() { return loadConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAudioInfo", function() { return getAudioInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReservation", function() { return getReservation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageInfo", function() { return getPageInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEnv", function() { return setEnv; });
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./status */ "./src/js/modules/_config/status.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");






const transcript = __webpack_require__(/*! ./key */ "./src/js/modules/_config/key.js");

let config; //the current configuration, initially null, assigned by getConfig()
// runtime environment; standalone or integration
// set during initialization

let env = {
  SID: 0,
  BID: 0,
  UID: 1,
  environment: "",
  prefix: "",
  //prefix for non standalone url's
  timingBase: "/public/timing",
  //location of audio timing files
  configUrl: "/standalone/config",
  //location of book config files
  configStore: "config." //location of configuration files

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
  let saveDate = _status__WEBPACK_IMPORTED_MODULE_3__["status"][cfg.bid];

  if (cfg.saveDate && cfg.saveDate === saveDate) {
    return false;
  }

  cfg.saveDate = saveDate;
  return true;
} //get config file


function requestConfiguration(url) {
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url);
}
/*
  Fetch audio timing data
*/


function fetchTimingData(url) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`${env.timingBase}${url}`).then(response => {
      resolve(response.data);
    }).catch(error => {
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

function getConfig(book, assign = true) {
  return new Promise((resolve, reject) => {
    let cfg = store__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${env.configStore}${book}`);
    let url; //if config in local storage check if we need to get a fresh copy

    if (cfg && !refreshNeeded(cfg)) {
      if (assign) {
        config = cfg;
      }

      resolve(cfg);
      return;
    } //get config from server


    url = `${env.configUrl}/${book}.json`;
    requestConfiguration(url).then(response => {
      //add save date before storing
      response.data.saveDate = _status__WEBPACK_IMPORTED_MODULE_3__["status"][response.data.bid];
      store__WEBPACK_IMPORTED_MODULE_0___default.a.set(`${env.configStore}${book}`, response.data);

      if (assign) {
        config = response.data;
      }

      resolve(response.data);
    }).catch(() => {
      config = null;
      toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(`getString("error:e3")}: ${url}`);
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

function loadConfig(book) {
  return new Promise((resolve, reject) => {
    let cfg = store__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${env.configStore}${book}`);
    let url; //if config in local storage check if we need to get a fresh copy

    if (cfg && !refreshNeeded(cfg)) {
      config = cfg;
      resolve("config read from cache");
      return;
    } //get config from server


    url = `${env.configUrl}/${book}.json`;
    requestConfiguration(url).then(response => {
      //add save date before storing
      response.data.saveDate = _status__WEBPACK_IMPORTED_MODULE_3__["status"][response.data.bid];
      store__WEBPACK_IMPORTED_MODULE_0___default.a.set(`${env.configStore}${book}`, response.data);
      config = response.data;
      resolve("config fetched from server");
    }).catch(error => {
      config = null;
      toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(`getString("error:e3")}: ${url}`);
      reject(`Config file: ${url} is not valid JSON`);
    });
  });
}
/*
 * Get audio info from config file based on url
 */

function getAudioInfo(url) {
  //check that config has been initialized
  if (!config) {
    throw new Error("Configuration has not been initialized");
  }

  let audioInfo = config.contents.find(p => {
    return url.startsWith(p.url);
  });

  if (!audioInfo) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("error:e4"));
    return {};
  }

  if (audioInfo.url !== url) {
    audioInfo = audioInfo.contents.find(p => {
      return p.url === url;
    });
  }

  if (!audioInfo) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("error:e4"));
    return {};
  }

  audioInfo.audioBase = env.audioBase;
  return audioInfo;
}
/*
 * get timer info for the current page
 */

function getReservation(url) {
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

function getPageInfo(pageKey, data = false) {
  let decodedKey = transcript.decodeKey(pageKey);
  let info = {
    pageKey: pageKey,
    source: env.title,
    bookId: decodedKey.bookId
  };

  if (data) {
    info.data = data;
  }

  return new Promise((resolve, reject) => {
    //invalid pageKey
    if (pageKey === -1) {
      info.bookTitle = Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:l1");
      info.title = Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:l2");
      info.url = "";
      resolve(info);
      return;
    } //get configuration data specific to the bookId


    getConfig(decodedKey.bookId, false).then(data => {
      if (!data) {
        info.bookTitle = Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:l1");
        info.title = Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:l2");
        info.url = "";
      } else {
        info.bookTitle = data.title;
        let unit = data.contents[decodedKey.uid];

        if (!unit) {
          info.title = `${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("error:e5")}, pageKey: ${pageKey}, decodedKey: ${decodedKey}`;
          info.title = "";
        } else {
          if (decodedKey.hasQuestions) {
            let question; //this shouldn't happen but did once due to test data that got indexed and later
            //deleted but the index remained and caused the code to fail. Took me a long time to
            //find the problem.

            if (decodedKey.qid >= unit.questions.length) {
              console.log("invalid pageKey: %s, specifies out of range qid", pageKey);
              console.log("decodedKey: %o", decodedKey);
              question = unit.questions[unit.questions.length - 1];
            } else {
              question = unit.questions[decodedKey.qid];
            }

            info.title = unit.title;
            info.subTitle = question.title;
            info.url = question.url;
          } else {
            info.title = unit.title;
            info.url = unit.url;
          }
        }

        resolve(info);
      }
    }).catch(error => {
      reject(error);
    });
  });
}
/*
 * Set environment to standalone or integrated
 */

function setEnv(constants) {
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

/***/ }),

/***/ "./src/js/modules/_config/key.js":
/*!***************************************!*\
  !*** ./src/js/modules/_config/key.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Transcript keys
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.
  - first item starts with 1

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit
        ppp: paragraph number - not positional

  Limits:
    The Library of Christ Mind Teachings is limited to
       99 Sources
       99 Books per source
      999 Units (chapters) per book
       99 Unique Subunits per book
      999 Paragraphs per unit or subunit

  Example: url's
      [/t/sourceId]/bookId/unitId/subunitId/
      - /t/sourceId is omitted in standalone mode

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
const si = __webpack_require__(/*! ./si */ "./src/js/modules/_config/si.js");

const sprintf = __webpack_require__(/*! sprintf-js */ "./node_modules/sprintf-js/src/sprintf.js").sprintf;

const keyLength = 9; //length of pageKey excluding decimal portion

/*
 * The argument is the page url. Use the book id (bid)
 * to find the position of the page in the contents array.
 */

function getUnitId(...urlArray) {
  let bid = getBook(urlArray);
  let {
    unit,
    subunit
  } = getUnitInfo(urlArray);

  if (si.contents[bid]) {
    return si.contents[bid].indexOf(unit);
  }

  throw new Error(`unexpected bookId: ${bid}`);
}
/*
 * Get the position of the subunit from the bid2 array.
 * Return -1 if not found,
 *         0 if there is no subunit
 */


function getSubunitId(...urlArray) {
  let bid = getBook(urlArray);
  let {
    unit,
    subunit
  } = getUnitInfo(urlArray);
  let level2 = `${bid}2`;

  if (!subunit) {
    return 0;
  }

  if (si.contents[level2]) {
    return si.contents[level2].indexOf(`/${subunit}`);
  }

  throw new Error(`unexpected bookId: ${level2}`);
}
/*
 * The url will be either:
 * Integration: /t/pid/bid/uid/[xid/] or
 * Standalone:  /bid/uid/[xid/]
 *
 * Return object containing unit and subunit from url
 */


function getUnitInfo(urlArray) {
  //set values for integration
  let uidPos = 3;
  let subunit;

  if (urlArray[0] !== "t") {
    uidPos = 1;
  } //check for subunit in url


  if (urlArray.length === uidPos + 2) {
    subunit = urlArray[uidPos + 1];
  }

  return {
    unit: urlArray[uidPos],
    subunit: subunit
  };
}
/*
 * Return the number of chapters in the book (bid).
 * Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (si.contents[bid]) {
    return si.contents[bid].length - 1;
  }

  throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
}
/*
 * Split url into an array. Strip leading and trailing
 * '/' characters first so we don't get empty elements
 * in the array.
 */


function splitUrl(url) {
  let u = url; //remove leading

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function getSourceId() {
  return si.sourceId;
}

function getKeyInfo() {
  return {
    sourceId: si.sourceId,
    keyLength: keyLength
  };
}
/*
 * Parse key into page part and paragraph part. The two are
 * still part of the key.
 *
 * - a paraKey = 0 represent no paraKey in argument.
 */


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let paraKey = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    paraKey = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10); //console.log("parseKey: %o", {paraKey, pageKey});

  return {
    paraKey,
    pageKey
  };
}
/*
 * Get bid (book id) from url.
 *
 * We could be running in standalone or integration mode. Integration
 * mode is indicated by urlArray[0] == 't'
 *
 * The url is in this format: [t/sid]/bid/uid/suid, where [t/sid]
 * are present only in integration mode
 */


function getBook(urlArray) {
  if (urlArray[0] === "t") {
    return urlArray[2];
  }

  return urlArray[0];
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: si.sourceId,
    bid: 0,
    uid: 0,
    xid: 0
  };
  let parts = splitUrl(url); //make sure we have a valid book

  key.bid = si.bookIds.indexOf(getBook(parts));

  if (key.bid === -1) {
    return -1;
  } //get the unitId of the page, return if invalid


  key.uid = getUnitId(...parts);

  if (key.uid === -1) {
    return -1;
  } //get the subunitId


  key.xid = getSubunitId(...parts);

  if (key.xid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s%02s", key.sid, key.bid, key.uid, key.xid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
 * genParagraphKey(paragraphId, key: url || pageKey)
 *
 * args:
 *   pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
 *        - it's converted to number and incremented by 1 then divided by 1000
 *       pid can also be a number so then we just increment it and divide by 1000
 *
 *   key: either a url or pageKey returned from genPageKey(), if key
 *   is a string it is assumed to be a url
 */


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: false,
    message: "ok",
    sid: 0,
    bookId: "",
    uid: 0,
    xid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  } //check for valid sourceId


  decodedKey.sid = parseInt(pageKeyString.substr(0, 2), 10);

  if (decodedKey.sid !== si.sourceId) {
    decodedKey.error = true;
    decodedKey.message = `Invalid sourceId: ${decodedKey.sid}, expecting: ${si.sourceId}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = si.bookIds[bid];
  decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10);
  decodedKey.xid = parseInt(pageKeyString.substr(7, 2), 10); //console.log("decodedKey: %o", decodedKey);

  return decodedKey;
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit;
  let subunit;
  let url = "/invalid/key/";

  if (decodedKey.error) {
    return url;
  }

  if (si.contents[decodedKey.bookId]) {
    unit = si.contents[decodedKey.bookId][decodedKey.uid];

    if (decodedKey.xid > 0) {
      subunit = si.contents[`${decodedKey.bookId}2`][decodedKey.xid];
      url = `/${decodedKey.bookId}/${unit}${subunit}/`;
    } else {
      url = `/${decodedKey.bookId}/${unit}/`;
    }

    if (withPrefix) {
      return `${si.prefix}${url}`;
    }
  }

  return url;
}

function getBooks() {
  return si.books;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: si.sid
    };
  }

  let info = {
    key: key,
    source: si.sid,
    book: decodedKey.bookId,
    unit: si.contents[decodedKey.bookId][decodedKey.uid],
    subunit: si.contents[`${decodedKey.bookId}2`][decodedKey.xid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  } //console.log("describeKey: %o", info);


  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "./src/js/modules/_config/si.js":
/*!**************************************!*\
  !*** ./src/js/modules/_config/si.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  sourceId: 16,
  sid: "pwom",
  prefix: "/t/pwom",
  books: ["lj", "wos", "woh", "wot", "wok", "early"],
  bookIds: ["xxx", "lj", "wos", "woh", "wot", "wok", "early"],
  contents: {
    lj: ["xxx", "acknow", "reader", "forwd", "intr", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "eplg", "path"],
    wos: ["xxx", "intr", "chap01", "chap02", "chap03", "chap04", "aftwrd", "eplg", "prayer", "path"],
    woh: ["xxx", "advice", "preface", "l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08", "l09", "l10", "l11", "l12", "path"],
    woh2: ["xxx", "/l01qa", "/l02qa", "/l06qa", "/l07qa", "/l08qa", "/l09qa", "/l10qa", "/l11qa", "/l12qa"],
    wot: ["xxx", "advice", "preface", "l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08", "l09", "l10", "l11", "l12", "path"],
    wot2: ["xxx", "/l01qa", "/l06qa", "/l07qa", "/l09qa", "/l11qa"],
    wok: ["xxx", "advice", "preface", "l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08", "l09", "l10", "l11", "path"],
    wok2: ["xxx", "/l02qa", "/l03qa", "/l04qa", "/l06qa", "/l10qa"],
    early: ["xxx", "intr", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "path"],
    early2: ["xxx", "/chap02qa", "/chap03qa", "/chap08qa", "/chap09qa"]
  }
};

/***/ }),

/***/ "./src/js/modules/_config/status.js":
/*!******************************************!*\
  !*** ./src/js/modules/_config/status.js ***!
  \******************************************/
/*! exports provided: status */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
const status = {
  lj: "Fri Jun  5 16:42:57 HST 2020",
  wos: "Fri Jun  5 16:42:57 HST 2020",
  woh: "Fri Jun  5 16:42:57 HST 2020",
  wot: "Fri Jun  5 16:42:57 HST 2020",
  wok: "Fri Jun  5 16:42:57 HST 2020",
  early: "Fri Jun  5 16:42:57 HST 2020"
};

/***/ }),

/***/ "./src/js/modules/_contents/toc.js":
/*!*****************************************!*\
  !*** ./src/js/modules/_contents/toc.js ***!
  \*****************************************/
/*! exports provided: getBookId, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookId", function() { return getBookId; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var www_modules_bookmark_clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! www/modules/_bookmark/clipboard */ "../cmi-www/src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");




const uiTocModal = ".toc.ui.modal";
const uiOpenTocModal = ".toc-modal-open";
const uiModalOpacity = 0.5;
const tocString = Object(_language_lang__WEBPACK_IMPORTED_MODULE_3__["getString"])("label:l3");
/*
* If there is timing or a timer defined for a toc item
* set the class accordingly. A clock icon is displayed
* info.timing, a user icon when info.timer and no icon
* otherwise.
*/

function getTimerClass(info) {
  if (info.timing) {
    return " __timing";
  }

  if (info.timer) {
    return " __timer";
  }

  return "";
} //generate html for questions


function renderSubcontents(contents, c) {
  //<div class="list">
  return `
    <div class="list">
      ${contents.map(q => `<a data-lid="${++c.counter}" class="item${getTimerClass(q)}" href="${q.url}">${q.title}</a>`).join("")}
    </div>
  `;
} //generate html for Contents


function makeContents(contents, type) {
  var c = {
    counter: 0
  };
  var klass = "ui list";

  if (type) {
    klass = `${klass} ${type}`;
  }

  return `
    <div class="${klass}">
      ${contents.map(unit => `
        <div class="item">
          <a data-lid="${++c.counter}" class="item${getTimerClass(unit)}" href="${unit.url}">${unit.title}</a>
          ${unit.contents ? renderSubcontents(unit.contents, c) : ""}
        </div>
      `).join("")}
    </div>
  `;
} //called for transcript pages


function loadTOC() {
  console.log("transcript page: loading toc");
  let book = $("#contents-modal-open").attr("data-book").toLowerCase();
  Object(_config_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])(book).then(contents => {
    $(".toc-image").attr("src", `${contents.image}`);
    $(".toc-title").html(`${tocString}: <em>${contents.title}</em>`);
    $(".toc-list").html(makeContents(contents.contents, contents.toc || ""));
    highlightCurrentTranscript(contents.bid, contents.totalPages);
  }).catch(error => {
    console.error(error);
    $(".toc-image").attr("src", "/public/img/cmi/toc_modal.png");
    $(".toc-title").html("${tocString}: <em>Error</em>");
    $(".toc-list").html(`<p>Error: ${error.message}</p>`);
    $(uiTocModal).modal("show");
  });
}
/*
  set next/prev controls on menu for workbook transcripts
*/


function nextPrev($el, max) {
  let LAST_ID = max;
  let prevId = -1,
      nextId = -1,
      href,
      text;
  let lid = $el.attr("data-lid");
  let lessonId = parseInt(lid, 10); //disable prev control

  if (lessonId === 1) {
    $("#toc-previous-page").addClass("disabled");
  } else {
    $("#toc-previous-page").removeClass("disabled");
    prevId = lessonId - 1;
  } //disable next control


  if (lessonId === LAST_ID) {
    $("#toc-next-page").addClass("disabled");
  } else {
    $("#toc-next-page").removeClass("disabled");
    nextId = lessonId + 1;
  }

  if (prevId > -1) {
    href = $(`a[data-lid="${prevId}"]`).attr("href");
    text = $(`a[data-lid="${prevId}"]`).text(); //set prev tooltip and href

    $("#toc-previous-page > span").attr("data-tooltip", `${text}`);
    $("#toc-previous-page").attr("href", `${href}`);
  }

  if (nextId > -1) {
    href = $(`a[data-lid="${nextId}"]`).attr("href");
    text = $(`a[data-lid="${nextId}"]`).text(); //set prev tooltip and href

    $("#toc-next-page > span").attr("data-tooltip", `${text}`);
    $("#toc-next-page").attr("href", `${href}`);
  }
}
/*
  If we're on a transcript page, highlight the
  current transcript in the list
*/


function highlightCurrentTranscript(bid, max = 1) {
  let page = location.pathname;
  let $el = $(`.toc-list a[href='${page}']`); //remove href to deactivate link for current page and
  //scroll into middle of viewport

  $el.addClass("current-unit").removeAttr("href");
  scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()($el.get(0));
  nextPrev($el, max);
}
/*
  Calls to this function are valid for transcript pages.
*/


function getBookId() {
  return $(uiOpenTocModal).attr("data-book");
}
/* harmony default export */ __webpack_exports__["default"] = ({
  /*
   * Init the modal dialog with data from JSON file
   * or local storage
   */
  initialize: function (env) {
    //dialog settings
    $(uiTocModal).modal({
      dimmerSettings: {
        opacity: uiModalOpacity
      },
      observeChanges: true
    }); //load toc once for transcript pages

    if (env === "transcript") {
      loadTOC();
    }
    /*
     * TOC populated by JSON file from AJAX call if not found
     * in local storage.
     *
     * Read value of data-book attribute to identify name of file
     * with contents.
     */


    $(uiOpenTocModal).on("click", e => {
      e.preventDefault();
      let book = $(e.currentTarget).attr("data-book").toLowerCase(); //load the TOC if we're not on a transcript page

      if (env !== "transcript") {
        Object(_config_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])(book).then(contents => {
          let share_url = `${location.origin}${location.pathname}?tocbook=${book}`;
          $(".toc-image").attr("src", `${contents.image}`);
          $(".toc-title").html(`<i data-clipboard-text="${share_url}" title="Copy to Clipboard" class="tiny share alternate icon toc-share"></i>&nbsp;${tocString}: <em>${contents.title}</em>`);
          $(".toc-list").html(makeContents(contents.contents, contents.toc || ""));
          $(uiTocModal).modal("show");
          www_modules_bookmark_clipboard__WEBPACK_IMPORTED_MODULE_2__["default"].register(".share.icon.toc-share");
        }).catch(error => {
          $(".toc-image").attr("src", "/public/img/cmi/toc_modal.png");
          $(".toc-title").html("${tocString}: <em>Error</em>");
          $(".toc-list").html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_3__["getString"])("error:e6")} ${book}.json`);
          $(uiTocModal).modal("show");
        });
      } else {
        $(uiTocModal).modal("show");
      }
    });
  }
});

/***/ }),

/***/ "./src/js/modules/_language/lang.js":
/*!******************************************!*\
  !*** ./src/js/modules/_language/lang.js ***!
  \******************************************/
/*! exports provided: getString, __lang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getString", function() { return getString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__lang", function() { return __lang; });
/* harmony import */ var _lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lang.js */ "./src/js/lang.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);


/*
 * Get string for argument 'key'. Key can be in two parts
 * delimited by a ':'. The second part is optional.
 */

function getString(key) {
  if (typeof key !== "string") {
    return null;
  }

  let [s, k] = key.split(":");

  if (!_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"][s]) {
    return null;
  }

  if (!k) {
    return _lang_js__WEBPACK_IMPORTED_MODULE_0__["default"][s];
  }

  if (!_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"][s][k]) {
    return null;
  }

  return _lang_js__WEBPACK_IMPORTED_MODULE_0__["default"][s][k];
}
/*
 * This is a tagged template function that populates
 * a template string with values from the language
 * object.
 */

function __lang(strings, ...values) {
  const tokens = values.map(value => {
    let t = getString(value);

    if (!t) {
      return value;
    }

    return t;
  });
  return strings.reduce((result, string, i) => {
    return `${result}${string}${tokens[i] || ""}`;
  }, "");
}

/***/ }),

/***/ "./src/js/modules/_search/navigator.js":
/*!*********************************************!*\
  !*** ./src/js/modules/_search/navigator.js ***!
  \*********************************************/
/*! exports provided: initNavigator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavigator", function() { return initNavigator; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/*
  search results query navigator
*/






const page = __webpack_require__(/*! ../_config/key */ "./src/js/modules/_config/key.js");

const queryResultName = `search.${_constants__WEBPACK_IMPORTED_MODULE_3__["default"].sid}.result`;
const url_prefix = _constants__WEBPACK_IMPORTED_MODULE_3__["default"].env === "standalone" ? "/" : _constants__WEBPACK_IMPORTED_MODULE_3__["default"].url_prefix;
const SCROLL_INTERVAL = 250;

function scrollComplete(message, type) {
  console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from search navigator ${caller}(${id})`, type);
  });
}

class PageMatches {
  constructor(query, start, end, hits) {
    this.query = query;
    this.start = start;
    this.end = end;
    this.count = end - start + 1;
    this.hits = hits;
  }

  setStart(current, first) {
    this.current = current;
    let pid = this.hits[current].location;

    if (first) {
      setTimeout(scrollIntoView, SCROLL_INTERVAL, pid, "setStart(first)");
    } else {
      scrollIntoView(pid, "setStart()");
    }

    this.setTitle();
  }

  setTitle() {
    let pos = this.current - this.start + 1;
    let title = `${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:l4")} <em>${this.query}</em> (${pos} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("label:l5")} ${this.count})`;
    $(".search-navigator-header-query").html(title);
  }
  /*
    Move to previous match or last match if we're on the first one
  */


  setPrevious() {
    //no where to go if there's only one match on the page
    if (this.start === this.end) {
      return;
    }

    let pos = this.current - 1;

    if (pos < this.start) {
      pos = this.end;
    }

    this.setStart(pos);
  }
  /*
    Move to next match position or the first if we're on the last
  */


  setNext() {
    //no where to go if there's only one match on the page
    if (this.start === this.end) {
      return;
    }

    let pos = this.current + 1;

    if (pos > this.end) {
      pos = this.start;
    }

    this.setStart(pos);
  }

  showCurrent() {
    let pid = this.hits[this.current].location;
    scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(pid), {
      align: {
        top: 0.2
      }
    });
  }

} //hilight terms on page for current search


function markSearchHits(searchHits, start, end, query, state) {
  let markFailure = 0; //Note: this regex wont find a string within a string - only finds
  //matches that begin on a word boundary
  //var regex = new RegExp("(?:^|\\b)(" + searchData.query + ")(?:$|\\b)", "gim");

  let regex = new RegExp("(?:^|\\b)(" + query + ")(?:$|\\b|)", "gim");

  for (let i = start; i <= end; i++) {
    let id = searchHits[i].location;
    let el = document.getElementById(id); // a data error is indicated by el == null

    if (!el) {
      markFailure++;
      continue;
    }

    let content = el.innerHTML; //remove newline chars in content - they can prevent the
    //query string from being highlighted

    content = content.replace(/[\r\n]/gm, " ");

    if (state === "show") {
      el.innerHTML = content.replace(regex, "<mark class='show-mark'>$1</mark>");
    } else {
      el.innerHTML = content.replace(regex, "<mark class='hide-mark'>$1</mark>");
    } //test if query was highlighted


    if (el.innerHTML === content) {
      console.log("Regex did not match: \"%s\" for %s", query, id);
      markFailure++;
    }
  }

  return markFailure;
}
/*
  Set up listeners for search navigator links
  args: matches - keeps track of page specific search hits
*/


function initClickListeners(matches) {
  //previous search
  $(".search-navigator .previous-match").on("click", function (e) {
    e.preventDefault();
    matches.setPrevious();
  });
  $(".search-navigator .next-match").on("click", function (e) {
    e.preventDefault();
    matches.setNext();
  });
  $(".search-navigator .current-match").on("click", function (e) {
    e.preventDefault();
    matches.showCurrent();
  });
  $(".search-navigator .close-window").on("click", function (e) {
    e.preventDefault();
    $(".search-navigator-wrapper").addClass("hide-search-navigator");
    $(".transcript").removeClass("search-navigator-active");
  });
}
/*
  first and last positions for this pages search hits and
  the next and previous pages.
*/


function findPositions(pid, pageKey, flat) {
  let positions = {
    current: -1,
    //current para with search match
    prev: -1,
    //previous page with search match
    start: -1,
    //first para with match on page
    end: -1,
    //last para with match on page
    next: -1 //next page with search match

  };
  let found = false;

  for (let i = 0; i < flat.length; i++) {
    if (flat[i].key === pageKey) {
      if (flat[i].location === pid) {
        positions.current = i;
      }

      if (!found) {
        //first match on page
        positions.start = i;
        positions.end = i;
        found = true;

        if (i > 0) {
          //the previous page with a match
          positions.prev = i - 1;
        }
      } else {
        //more than one match on the page
        positions.end = i;
      }
    } else if (found) {
      //positions.end = i - 1;
      positions.next = i;
      break;
    }
  } //console.log("positions: %o", positions);


  return positions;
}

function initControls(pid) {
  let lastSearch = store__WEBPACK_IMPORTED_MODULE_1___default.a.get(queryResultName);

  if (!lastSearch) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("notify:n9"));
    return;
  } //console.log("lastSearch: %o", lastSearch);


  let pageKey = page.genPageKey();
  let pageKeyString = pageKey.toString(10);
  let bid = page.decodeKey(pageKey).bookId;
  let title = lastSearch.titleArray[bid]; //when ?srch=p2 and p2 does not contain a search hit

  if (!lastSearch.pageInfo[pageKey]) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("notify:n10")} ${pid}`);
    return;
  }

  let hitPositions = findPositions(pid, pageKeyString, lastSearch.flat);
  let url; //check that requested search hit is valid

  if (hitPositions.current === -1) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("notify:n10")} ${pid}`);
    return;
  }

  if (hitPositions.prev > -1) {
    url = `${url_prefix}${lastSearch.flat[hitPositions.prev].url}?srch=${lastSearch.flat[hitPositions.prev].location}`;
    $(".search-navigator .previous-page").attr("href", url);
  } else {
    $(".search-navigator .previous-page").addClass("inactive");
  }

  if (hitPositions.next > -1) {
    url = `${url_prefix}${lastSearch.flat[hitPositions.next].url}?srch=${lastSearch.flat[hitPositions.next].location}`;
    $(".search-navigator .next-page").attr("href", url);
  } else {
    $(".search-navigator .next-page").addClass("inactive");
  }

  if (hitPositions.start === hitPositions.end) {
    $(".search-navigator .previous-match").addClass("inactive");
    $(".search-navigator .next-match").addClass("inactive");
  } //set search navigator title


  $(".search-navigator-header-book").text(`${title} - ${lastSearch.pageInfo[pageKey].title}`);
  let matches = new PageMatches(lastSearch.query, hitPositions.start, hitPositions.end, lastSearch.flat); //arg 'true' causes 250ms deplay before calling scroll

  matches.setStart(hitPositions.current, true);
  let markFail = markSearchHits(lastSearch.flat, hitPositions.start, hitPositions.end, lastSearch.query, "show");

  if (markFail) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.info(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("notify:n11")} ${markFail} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("notify:n12")}`);
  }

  initClickListeners(matches); //indicate search navigator is active by adding class to ./transcript

  $(".transcript").addClass("search-navigator-active");
  $(".search-navigator-wrapper").removeClass("hide-search-navigator");
}

function initNavigator(requestedPid) {
  //console.log("init search navigator pid: %s", requestedPid);
  initControls(requestedPid);
}

/***/ }),

/***/ "./src/js/modules/_search/search.js":
/*!******************************************!*\
  !*** ./src/js/modules/_search/search.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _show__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show */ "./src/js/modules/_search/show.js");
/* harmony import */ var www_modules_util_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! www/modules/_util/url */ "../cmi-www/src/js/modules/_util/url.js");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigator */ "./src/js/modules/_search/navigator.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var www_modules_audit_audit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! www/modules/_audit/audit */ "../cmi-www/src/js/modules/_audit/audit.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");







 //search modal

const uiSearchModal = ".search.ui.modal";
const uiOpenSearchModal = ".search-modal-open";
const uiSearchForm = "#search";
const uiSearchSource = "#search .source";
const uiSearchString = "#search input";
const uiSearchInputIcon = "#search .ui.icon.input";
const uiModalOpacity = 0.5; //search modal message box

const uiSearchMessage = ".ui.search.message";
const uiSearchMessageHeader = ".search-message.header";
const uiSearchMessageBody = ".search-message-body"; //search message id's

const SEARCHING = Symbol("searching");
const SEARCH_RESULT = Symbol("search_result");
const SEARCH_ERROR = Symbol("search_error");
const SAVED_SEARCH = Symbol("saved_search");

function displaySearchMessage(msgId, arg1, arg2, arg3) {
  switch (msgId) {
    case SEARCHING:
      $(uiSearchInputIcon).addClass("loading");
      $(uiSearchString).attr("disabled", true);
      $(uiSearchMessage).addClass("purple");
      $(uiSearchMessageHeader).text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s1"));
      $(uiSearchMessageBody).html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s2")} <em>${arg2}</em></p>`);
      break;

    case SAVED_SEARCH:
      //arg1: source, arg2: query string, arg3: count
      $(uiSearchMessageHeader).text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:l6"));
      $(uiSearchMessageBody).html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("string:s3")} <em>${arg2}</em> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s4")} <em>${arg1}</em> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s5")} ${arg3} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s6")}</p>`);
      break;

    case SEARCH_RESULT:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").removeClass("negative"); //clear input only if matches were found

      if (arg3 > 0) {
        $(uiSearchString).val("");
      }

      $(uiSearchMessageHeader).text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s7"));
      $(uiSearchMessageBody).html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("string:s3")} <em>${arg2}</em> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("string:s5")} ${arg3} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("string:s7")}</p>`);
      break;

    case SEARCH_ERROR:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").addClass("negative");
      $(uiSearchMessageHeader).text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("search:s8"));
      $(uiSearchMessageBody).html(`<p>${arg1}</p>`);
      break;

    default:
      break;
  }
} //run query


function search(query) {
  let searchBody = {
    query: query,
    width: 30
  };
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_constants__WEBPACK_IMPORTED_MODULE_7__["default"].searchEndpoint, searchBody).then(response => {
    //console.log("search response: %o", response);
    displaySearchMessage(SEARCH_RESULT, "", `"${response.data.queryTransformed}"`, response.data.count);

    if (response.data.count > 0) {
      Object(_show__WEBPACK_IMPORTED_MODULE_1__["showSearchResults"])(response.data, response.data.queryTransformed);
    } else {
      toastr__WEBPACK_IMPORTED_MODULE_4___default.a.info(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("string:s3")} "${response.data.queryTransformed}" ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("string:s9")}`);
    }

    Object(www_modules_audit_audit__WEBPACK_IMPORTED_MODULE_5__["searchAudit"])(_constants__WEBPACK_IMPORTED_MODULE_7__["default"].sid.toUpperCase(), searchBody.query, response.data.count);
    document.getElementById("search-input-field").focus();
  }).catch(error => {
    console.error("search error: %o", error);
    displaySearchMessage(SEARCH_ERROR, error.message);
    Object(www_modules_audit_audit__WEBPACK_IMPORTED_MODULE_5__["searchAudit"])(_constants__WEBPACK_IMPORTED_MODULE_7__["default"].sid.toUpperCase(), searchBody.query, 0, error.message);
  });
}

function initTranscriptPage() {
  let displayPid = Object(www_modules_util_url__WEBPACK_IMPORTED_MODULE_2__["showSearchMatch"])();

  if (displayPid) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_3__["initNavigator"])(displayPid);
  }
}
/*
  Initialize support for search modal window available
  on all pages
*/


function initSearchModal() {
  $(uiSearchModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    observeChanges: true,
    onShow: function () {
      //load modal with prior query results
      //check if modal already has query results loaded
      if ($(".cmi-search-list > h3").length === 0) {
        Object(_show__WEBPACK_IMPORTED_MODULE_1__["showSavedQuery"])();
      }
    }
  });
  $(uiOpenSearchModal).on("click", e => {
    e.preventDefault();
    $(uiSearchModal).modal("show");
  }); //Search Submit

  $(uiSearchForm).submit(function (e) {
    e.preventDefault();
    var searchSource = $(uiSearchSource).text();
    var searchString = $(uiSearchString).val(); //ignore and return if search string is empty

    if (searchString.length === 0) {
      return;
    } //console.log("Search requested: source: %s, string: %s", searchSource, searchString);


    displaySearchMessage(SEARCHING, searchSource, searchString); //run search

    search(searchString);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function () {
    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage();
    }

    initSearchModal();
  }
});

/***/ }),

/***/ "./src/js/modules/_search/show.js":
/*!****************************************!*\
  !*** ./src/js/modules/_search/show.js ***!
  \****************************************/
/*! exports provided: showSearchResults, showSavedQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSearchResults", function() { return showSearchResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSavedQuery", function() { return showSavedQuery; });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/uniq */ "./node_modules/lodash/uniq.js");
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");




 //this needs to use require because it is also used by a node app and node doesn't support import

const womInfo = __webpack_require__(/*! ../_config/key */ "./src/js/modules/_config/key.js");

const queryResultName = `search.${_constants__WEBPACK_IMPORTED_MODULE_3__["default"].sid}.result`;

function getUnitName(pageInfo, unitInfo) {
  return pageInfo[unitInfo.pageKey].title;
}

function makeList(bid, title, pageInfo, matchArray) {
  return `
    <h3>${title[bid]} (${matchArray.length})</h3>
    <div class="ui list">
      ${matchArray.map(m => `
        <div class="item">
          <i class="book icon"></i>
          <div class="content">
            <div class="header">
              ${getUnitName(pageInfo, m)} (${m.m.length})
            </div>
            <div class="list">
              ${m.m.map(h => `
                <div class="item">
                  <i class="search icon"></i>
                  <div class="content">
                    <div class="header">
                      <a href="${pageInfo[m.pageKey].url}?srch=${h.location}">getString("search:s10") ${h.location.substr(1)}</a>
                    </div>
                    <div class="description">
                      ${h.context}
                    </div>
                  </div>
                  </div> <!-- item -->
              `).join("")}
            </div> <!-- list -->
          </div>
        </div>
      `).join("")}
    </div> <!-- ui list -->
  `;
}
/*
  for a given page, combine all matches into an array
*/


function munge(bookMatches) {
  let keyLength = womInfo.getKeyInfo().keyLength;
  let combined = [];
  let count = 0;

  for (const match of bookMatches) {
    if (!combined[count]) {
      combined[count] = {
        unit: match.unit,
        book: match.book,
        pageKey: match.key.substr(0, keyLength),
        m: [{
          location: match.location,
          context: match.context
        }]
      };
    } else if (combined[count].unit !== match.unit) {
      count++;
      combined[count] = {
        unit: match.unit,
        book: match.book,
        pageKey: match.key.substr(0, keyLength),
        m: [{
          location: match.location,
          context: match.context
        }]
      };
    } else {
      combined[count].m.push({
        location: match.location,
        context: match.context
      });
    }
  }

  return combined;
} //get unique pageKeys from query results and 


function getPageKeys(data) {
  let keyLength = womInfo.getKeyInfo().keyLength;
  let keys = data.map(m => m.key.substr(0, keyLength));
  return lodash_uniq__WEBPACK_IMPORTED_MODULE_1___default()(keys);
}

function showSearchResults(data, query) {
  const books = womInfo.getBooks();
  let pageInfoPromises = []; //get array of all unique page info - promises

  for (let b = 0; b < books.length; b++) {
    let bid = books[b];

    if (data[bid]) {
      let pageKeys = getPageKeys(data[bid]);

      for (const pageKey of pageKeys) {
        pageInfoPromises.push(Object(_config_config__WEBPACK_IMPORTED_MODULE_0__["getPageInfo"])(pageKey));
      }
    }
  }

  Promise.all(pageInfoPromises).then(responses => {
    let html = "";
    let pageInfo = {};
    let titleArray = {}; //console.log("responses: %o", responses);
    //organize pageInfo

    for (const page of responses) {
      let {
        bookTitle,
        title,
        subTitle,
        url
      } = page;

      if (subTitle) {
        title = `${title}: ${subTitle}`;
      }

      pageInfo[page.pageKey] = {
        title,
        url
      };

      if (!titleArray[page.bookId]) {
        titleArray[page.bookId] = bookTitle;
      }
    }

    let matches = {}; //generate html for search hits

    for (let bid of books) {
      if (data[bid]) {
        matches[bid] = munge(data[bid]);
        html += makeList(bid, titleArray, pageInfo, matches[bid]);
      }
    }

    $(".cmi-search-list").html(html);
    $("#search-results-header").html(`: <em>${query}</em>`);
    saveQueryResults(query, data.count, titleArray, pageInfo, matches, data);
  }).catch(error => {
    console.error("Error: %s", error.message);
  });
} //save the query result so it can be available until replaced by another query

function saveQueryResults(queryString, matchCount, titleArray, pageInfo, data, originalResult) {
  const books = womInfo.getBooks();
  let keyLength = womInfo.getKeyInfo().keyLength; //don't save if there were no matches

  if (matchCount === 0) {
    return;
  } //flatten the query result to simplify access by query navigator on transcript pages


  let flatMatches = [];

  for (const bid of books) {
    if (originalResult[bid]) {
      for (const match of originalResult[bid]) {
        let pageKey = match.key.substr(0, keyLength);
        let m = {
          key: pageKey,
          url: `/${match.book}/${match.unit}/`,
          location: match.location
        };
        flatMatches.push(m);
      }
    }
  }

  store__WEBPACK_IMPORTED_MODULE_2___default.a.set(queryResultName, {
    query: queryString,
    count: matchCount,
    titleArray: titleArray,
    pageInfo: pageInfo,
    data: data,
    flat: flatMatches
  });
} //show saved query result in modal


function showSavedQuery() {
  const queryResult = store__WEBPACK_IMPORTED_MODULE_2___default.a.get(queryResultName);

  if (!queryResult) {
    return;
  }

  const books = womInfo.getBooks();
  let html = ""; //generate html for search hits

  for (let bid of books) {
    if (queryResult.data[bid]) {
      html += makeList(bid, queryResult.titleArray, queryResult.pageInfo, queryResult.data[bid]);
    }
  }

  $(".cmi-search-list").html(html);
  $(".search-message.header").text(Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("search:s11"));
  $(".search-message-body").html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("string:s3")} <em>${queryResult.query}</em> ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("string:s5")} ${queryResult.count} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("string:s6")}</p>`);
  $("#search-results-header").html(`: <em>${queryResult.query}</em>`);
}

/***/ }),

/***/ "./src/js/modules/_util/driver.js":
/*!****************************************!*\
  !*** ./src/js/modules/_util/driver.js ***!
  \****************************************/
/*! exports provided: pageDriver, pageNavigationDriver, transcriptDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageDriver", function() { return pageDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNavigationDriver", function() { return pageNavigationDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transcriptDriver", function() { return transcriptDriver; });
/* harmony import */ var driver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! driver.js */ "./node_modules/driver.js/dist/driver.min.js");
/* harmony import */ var driver_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(driver_js__WEBPACK_IMPORTED_MODULE_0__);

function pageDriver() {
  const driver = new driver_js__WEBPACK_IMPORTED_MODULE_0___default.a({
    allowClose: false,
    opacity: 0.5,
    onHighlightStarted: el => {
      console.log("highlighting %o", el);
    }
  });
  driver.defineSteps([{
    element: "#source-homepage",
    popover: {
      title: "Droga Mistrzostwa",
      description: "Oto główna strona wszystkich nauk <em>Drogi Mistrzostwa</em> umieszczonych w niniejszej Bibliotece. Trzy książki posiadają ścieżkę dźwiekową i można je czytać jednocześnie słuchając.<br><br>Kliknij na obrazek książki, aby zobaczyć spis treści&hellip;",
      position: "bottom"
    }
  }, {
    element: "[data-book='woh']",
    popover: {
      title: "Droga Serca",
      description: "Pierwsza z trzech książek, które tworzą trzyletni proces duchowej ścieżki przebudzenia.",
      position: "top"
    }
  }, {
    element: "[data-book='wot']",
    popover: {
      title: "Droga Przemiany",
      description: "Drugi rok comiesięcznych lekcji prowadzących do przemiany serca i umysłu.",
      position: "top"
    }
  }, {
    element: "[data-book='wok']",
    popover: {
      title: "Droga Poznania",
      description: "Ostatni tom, który zamyka trylogię <em>Drogi Mistrzostwa</em>.",
      position: "top"
    }
  }, {
    element: "[data-book='tjl']",
    popover: {
      title: "Listy Jeszuy",
      description: "Opowieść Jayema o pojawieniu się Jeszuy w jego życiu i danych mu naukach nazwanych Listami Jeszuy.",
      position: "top"
    }
  }, {
    element: "[data-book='wos']",
    popover: {
      title: "Droga Sługi",
      description: "Poetycki opis podróży przebudzenia, od narodzenia do rozpoznania siebie jako sługi, który kroczy przebudzony w służbie dla wszystkich swych sióstr i braci.",
      position: "top"
    }
  }, {
    element: "[data-book='early']",
    popover: {
      title: "Wczesne lata",
      description: "Zbiór przesłań danych przed powstaniem <em>Drogi Serca</em>, pierwszej części trylogii <em>Drogi Mistrzostwa</em>.",
      position: "top"
    }
  }]);
  driver.start();
}
function pageNavigationDriver() {
  const driver = new driver_js__WEBPACK_IMPORTED_MODULE_0___default.a({
    allowClose: false,
    opacity: 0.5,
    onReset: () => {
      $("#bookmark-dropdown-menu").dropdown("hide");
    }
  });
  driver.defineSteps([{
    element: "#masthead-title",
    popover: {
      title: "Nawigacja i funkcjonalności",
      description: "Droga Mistrzostwa jest częśćią Biblioteki Nauk Umysłu Chrystusa. Na każdej stronie możesz kliknąć w tym miejscu, aby wyświetlić główną stronę Biblioteki z wszystkimi dostępnymi naukami.",
      position: "bottom"
    }
  }, {
    element: "#page-menu",
    popover: {
      title: "Menu",
      description: "To jest menu strony. Jest ono zawsze widoczne i dostępne, gdy przewijasz stronę w dół czytając lub przeszukując tekst. Menu na innych stronach jest podobne, lecz może mieć dodatkowe funkcjonalności.",
      position: "bottom"
    }
  }, {
    element: ".bookmark-modal-open",
    popover: {
      title: "Lista zakładek",
      description: "Wyświetl listę zakładek, jakie utworzyłeś i opcjonalnie możesz je filtrować tematami. Możesz szybko przejść do dowolnej zakładki. Możesz dowiedzieć się więcej o zakładkach z pomocy w języku angielskim.",
      position: "bottom"
    }
  }, {
    element: ".search-modal-open",
    popover: {
      title: "Szukaj we wszystkich książkach",
      description: "Możesz wyszukiwać interesujące cię tematy we wszystkich książkach Drogi Mistrzostwa.",
      position: "bottom"
    }
  }, {
    element: "#quick-links-dropdown-menu",
    popover: {
      title: "Przejdź do innych nauk Biblioteki",
      description: "Szybko przejdź do innych nauk zebranych w Bibliotece.",
      position: "bottom"
    }
  }, {
    element: "#help-menu",
    popover: {
      title: "Pomoc oraz informacje",
      description: "Dowiedz się więcej na temat nauk oraz funkcjonalności strony.",
      position: "bottom"
    }
  }, {
    element: ".login-menu-option",
    popover: {
      title: "Zaloguj się/Załóż konto",
      description: "Załóż konto i zaloguj się do strony. Konto jest darmowe i pozwala tworzyć własne zakładki ( zaznaczone fragmenty tekstu). Możesz dzielić się tak utworzonymi zakładkami na Facebooku.",
      position: "left"
    }
  }, {
    element: "[data-book='wot']",
    popover: {
      title: "Pokaż spis treści",
      description: "Kliknij na dowolny obrazek książki, aby wyświetlić spis treści.",
      position: "left"
    }
  }]);
  driver.start();
}
function transcriptDriver() {
  const driver = new driver_js__WEBPACK_IMPORTED_MODULE_0___default.a({
    allowClose: false,
    opacity: 0.5
    /*
    onReset: () => {
      $("#bookmark-dropdown-menu").dropdown("hide");
    }
    */

  });
  let steps = [];
  steps.push({
    element: "#masthead-title",
    popover: {
      title: "Library of Christ Mind Teachings",
      description: "This page is part of the Teachings of Christ Mind Library. Click this link to navigate to the Library's Home page.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#src-title",
    popover: {
      title: "Way of Mastery",
      description: "This page comes from the Way of Mastery. Click this link to navigate to the Home page of the Way of Mastery.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#book-title",
    popover: {
      title: "Book Title",
      description: "This identifies the book and chapter of the content on this page.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#bookmark-dropdown-menu",
    popover: {
      title: "Bookmarks",
      description: "You can create a bookmark from highlighted text and associate the bookmark with one or more categories. Learn more about bookmarks by reading the documentation.",
      position: "right"
    }
  });

  if ($(".search-modal-open").length > 0) {
    steps.push({
      element: ".search-modal-open",
      popover: {
        title: "Search Through All Books",
        description: "Find topics of interest by searching through all Way of Mastery books.",
        position: "bottom"
      }
    });
  }

  if (!$(".audio-player-toggle").hasClass("hide")) {
    steps.push({
      element: ".audio-player-toggle",
      popover: {
        title: "Listen to the Audio",
        description: "Click the speaker icon to display the audio player and listen along as you read.",
        position: "bottom"
      }
    });
  }

  steps.push({
    element: ".toggle-paragraph-markers",
    popover: {
      title: "Show/Hide Paragraph Markers",
      description: "Show or hide the markers that preceed each paragraph.",
      position: "bottom"
    }
  });
  steps.push({
    element: ".top-of-page",
    popover: {
      title: "Go To Top of Page",
      description: "Quickly jump to the top of the page.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#contents-modal-open",
    popover: {
      title: "Table of Contents",
      description: "View the table of contents.",
      position: "bottom"
    }
  });
  steps.push({
    element: ".previous-page",
    popover: {
      title: "Previous Page",
      description: "Go to the previous page. This will be disabled when the first page is displayed.",
      position: "bottom"
    }
  });
  steps.push({
    element: ".next-page",
    popover: {
      title: "Next Page",
      description: "Go to the next page. This will be disabled when the last page is displayed.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#quick-links-dropdown-menu",
    popover: {
      title: "Navigate to Another Teaching",
      description: "Quickly jump to one of the other teachings in the Library.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#about-dropdown-menu",
    popover: {
      title: "Get Help",
      description: "Learn how to use features of the Library.",
      position: "bottom"
    }
  });
  steps.push({
    element: ".login-menu-option",
    popover: {
      title: "Sign In/Sign Out",
      description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
      position: "bottom"
    }
  });
  driver.defineSteps(steps);
  driver.start();
}

/***/ }),

/***/ "./src/js/notes.js":
/*!*************************!*\
  !*** ./src/js/notes.js ***!
  \*************************/
/*! exports provided: noteInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noteInfo", function() { return noteInfo; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

const noteInfo = {
  studyguide: {
    url: `${_constants__WEBPACK_IMPORTED_MODULE_0__["default"].env === "standalone" ? "/" : _constants__WEBPACK_IMPORTED_MODULE_0__["default"].url_prefix}notes/studyGuide.html`,
    title: "Study Suggestions"
  }
};

/***/ }),

/***/ "./src/js/setEnv.js":
/*!**************************!*\
  !*** ./src/js/setEnv.js ***!
  \**************************/
/*! exports provided: setRuntimeEnv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRuntimeEnv", function() { return setRuntimeEnv; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* harmony import */ var _modules_config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/_config/config */ "./src/js/modules/_config/config.js");
/*
 * Set standalone or integrated environment.
 *
 * Standalone runs from the _site directory of a Jekyll
 * install and Integrated runs from ../cmi-www/_site/t/???
 */


function setRuntimeEnv() {
  Object(_modules_config_config__WEBPACK_IMPORTED_MODULE_1__["setEnv"])(_constants__WEBPACK_IMPORTED_MODULE_0__["default"]);
  return _constants__WEBPACK_IMPORTED_MODULE_0__["default"].env;
}

/***/ })

}]);
//# sourceMappingURL=page~transcript.js.map
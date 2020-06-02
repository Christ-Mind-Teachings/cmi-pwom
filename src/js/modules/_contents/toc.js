import scroll from "scroll-into-view";
import {getConfig} from "../_config/config";
import clipboard from "www/modules/_bookmark/clipboard";

const uiTocModal = ".toc.ui.modal";
const uiOpenTocModal = ".toc-modal-open";
const uiModalOpacity = 0.5;

const tocString = "Spis treści";

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
}

//generate html for questions
function renderSubcontents(contents, c) {
    //<div class="list">
  return `
    <div class="list">
      ${contents.map(q => `<a data-lid="${++c.counter}" class="item${getTimerClass(q)}" href="${q.url}">${q.title}</a>`).join("")}
    </div>
  `;
}

//generate html for Contents
function makeContents(contents, type) {
  var c = {counter: 0};
  var klass = "ui list";

  if (type) {
    klass = `${klass} ${type}`;
  }
  return (`
    <div class="${klass}">
      ${contents.map(unit => `
        <div class="item">
          <a data-lid="${++c.counter}" class="item${getTimerClass(unit)}" href="${unit.url}">${unit.title}</a>
          ${unit.contents ? renderSubcontents(unit.contents, c) : ""}
        </div>
      `).join("")}
    </div>
  `);
}

//called for transcript pages
function loadTOC() {
  console.log("transcript page: loading toc");
  let book = $("#contents-modal-open").attr("data-book").toLowerCase();

  getConfig(book)
    .then((contents) => {
      $(".toc-image").attr("src", `${contents.image}`);
      $(".toc-title").html(`${tocString}: <em>${contents.title}</em>`);

      $(".toc-list").html(makeContents(contents.contents, contents.toc || ""));
      highlightCurrentTranscript(contents.bid, contents.totalPages);
    })
    .catch((error) => {
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
  let prevId = -1, nextId = -1, href, text;
  let lid = $el.attr("data-lid");
  let lessonId = parseInt(lid, 10);

  //disable prev control
  if (lessonId === 1) {
    $("#toc-previous-page").addClass("disabled");
  }
  else {
    $("#toc-previous-page").removeClass("disabled");
    prevId = lessonId - 1;
  }

  //disable next control
  if (lessonId === LAST_ID) {
    $("#toc-next-page").addClass("disabled");
  }
  else {
    $("#toc-next-page").removeClass("disabled");
    nextId = lessonId + 1;
  }

  if (prevId > -1) {
    href = $(`a[data-lid="${prevId}"]`).attr("href");
    text = $(`a[data-lid="${prevId}"]`).text();

    //set prev tooltip and href
    $("#toc-previous-page > span").attr("data-tooltip", `${text}`);
    $("#toc-previous-page").attr("href", `${href}`);
  }

  if (nextId > -1) {
    href = $(`a[data-lid="${nextId}"]`).attr("href");
    text = $(`a[data-lid="${nextId}"]`).text();

    //set prev tooltip and href
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
  let $el = $(`.toc-list a[href='${page}']`);

  //remove href to deactivate link for current page and
  //scroll into middle of viewport
  $el.addClass("current-unit").removeAttr("href");
  scroll($el.get(0));

  nextPrev($el, max);
}

/*
  Calls to this function are valid for transcript pages.
*/
export function getBookId() {
  return $(uiOpenTocModal).attr("data-book");
}

export default {

  /*
   * Init the modal dialog with data from JSON file
   * or local storage
   */
  initialize: function(env) {
    //dialog settings
    $(uiTocModal).modal({
      dimmerSettings: {opacity: uiModalOpacity},
      observeChanges: true
    });

    //load toc once for transcript pages
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
    $(uiOpenTocModal).on("click", (e) => {
      e.preventDefault();
      let book = $(e.currentTarget).attr("data-book").toLowerCase();

      //load the TOC if we're not on a transcript page
      if (env !== "transcript") {
        getConfig(book)
          .then((contents) => {
            let share_url=`${location.origin}${location.pathname}?tocbook=${book}`;

            $(".toc-image").attr("src", `${contents.image}`);
            $(".toc-title").html(`<i data-clipboard-text="${share_url}" title="Copy to Clipboard" class="tiny share alternate icon toc-share"></i>&nbsp;${tocString}: <em>${contents.title}</em>`);
            $(".toc-list").html(makeContents(contents.contents, contents.toc || ""));
            $(uiTocModal).modal("show");

            clipboard.register(".share.icon.toc-share");
          })
          .catch((error) => {
            $(".toc-image").attr("src", "/public/img/cmi/toc_modal.png");
            $(".toc-title").html("${tocString}: <em>Error</em>");
            $(".toc-list").html(`<p>Failed to get configuration file ${book}.json`);
            $(uiTocModal).modal("show");
          });
      }
      else {
        $(uiTocModal).modal("show");
      }
    });
  }
};

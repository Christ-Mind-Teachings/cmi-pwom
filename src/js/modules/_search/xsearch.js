import {searchSource} from "www/modules/_ajax/search";
import { showSavedQuery, showSearchResults } from "./show";
import {showSearchMatch} from "www/modules/_util/url";
import { initNavigator } from "./navigator";
import notify from "toastr";
import {getString} from "../_language/lang";
import constants from "../../constants";

//search modal
const uiSearchModal = ".search.ui.modal";
const uiOpenSearchModal = ".search-modal-open";
const uiSearchForm = "#search";
const uiSearchSource = "#search .source";
const uiSearchString = "#search input";
const uiSearchInputIcon = "#search .ui.icon.input";
const uiModalOpacity = 0.5;

//search modal message box
const uiSearchMessage = ".ui.search.message";
const uiSearchMessageHeader = ".search-message.header";
const uiSearchMessageBody = ".search-message-body";

//search message id's
const SEARCHING = Symbol("searching");
const SEARCH_RESULT = Symbol("search_result");
const SEARCH_ERROR = Symbol("search_error");
const SAVED_SEARCH = Symbol("saved_search");

function displaySearchMessage(msgId, arg1, arg2, arg3) {
  switch(msgId) {
    case SEARCHING:
      $(uiSearchInputIcon).addClass("loading");
      $(uiSearchString).attr("disabled", true);
      $(uiSearchMessage).addClass("purple");
      $(uiSearchMessageHeader).text(getString("search:s1"));
      $(uiSearchMessageBody).html(`<p>${getString("search:s2")} <em>${arg2}</em></p>`);
      break;
    case SAVED_SEARCH:
      //arg1: source, arg2: query string, arg3: count
      $(uiSearchMessageHeader).text(getString("label:l6"));
      $(uiSearchMessageBody).html(`<p>${getString("search:s3")} <em>${arg2}</em> ${getString("search:s4")} <em>${arg1}</em> ${getString("search:s5")} ${arg3} ${getString("search:s6")}</p>`);
      break;
    case SEARCH_RESULT:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").removeClass("negative");

      //clear input only if matches were found
      if (arg3 > 0) {
        $(uiSearchString).val("");
      }

      $(uiSearchMessageHeader).text(getString("search:s7"));
      $(uiSearchMessageBody).html(`<p>${getString("search:s3")} <em>${arg2}</em> ${getString("search:s5")} ${arg3} ${getString("search:s7")}</p>`);
      break;
    case SEARCH_ERROR:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").addClass("negative");

      $(uiSearchMessageHeader).text(getString("search:s8"));
      $(uiSearchMessageBody).html(`<p>${arg1}</p>`);
      break;
    default:
      break;
  }
}

//run query
async function search(query) {
  let searchBody = {
    source: "pwom",
    query: query,
    width: 30
  };

  try {
    let result = await searchSource(searchBody);
    displaySearchMessage(SEARCH_RESULT, "", `"${result.queryTransformed}"`, result.count);
    if (result.count > 0) {
      showSearchResults(result, result.queryTransformed);
    }
    else {
      notify.info(`${getString("search:s3")} "${result.queryTransformed}" ${getString("search:s9")}`);
    }
    document.getElementById("search-input-field").focus();
  }
  catch(error) {
    console.error("search error: %o", error);
    displaySearchMessage(SEARCH_ERROR, error.message);
  }
}

function initTranscriptPage() {
  let displayPid = showSearchMatch();
  if (displayPid) {
    initNavigator(displayPid);
  }
}

/*
  Initialize support for search modal window available
  on all pages
*/
function initSearchModal() {

  $(uiSearchModal).modal({
    dimmerSettings: {opacity: uiModalOpacity},
    observeChanges: true,
    onShow: function() {
      //load modal with prior query results

      //check if modal already has query results loaded
      if ($(".cmi-search-list > h3").length === 0) {
        showSavedQuery();
      }
    }
  });

  $(uiOpenSearchModal).on("click", (e) => {
    e.preventDefault();
    $(uiSearchModal).modal("show");
  });

  //Search Submit
  $(uiSearchForm).submit(function(e) {
    e.preventDefault();
    var searchSource = $(uiSearchSource).text();
    var searchString = $(uiSearchString).val();

    //ignore and return if search string is empty
    if (searchString.length === 0) {
      return;
    }

    //console.log("Search requested: source: %s, string: %s", searchSource, searchString);
    displaySearchMessage(SEARCHING, searchSource, searchString);

    //run search
    search(searchString);
  });

}

export default {
  initialize: function() {

    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage();
    }

    initSearchModal();
  }
};


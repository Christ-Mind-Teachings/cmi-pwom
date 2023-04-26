/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";
import {initHomePage} from "common/modules/_page/startup";
import search from "common/modules/_search/search";
import {showSearch, showQuotes, showTOC} from "common/modules/_util/url";
import {setLanguage} from "common/modules/_language/lang";
import {initQuoteDisplay} from "common/modules/_topics/events";
import {initialize as initNotes} from "common/modules/_page/notes";

//teaching specific modules
import {setEnv} from "./modules/_config/config";
import toc from "./modules/_contents/toc";
import {pageDriver} from "./modules/_util/driver";
import constants from "./constants";
import lang from "./lang";
import { noteInfo } from "./notes";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);

  setLanguage(lang);
  setEnv(store);

  initHomePage(store, pageDriver);
  toc.initialize("page");
  initNotes(noteInfo);
  search.initialize(store);

  //support for quote display and sharing
  initQuoteDisplay("#show-quote-button", constants);

  //if url contains ?tocbook=[ack | book1 | book2] then show TOC on page load
  showTOC();

  //if url contains ?search=y then show search modal on page load
  showSearch();

  //if url contains ?quotes=y then show quotes modal on page load
  showQuotes();
});


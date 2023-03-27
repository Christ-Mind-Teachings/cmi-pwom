/* eslint no-console: off */
import {SourceStore, storeInit} from "www/modules/_util/store";
import search from "www/modules/_search/search";

//common modules
import auth from "www/modules/_user/netlify";
import {initStickyMenu, initAnimation} from "www/modules/_page/startup";
import {initialize as initNotes} from "www/modules/_page/notes";
import {showTOC} from "www/modules/_util/url";
import {setLanguage} from "www/modules/_language/lang";

import fb from "www/modules/_util/facebook";
import {initQuoteDisplay} from "www/modules/_topics/events";

//teaching specific modules
import {bookmarkStart} from "./modules/_bookmark/start";
import {searchInit} from "./modules/_search/search";
import toc from "./modules/_contents/toc";
import about from "./modules/_about/about";
import { noteInfo } from "./notes";
import constants from "./constants";

import {setRuntimeEnv} from "./setEnv";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);
  initStickyMenu();
  setLanguage(constants);
  setRuntimeEnv();

  auth.initialize();

  bookmarkStart("page");
  search.initialize(searchInit(store));
  toc.initialize("page");
  initNotes(noteInfo);
  about.initialize();

  //support for quote display and sharing
  fb.initialize();
  initQuoteDisplay("#show-quote-button", constants);

  initAnimation();
  showTOC();
});


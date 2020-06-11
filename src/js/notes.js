import constants from "./constants";

export const noteInfo = {
  studyguide: {
    url: `${constants.env === "standalone"?"/notes/advice/":"constants.url_prefix/notes/advice/"}`,
    title: "Sugestie do praktyki"
  }
}


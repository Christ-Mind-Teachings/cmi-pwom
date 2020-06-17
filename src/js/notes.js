import constants from "./constants";

export const noteInfo = {
  studyguide: {
    url: `${constants.env === "standalone"?"/notes/advice/":`${constants.url_prefix}/notes/advice/`}`,
    title: "Sugestie do praktyki"
  },
  path: {
    url: `${constants.env === "standalone"?"/notes/path/":`${constants.url_prefix}/notes/path/`}`,
    title: "Ścieżka Drogi Mistrzostwa"
  }
}


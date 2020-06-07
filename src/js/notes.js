import constants from "./constants";

export const noteInfo = {
  studyguide: {
    url: `${constants.env === "standalone"?"/":constants.url_prefix}notes/studyGuide.html`,
    title: "Study Suggestions"
  }
}


/**
 * Add functionality for polish video documentation to help menu
 *
 * @param {object} - that, this object from event handler
 */
export function pwomHelp(that) {
  if ($(that).hasClass("polish-documentation")) {
    location.href = "/t/pwom/acq/video/";
    return;
  }
}


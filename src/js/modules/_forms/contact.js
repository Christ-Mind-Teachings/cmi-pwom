/*
  Set up submit handler for contact forms
*/
import notify from "toastr";
import {getUserInfo} from "www/modules/_user/netlify";
import {getString} from "../_language/lang";

function createSubmitHandler($form) {
  let userInfo = getUserInfo();

  //init form fields for signed in users
  if (userInfo) {
    $form.form("set values", {
      name: userInfo.name,
      email: userInfo.email
    });
  }

  //submit handler
  $form.submit(function(e) {
    e.preventDefault();
    //console.log("submit pressed");

    let $form = $(this);
    let formData = $form.form("get values");
    let validationError = false;

    //form validation
    if (formData.name.trim().length === 0) {
      notify.warning(getString("error:e7"));
      validationError = true;
    }
    if (formData.email.trim().length === 0) {
      notify.warning(getString("error:e8"));
      validationError = true;
    }
    if (formData.message.trim().length === 0) {
      notify.warning(getString("error:e9"));
      validationError = true;
    }

    if (validationError) {
      return false;
    }

    //send to netlify
    $.post($form.attr("action"), $form.serialize())
      .done(function() {
        notify.success(getString("error:e10"));
      })
      .fail(function(e) {
        notify.error(getString("error:e11"));
      });
  });
}

export default {

  initialize: function(formName) {
    let $form = $(`form#${formName}`);

    if ($form.length > 0) {
      createSubmitHandler($form);
      console.log("Form %s initialized.", formName);
    }
  }
};

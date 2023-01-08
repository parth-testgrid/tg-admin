$(document).ready(function () {
  function isEmailValid(email) {
    var regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    }
    else {
      return true;
    }
  }

  function isMobileValid(mobile) {
    const regex = /^\d*(?:\.\d{1,2})?$/;

    if (!regex.test(mobile) || !(mobile.length == 10)) {
      return false;
    } else {
      return true;
    }
  }

  const contact_us_reason = $("#contact_about").attr('selected', true);

  $("#tech_support").submit(function (e) {
    e.preventDefault();
    console.log(contact_us_reason);
    if (contact_us_reason == "Contacting us about") {
      $(".contact_about_error").html("Please select a reason");
    } else {
      $(".contact_about_error").html("");
    }

    const name = $("#name").val();
    if (name == "") {
      $(".name_error").html("Please enter name");
    } else {
      $(".name_error").html("");
    }

    const email = $("#email").val();
    if (!isEmailValid(email)) {
      $(".email_error").html("Please enter a valid email address");
    } else {
      $(".email_error").html("");
    }

    const mobile = $("#mobile").val();
    if (!isMobileValid(mobile)) {
      $(".mobile_error").html("Please enter a 10 digit mobile number");
    } else {
      $(".mobile_error").html("");
    }

    $.ajax({
      type: "POST",
      url: "../ajax/ajax_tech_support.php",
      data: $("#tech_support").serialize(),
      success: function (response) {
        console.log(response);
      }
    });
  });
});
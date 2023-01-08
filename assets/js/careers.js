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

  function validate_file(file) {
    if (file == undefined) {
      return false;
    } else {
      const fileType = file.type;
      const match = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const fileSize = file.size;
      const maxSize = 2 * 1024 * 1024;

      if ((fileType == match[0]) || (fileType == match[1]) || (fileSize <= maxSize)) {
        return true;
      } else {
        return false;
      }
    }
  }

  $("#careers").submit(function (e) {
    e.preventDefault();

    const fname = $("#fname").val();
    if (fname == "") {
      $(".fname_error").html("Please enter first name");
    } else {
      $(".fname_error").html("");
    }

    const lname = $("#lname").val();
    if (lname == "") {
      $(".lname_error").html("Please enter last name");
    } else {
      $(".lname_error").html("");
    }

    const email = $("#email").val();
    if (!isEmailValid(email)) {
      $(".email_error").html("Please enter a valid email address");
    } else {
      $(".email_error").html("");
    }

    const linkedin = $("#linkedin").val();
    if (linkedin == "") {
      $(".linkedin_error").html("Please enter a valid email address");
    } else {
      $(".linkedin_error").html("");
    }

    if ($("#resume").length) {
      const resume = $("#resume")[0].files[0];

      const isFileValid = validate_file(resume);
      if (isFileValid == false) {
        $(".resume_error").html("Please select a resume (PDF) file with minimal size");
        $("#resume").val("");
      }
       else {
        $(".resume_error").html("");
      }
    }
    
    if ($("#cover_letter").length) { 
      const cover_letter = $("#cover_letter")[0].files[0];
      
      const isFileValid = validate_file(cover_letter);
      if (isFileValid == false) {
        $(".cover_letter_error").html("Please select a cover letter (PDF) file with minimal size");
        $("#cover_letter").val("");
      }
       else {
        $(".cover_letter_error").html("");
      }
    }

    if ($("#resume").length && $("#cover_letter").length) {
      const form = $("#careers");
      let formData = new FormData(this);

      $.ajax({
        type: "POST",
        url: "../ajax/ajax_careers.php",
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function (response) {
          console.log(response);
        }
      });
    }

    $.ajax({
      type: "POST",
      url: "../ajax/ajax_careers.php",
      data: $("#contact_us").serialize(),
      success: function (response) {
        
      }
    });
  });
});
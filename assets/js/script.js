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

  function validate_file(file) {
    console.log(file);
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

  const contact_us_reason = $("#contact_about").val();

  $("#contact_about").change(function (e) {
    e.preventDefault();

    if (e.target.value == "Careers") {
      const careers_html = `<div class="col-md-6">
      <div class="form-group">
        <label class="form-control-label">Resume/CV</label>
        <div>
          <input type="file" name="resume" id="resume" class="form-control"
            data-multiple-caption="{count} files selected">
          <label for="">
            <span class="">Attach your file</span>
          </label>
          <span class="resume_error text-danger"></span>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label class="form-control-label">Cover letter</label>
        <div>
          <input type="file" name="cover_letter" id="cover_letter" class="form-control"
            data-multiple-caption="{count} files selected">
          <label for="">
            <span class="">Attach your file</span>
          </label>
          <span class="cover_letter_error text-danger"></span>
        </div>
      </div>
    </div>`;
      $(".options").html(careers_html);
    } else {
      $(".options").html("");
    }
  });

  $("#contact_us").submit(function (e) {
    e.preventDefault();
    console.log(e);
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

    const message = $("#message").val();
    if (message == "") {
      $(".message_error").html("Please enter a message");
    } else {
      $(".message_error").html("");
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
      const form = $("#contact_us");
      console.log(form);
      let formData = new FormData(this);

      $.ajax({
        type: "POST",
        url: "ajax/ajax_contact.php",
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
      url: "ajax/ajax_contact.php",
      data: $("#contact_us").serialize(),
      success: function (response) {
        
      }
    });
  });
});
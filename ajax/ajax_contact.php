<?php
require_once "../config.php";

function guidv4($data = null)
{
  // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
  $data = $data ?? random_bytes(16);
  assert(strlen($data) == 16);

  // Set version to 0100
  $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
  // Set bits 6-7 to 10
  $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

  // Output the 36 character UUID.
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

if (is_array($_FILES) && isset($_POST["name"])) {
  $uuid = guidv4();

  $error = true;
  // input fields
  $contact_about = trim($_POST["contact_about"]);
  if (empty($contact_about)) {
    $error = true;
  } else {
    $error = false;
  }
  
  $name = trim($_POST["name"]);
  if (empty($name)) {
    $error = true;
  } else {
    $error = false;
  }

  $email = trim($_POST["email"]);
  if (empty($email)) {
    $error = true;
  } else {
    $error = false;
  }

  $mobile = trim($_POST["mobile"]);
  if (empty($mobile)) {
    $error = true;
  } else {
    $error = false;
  }

  $company = trim($_POST["company"]);
  if (empty($company)) {
    $error = true;
  } else {
    $error = false;
  }
  
  $message = trim($_POST["message"]);
  if (empty($message)) {
    $error = true;
  } else {
    $error = false;
  }

  // resume file
  $resume = $_FILES["resume"]["name"];
  $resume_temp = $_FILES["resume"]["tmp_name"];

  $resume_extension_pos = strrpos($resume, '.');
  $uniqueResumeName = substr($resume, 0, $resume_extension_pos) . $uuid . substr($resume, $resume_extension_pos);
  $resume_folder = "../assets/files/" . $uniqueResumeName;
  
  // cover letter file
  $cover_letter = $_FILES["cover_letter"]["name"];
  $cover_letter_temp = $_FILES["cover_letter"]["tmp_name"];

  $cover_letter_extension_pos = strrpos($cover_letter, '.');
  $uniqueCoverLetterName = substr($cover_letter, 0, $cover_letter_extension_pos) . $uuid . substr($cover_letter, $cover_letter_extension_pos);
  $cover_letter_folder = "../assets/files/" . $uniqueCoverLetterName;

  if (!empty($resume) && !empty($cover_letter) && !$error) {
    $insertQuery = "INSERT INTO contact_us (reason, name, email, mobile, company, message, resume, cover_letter) VALUES ('$contact_about', '$name', '$email', $mobile, '$company', '$message', '$uniqueResumeName', '$uniqueCoverLetterName')";
    $result = mysqli_query($conn, $insertQuery);

    if (move_uploaded_file($resume_temp, $resume_folder) && move_uploaded_file($cover_letter_temp, $cover_letter_folder) && $result) {
      echo "success";
    } else {
      echo "failed";
    }
  } else {
    echo "something went wrong";
  }
}

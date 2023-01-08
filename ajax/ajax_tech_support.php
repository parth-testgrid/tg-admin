<?php
require_once "../config.php";

if (isset($_POST["name"])) {
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

  $message = trim($_POST["message"]);

  if (!$error) {
    $insertQuery = "INSERT INTO tech_support (reason, name, email, mobile, company, message) VALUES ('$contact_about', '$name', '$email', $mobile, '$company', '$message')";
    $result = mysqli_query($conn, $insertQuery);

    if ($result) {
      echo "success";
    } else {
      echo "failed";
    }
  } else {
    echo "something went wrong";
  }
}

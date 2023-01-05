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

if (is_array($_FILES)) {
  $uuid = guidv4();

  $resume = $_FILES["resume"]["name"];
  $resume_temp = $_FILES["resume"]["tmp_name"];

  $resume_extension_pos = strrpos($resume, '.');
  $uniqueResumeName = substr($resume, 0, $resume_extension_pos) . $uuid . substr($resume, $resume_extension_pos);
  $folder = "../assets/files" . $uniqueResumeName;

  if (!empty($resume)) {
    $insertQuery = "INSERT INTO contact_us (reason, name, email, mobile, company, message, resume, cover_letter) VALUES ('abc', 'abc', 'abc', 123 'abc', 'abc', '$uniqueResumeName', 'abc')";
    mysqli_query($conn, $insertQuery);

    if (move_uploaded_file($resume_temp, $folder)) {
      echo "success";
    } else {
      echo "failed";
    }
  }
}

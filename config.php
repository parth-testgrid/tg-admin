<?php

// Database Credentials
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'tg_admin');

// Connecting to database
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// checking connection 
if ($conn === false) {
  die("ERROR: Could not connect " . mysqli_connect_error());
}
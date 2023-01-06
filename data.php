<?php
require_once "config.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data</title>
  <link rel="stylesheet" href="assets/css/bootstrap/bootstrap.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <script src="assets/js/bootstrap/bootstrap.js" defer></script>
  <script src="assets/js/jquery-3.5.1.js"></script>
  <script src="assets/js/jquery.dataTables.min.js"></script>
</head>

<body>
  <div class="container py-5">
    <h1 class="text-center mb-4">Data</h1>

    <div class="table-container">
      <table class="table border-dark table-striped">
        <thead>
          <th>ID</th>
          <th>Reason</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Company</th>
          <th>Message</th>
          <th>Resume</th>
          <th>Cover Letter</th>
        </thead>
        <tbody>
          <?php
          $selectQuery = "SELECT * FROM contact_us";
          $result = mysqli_query($conn, $selectQuery);

          while ($row = mysqli_fetch_assoc($result)) { ?>
            <tr>
              <td><?php echo $row["id"] ?></td>
              <td><?php echo $row["reason"] ?></td>
              <td><?php echo $row["name"] ?></td>
              <td><?php echo $row["email"] ?></td>
              <td><?php if (!empty($row["mobile"])) echo $row["mobile"];
                  else echo "NULL" ?></td>
              <td><?php echo $row["company"] ?></td>
              <td><?php echo $row["message"] ?></td>
              <td><?php
                  if (!empty($row["resume"])) { ?>
                  <a href="assets/files/<? echo $row["resume"] ?>"><?php echo $row["name"] . "'s resume" ?></a>
                <?php } else {
                    echo "NULL";
                  }
                ?>
              </td>
              <td><?php
                  if (!empty($row["cover_letter"])) { ?>
                  <a href="assets/files/<? echo $row["cover_letter"] ?>"><?php echo $row["name"] . "'s CV" ?></a>
                <?php } else {
                    echo "NULL";
                  }
                ?>
              </td>
            </tr>
          <?php }
          ?>
        </tbody>
      </table>
    </div>

  </div>
</body>

</html>
<?php


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Chatbot";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Anslutning misslyckas" . mysqli_connect_error());
}

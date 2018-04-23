<?php

$to="mikkellehrmann@gmail.com";

$navn=$_REQUEST['navn'];
$email=$_REQUEST['email'];
$emne=$_REQUEST['emne'];
$besked=$_REQUEST['besked'];


$subject="Besked fra " . $navn . ": ". $email;
$message="<h1 style='color:red'>" .$emne . "</h1> " . $besked;

$header ="Content-type: text/html; charset=utf-8" . "\r\n";
$header.="from:mikkel@mixel.dk";

mail($to, $subject, $message, $header);
header("Location: tak.html");

?>

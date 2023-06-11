<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
// Base files 
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $block = $_POST['block'];

    //Server settings
    $mail->SMTPDebug   = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host        = 'mail.dc-s.kz';                     //Set the SMTP server to send through
    $mail->SMTPAuth    = true;                                   //Enable SMTP authentication
    $mail->Username    = 'info@dc-s.kz';                     //SMTP username
    $mail->Password    = '1qazxsw2';                               //SMTP password
    $mail->SMTPSecure  = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port        = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->CharSet     = "utf-8";
    $mail->SMTPOptions = [ 'ssl' => [ 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true, ] ];
    
    //Recipients
    $mail->setFrom('info@dc-s.kz', 'dc-s.kz');
    $mail->addAddress('info@dc-s.kz', 'dc-s.kz');     //Add a recipient

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Заявка с сайта';
    $mail->Body    = '<p>' .$name . ' оставил заявку. <br/> Телефон: ' .$phone. '<br/> Блок: ' .$block .'</p>';
    $mail->AltBody = '';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
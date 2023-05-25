<?php 

require_once('./phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';


try {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['block'];


    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'yunmei.mailer@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
    $mail->Password = 'angtmxdtnbawyxni'; // Ваш пароль от почты с которой будут отправляться письма
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587; // TCP port to connect to / этот порт может отличаться у других провайдеров

    $mail->setFrom('yunmei.mailer@gmail.com'); // от кого будет уходить письмо?
    $mail->addAddress('oleg.derenko51@gmail.com');     // Кому будет уходить письмо 
    //$mail->addAddress('ellen@example.com');               // Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Заявка с сайта';
    $mail->Body    = '' .$name . ' оставил заявку,телефон ' .$phone. '<br>Блок: ' .$block;
    $mail->AltBody = '';

    $mail->send();

    echo 'sended';

} catch (Exception $e) {
    echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
}
?>
<?php
try {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $mail = $_POST['mail'];
    $classname = $_POST['classname'];
    $textarea = $_POST['textarea'];
    
    

    //Server settings
    $apiToken = "6782488651:AAF7fnwhi5OJN9Wmhm-RGGQlHbre6UhoOmY";

    $data = [
        'chat_id' => '-4014373335',
        'text' => 'Нова заявка з сайта' . PHP_EOL . 'Прізвище та імʼя: ' . ' ' . $name . PHP_EOL  . 'Телефон: ' . ' ' . $phone . PHP_EOL . 'Електронна пошта: ' . ' ' . $mail . PHP_EOL . 'Клас: ' . ' ' . $classname . PHP_EOL . 'Повідомлення чи запитання: ' . ' ' . $textarea,
    ];

    $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );

    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error";
}
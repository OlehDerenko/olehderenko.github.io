<?php
try {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $page = $_POST['page'];

    //Server settings
    $apiToken = "5998803164:AAGpv1fj5sCv14awpNe7sc27zqWh1r8k0cg";

    $data = [
        'chat_id' => '-1001529796245',
        'text' => 'Новая заявка с сайта' . PHP_EOL . 'Имя: ' . '' . $name . PHP_EOL  . 'Телефон: ' . ' ' . $phone . PHP_EOL . 'Адрес: ' . $address . PHP_EOL . 'Сторінка: ' . $page,
    ];

    $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );

    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error";
}
<?php 
header("Access-Control-Allow-Origin: *"); // Em produção, troque '*' pelo dominio do seu site React
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Se for uma requisição OPTIONS (pre-flight), encerra aqui
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Receber e validar os dados
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Nenhum dado recebido"]);
    exit;
}

// Atribuindo as variáveis corretamente baseadas no JSON do React
$pedido_id     = $data['id'] ?? 'N/A';   
$usuario_nome  = $data['nome'] ?? 'Cliente';
$usuario_email = $data['email'] ?? '';

if (empty($usuario_email)) {
    echo json_encode(["success" => false, "message" => "Email do destinatário inválido."]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'abaronesa@tccbaronesapi.cloud';
    $mail->Password   = 'Bananamole2007*'; 
    $mail->SMTPSecure = 'ssl'; 
    $mail->Port       = 465;    
    $mail->CharSet    = 'UTF-8'; 

    $mail->setFrom('abaronesa@tccbaronesapi.cloud', 'A Baronesa Movelaria');
    $mail->addAddress($usuario_email, $usuario_nome);

    $mail->isHTML(true); 
    $mail->Subject = "🎉 Seu Pedido #{$pedido_id} foi confirmado!";
    
    $bodyContent = "
        <div style='font-family: Arial, sans-serif; color: #333;'>
            <h1>Olá, {$usuario_nome}!</h1>
            <p>Temos ótimas notícias.</p>
            <p>Seu pedido <strong>#{$pedido_id}</strong> foi confirmado e já está pronto.</p>
            <hr>
            <p>Obrigado por escolher a Baronesa Movelaria!</p>
        </div>
    ";
    
    $mail->Body    = $bodyContent;
    $mail->AltBody = "Olá {$usuario_nome}, seu pedido {$pedido_id} foi confirmado e está pronto. Obrigado!"; 

    $mail->send();
    
    echo json_encode(["success" => true, "message" => "Email enviado com sucesso!"]);

} catch (Exception $e) {
    http_response_code(500); // Erro interno do servidor
    echo json_encode(["success" => false, "message" => "Erro ao enviar email: {$mail->ErrorInfo}"]);
}

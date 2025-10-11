<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require __DIR__ . '/../vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Resources\Preference;

// Configuração do token
$mpConfig = include 'config/mp.php';
MercadoPagoConfig::setAccessToken($mpConfig['access_token']);

// Recebe dados do front
$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados || !isset($dados['id_pedido']) || !isset($dados['titulo']) || !isset($dados['valor'])) {
    http_response_code(400);
    echo json_encode(["message" => "Campos obrigatórios ausentes"]);
    exit;
}

// Dados da preferência
$preferenceData = [
    "items" => [
        [
            "title" => $dados['titulo'],
            "quantity" => 1,
            "unit_price" => floatval($dados['valor'])
        ]
    ],
    "back_urls" => [
        "success" => "http://localhost/tcc_baronesa/sucesso.php",
        "failure" => "http://localhost/tcc_baronesa/falha.php",
        "pending" => "http://localhost/tcc_baronesa/pendente.php"
    ],
    "auto_return" => "approved",
    "external_reference" => $dados['id_pedido']
];

// Cria a preferência via método estático
$preference = Preference::create($preferenceData);

echo json_encode([
    "id" => $preference->id,
    "public_key" => $mpConfig['public_key']
]);

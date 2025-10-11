<?php
header("Content-Type: application/json; charset=UTF-8");

require __DIR__ . '/../vendor/autoload.php'; // SDK do Mercado Pago
$mpConfig = include __DIR__ . '/config/mp.php';

\MercadoPago\SDK::setAccessToken($mpConfig['access_token']);

include __DIR__ . '/config/database.php';

$body = file_get_contents("php://input");
$evento = json_decode($body, true);

if (isset($evento['type']) && $evento['type'] === 'payment') {
    $payment_id = $evento['data']['id'] ?? null;

    if ($payment_id) {
        // Consulta detalhes do pagamento pelo SDK
        $payment = \MercadoPago\Payment::find_by_id($payment_id);

        if ($payment && $payment->status === 'approved' && !empty($payment->external_reference)) {
            // Atualiza status do pedido no banco
            $stmt = $pdo->prepare("UPDATE pedidos SET status = 'Pago' WHERE id = ?");
            $stmt->execute([$payment->external_reference]);
        }
    }
}

// Retorna OK para o Mercado Pago
http_response_code(200);
echo json_encode(["status" => "ok"]);

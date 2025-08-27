<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");
include 'config/database.php';

$UriReq = trim($_SERVER['REQUEST_URI'], '/');
$path = parse_url($UriReq, PHP_URL_PATH);
$parts = explode('/', $path);

// Último e penúltimo segmento
$last = $parts[count($parts) - 1] ?? null;
$prev = $parts[count($parts) - 2] ?? null;

// Se o último for numérico → é id, se não → é tabela
if (is_numeric($last)) {
    $id = $last;
    $tabela = $prev;
} else {
    $id = null;
    $tabela = $last;
}

$tabelasPermitidas = ['usuarios', 'moveis'];

if (!in_array($tabela, $tabelasPermitidas)) {
    http_response_code(400);
    echo json_encode(["message" => "Tabela inválida", "debug" => $tabela]);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Listar todos
        $stmt = $pdo->query("SELECT * FROM $tabela");
        $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($registros);

    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
        // Excluir
        $stmt = $pdo->prepare("DELETE FROM $tabela WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(["message" => "Registro excluído com sucesso"]);
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Método não permitido"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erro: " . $e->getMessage()]);
}

<?php
header("Access-Control-Allow-Origin: *");
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

$last = $parts[count($parts) - 1] ?? null;
$prev = $parts[count($parts) - 2] ?? null;

if (is_numeric($last)) {
    $id = $last;
    $tabela = $prev;
} else {
    $id = null;
    $tabela = $last;
}

// tabelas que a API permite manipular
$tabelasPermitidas = ['usuarios', 'moveis'];

if (!in_array($tabela, $tabelasPermitidas)) {
    http_response_code(400);
    echo json_encode(["message" => "Tabela inválida", "debug" => $tabela]);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM $tabela WHERE id = ?");
            $stmt->execute([$id]);
            $registro = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($registro) {
                echo json_encode($registro);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Registro não encontrado"]);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM $tabela");
            $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($registros);
        }

    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dados = json_decode(file_get_contents("php://input"), true);
        if (!$dados || !is_array($dados)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos"]);
            exit();
        }

        // se for usuários, tratar senha com hash
        if ($tabela === 'usuarios' && isset($dados['senha'])) {
            $dados['senha'] = password_hash($dados['senha'], PASSWORD_DEFAULT);
        }

        // gerar dinamicamente SQL
        $colunas = array_keys($dados);
        $placeholders = implode(',', array_fill(0, count($colunas), '?'));
        $sql = "INSERT INTO $tabela (" . implode(',', $colunas) . ") VALUES ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_values($dados));

        echo json_encode(["message" => "Registro criado com sucesso", "id" => $pdo->lastInsertId()]);

    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT' && $id) {
        $dados = json_decode(file_get_contents("php://input"), true);
        if (!$dados || !is_array($dados)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos"]);
            exit();
        }

        if ($tabela === 'usuarios' && isset($dados['senha'])) {
            $dados['senha'] = password_hash($dados['senha'], PASSWORD_DEFAULT);
        }

        $colunas = array_keys($dados);
        $sets = implode(',', array_map(fn($c) => "$c = ?", $colunas));
        $sql = "UPDATE $tabela SET $sets WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([...array_values($dados), $id]);

        echo json_encode(["message" => "Registro atualizado com sucesso"]);

    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
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

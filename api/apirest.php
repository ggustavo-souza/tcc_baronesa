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

$tabelasPermitidas = ['usuarios', 'moveis', 'categorias'];

if (!in_array($tabela, $tabelasPermitidas)) {
    http_response_code(400);
    echo json_encode(["message" => "Tabela inválida", "debug" => $tabela]);
    exit();
}

try {
    // ====================== GET ======================
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($tabela === 'moveis') {
            if ($id) {
                // GET por id, incluindo fotos
                $stmt = $pdo->prepare("SELECT * FROM moveis WHERE id = ?");
                $stmt->execute([$id]);
                $movel = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($movel) {
                    $stmt2 = $pdo->prepare("SELECT id, foto, principal FROM moveis_fotos WHERE id_movel = ?");
                    $stmt2->execute([$id]);
                    $movel['fotos'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($movel);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Móvel não encontrado"]);
                }
            } else {
                // GET lista de móveis
                $stmt = $pdo->query("SELECT * FROM moveis ORDER BY id DESC");
                $moveis = $stmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($moveis as &$m) {
                    $stmt2 = $pdo->prepare("SELECT id, foto, principal FROM moveis_fotos WHERE id_movel = ?");
                    $stmt2->execute([$m['id']]);
                    $m['fotos'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                }

                echo json_encode($moveis);
            }
            exit;
        } else {
            // GET padrão para usuarios/categorias
            if ($id) {
                $stmt = $pdo->prepare("SELECT * FROM $tabela WHERE id = ?");
                $stmt->execute([$id]);
                $registro = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($registro ?: []);
            } else {
                $stmt = $pdo->query("SELECT * FROM $tabela");
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            }
        }
    }

    // ====================== POST ======================
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if ($tabela === 'moveis') {
            $nome = $_POST['nome'] ?? null;
            $valor = $_POST['valor'] ?? null;
            $descricao = $_POST['descricao'] ?? null;
            $categoria_id = $_POST['categoria_id'] ?? null;

            $sql = "INSERT INTO moveis (nome, valor, descricao, categoria_id) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$nome, $valor, $descricao, $categoria_id]);
            $idMovel = $pdo->lastInsertId();

            $uploadDir = "uploads/";
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

            if (!empty($_FILES['fotos'])) {
                foreach ($_FILES['fotos']['tmp_name'] as $i => $tmpName) {
                    if ($_FILES['fotos']['error'][$i] === UPLOAD_ERR_OK) {
                        $fileName = uniqid() . "_" . basename($_FILES['fotos']['name'][$i]);
                        $destino = $uploadDir . $fileName;
                        if (move_uploaded_file($tmpName, $destino)) {
                            $principal = ($i === 0) ? 1 : 0;
                            $stmt = $pdo->prepare("INSERT INTO moveis_fotos (id_movel, foto, principal) VALUES (?, ?, ?)");
                            $stmt->execute([$idMovel, $fileName, $principal]);
                        }
                    }
                }
            }

            echo json_encode(["message" => "Móvel criado com sucesso", "id" => $idMovel]);
            exit;
        }

        // Padrão JSON para outras tabelas
        $dados = json_decode(file_get_contents("php://input"), true);
        if (!$dados || !is_array($dados)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos"]);
            exit();
        }

        if ($tabela === 'usuarios' && !empty($dados['senha'])) {
            $dados['senha'] = password_hash($dados['senha'], PASSWORD_DEFAULT);
        }

        $colunas = array_keys($dados);
        $placeholders = implode(',', array_fill(0, count($colunas), '?'));
        $sql = "INSERT INTO $tabela (" . implode(',', $colunas) . ") VALUES ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_values($dados));

        echo json_encode(["message" => "Registro criado com sucesso", "id" => $pdo->lastInsertId()]);
    }

    // ====================== PUT ======================
    elseif ($_SERVER['REQUEST_METHOD'] === 'PUT' && $id) {
        parse_str(file_get_contents("php://input"), $putData);

        if ($tabela === 'moveis') {
            // Se houver $_FILES, atualizar campos e fotos
            $nome = $_POST['nome'] ?? $putData['nome'] ?? null;
            $valor = $_POST['valor'] ?? $putData['valor'] ?? null;
            $descricao = $_POST['descricao'] ?? $putData['descricao'] ?? null;
            $categoria_id = $_POST['categoria_id'] ?? $putData['categoria_id'] ?? null;

            $sql = "UPDATE moveis SET nome = ?, valor = ?, descricao = ?, categoria_id = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$nome, $valor, $descricao, $categoria_id, $id]);

            $uploadDir = "uploads/";
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

            if (!empty($_FILES['fotos'])) {
                foreach ($_FILES['fotos']['tmp_name'] as $i => $tmpName) {
                    if ($_FILES['fotos']['error'][$i] === UPLOAD_ERR_OK) {
                        $fileName = uniqid() . "_" . basename($_FILES['fotos']['name'][$i]);
                        $destino = $uploadDir . $fileName;
                        if (move_uploaded_file($tmpName, $destino)) {
                            $principal = 0; // não sobrescreve a principal
                            $stmt = $pdo->prepare("INSERT INTO moveis_fotos (id_movel, foto, principal) VALUES (?, ?, ?)");
                            $stmt->execute([$id, $fileName, $principal]);
                        }
                    }
                }
            }

            echo json_encode(["message" => "Móvel atualizado com sucesso"]);
            exit;
        }

        // PUT padrão para JSON
        $dados = json_decode(file_get_contents("php://input"), true);
        if (!$dados || !is_array($dados)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos"]);
            exit();
        }

        if ($tabela === 'usuarios') {
            if (!empty($dados['senha'])) $dados['senha'] = password_hash($dados['senha'], PASSWORD_DEFAULT);
            else unset($dados['senha']);
        }

        $colunas = array_keys($dados);
        $sets = implode(',', array_map(fn($c) => "$c = ?", $colunas));
        $sql = "UPDATE $tabela SET $sets WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([...array_values($dados), $id]);

        echo json_encode(["message" => "Registro atualizado com sucesso"]);
    }

    // ====================== DELETE ======================
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM $tabela WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Registro excluído com sucesso"]);
    }

    else {
        http_response_code(405);
        echo json_encode(["message" => "Método não permitido"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erro: " . $e->getMessage()]);
}
 
<?php

    header("Content-Type: application/json; charset=UTF-8");


include 'config/database.php';

$UriReq = trim($_SERVER['REQUEST_URI'], '/');
$parts = explode('/', $UriReq);

$tabela = end($parts);

$tabelasPermitidas = ['usuarios', 'moveis'];

if(in_array($tabela, $tabelasPermitidas))
    try {
        $consultaSql = "SELECT * FROM $tabela";
        $stmt = $pdo->prepare($consultaSql);
        $stmt->execute();

        $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($registros);



        } catch(PDOException $e) {
            http_response_code(500); // Define o código de resposta HTTP como 500 (Erro interno do servidor)
            echo json_encode(array("message" => "Erro na conexão ou na consulta: " . $e->getMessage()));
        }
else {
     http_response_code(400);
     echo json_encode(array("message" => "Tabela inválida ou não especificada: " . $e->getMessage()));
    exit();
}



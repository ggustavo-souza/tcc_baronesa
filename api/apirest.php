<?php

    header("Content-Type: application/json; charset=UTF-8");


include 'config/database.php';
try {
    $tabela = 'usuarios';
    $consultaSql = "SELECT * FROM $tabela";
    $stmt = $pdo->prepare($consultaSql);
    $stmt->execute();

    $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($registros);



    } catch(PDOException $e) {
        // Em caso de erro, retorna uma mensagem de erro em JSON
        http_response_code(500); // Define o código de resposta HTTP como 500 (Erro interno do servidor)
        echo json_encode(array("message" => "Erro na conexão ou na consulta: " . $e->getMessage()));
    }



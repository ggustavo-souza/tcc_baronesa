<?php
// Arquivo: config/database.php
// Este arquivo DEVE definir a variável $pdo, que é uma instância de PDO.
// Configuração usando as suas credenciais:

$host = 'localhost';
$db   = 'baronesa_bd';  // Seu nome de banco de dados
$user = 'root';         // Seu usuário do banco
$pass = '';             // Sua senha (vazia)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    // Lança exceções para erros, o que é ótimo para try/catch
    // Define o fetch padrão para arrays associativos
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    // Desativa a emulação de prepared statements (melhor para segurança)
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     // Conecta ao banco de dados
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     // Em caso de falha na conexão, logamos o erro e retornamos um código 500
     error_log("Erro de conexão com o banco de dados: " . $e->getMessage());
     
     // Retorno padrão de erro JSON para APIs
     http_response_code(500);
     echo json_encode(["status" => "error", "message" => "Internal server error: DB connection failed."]);
     exit;
}
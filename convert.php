<?php
// Allow any origin to fetch this file (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get parameters from browser (with defaults)
$from = isset($_GET['from']) ? strtoupper($_GET['from']) : 'USD';
$to = isset($_GET['to']) ? strtoupper($_GET['to']) : 'GHS';
$amount = isset($_GET['amount']) ? floatval($_GET['amount']) : 1;

// Build API URL
$api_url = "https://api.exchangerate.host/convert?from={$from}&to={$to}&amount={$amount}";

// Fetch API response from ExchangeRate.host
$response = file_get_contents($api_url);

// Check if the API responded
if ($response === FALSE) {
    echo json_encode([
        "success" => false,
        "error" => "Unable to fetch live rates. Try again later."
    ]);
    exit;
}

// Return API response to browser as JSON
echo $response;
?>

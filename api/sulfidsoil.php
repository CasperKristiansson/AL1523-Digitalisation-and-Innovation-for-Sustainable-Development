<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    die("Only POST requests are allowed");
}

require_once "db_credentials.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$location = $_POST["location"] ?? "";
$depth = $_POST["depth"] ?? "";
$type = $_POST["type"] ?? "";
$s = $_POST["s"] ?? "";
$ca = $_POST["ca"] ?? "";
$fe = $_POST["fe"] ?? "";
$ph_init = $_POST["ph_init"] ?? "";
$ph_ox = $_POST["ph_ox"] ?? "";

$query = $conn->prepare("
    INSERT INTO sulfidsoil (location, depth, type, s, ca, fe, ph_init, ph_ox)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$query->bind_param("ssssssss", $location, $depth, $type, $s, $ca, $fe, $ph_init, $ph_ox);
$query->execute();

$conn->close();

http_response_code(200);
echo "OK";


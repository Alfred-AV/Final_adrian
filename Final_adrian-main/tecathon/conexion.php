<?php
$servername = "localhost"; // Cambia esto a tu servidor (localhost generalmente funciona en desarrollo local)
$username = "tu_usuario"; // Usuario de la base de datos
$password = "tu_contraseña"; // Contraseña de la base de datos
$dbname = "nombre_de_tu_base_de_datos"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Ejemplo de consulta
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    // Guardar resultados en un array
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Devolver datos como JSON
echo json_encode($data);

$conn->close();
?>

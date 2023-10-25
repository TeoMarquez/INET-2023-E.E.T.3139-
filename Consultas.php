<?php
if (isset($_GET["provinciaId"])) {
    try {
        include_once 'ConexionBD.php';

        // Obtener el ID de la provincia seleccionada
        $provinciaId = $_GET["provinciaId"];

        // Consulta SQL para obtener los departamentos relacionados con la provincia
        $consultaSQL = "SELECT id, nombre FROM departamentos WHERE provincia_id = :provinciaId";
        $resultado = $pdo->prepare($consultaSQL);
        $resultado->bindParam(":provinciaId", $provinciaId);
        $resultado->execute();

        // Obtener los departamentos como un array
        $departamentos = $resultado->fetchAll(PDO::FETCH_ASSOC);

        // Devolver los departamentos como respuesta JSON
        echo json_encode(['departamentos' => $departamentos]);
    } catch (Exception $e) {
        die("ERROR al cargar departamentos: " . $e->getMessage());
    }
}
?>

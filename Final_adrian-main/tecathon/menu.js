// Recuperar los datos almacenados en localStorage
window.onload = function() {
    const ingresoMensual = localStorage.getItem("ingresoMensual") || "$0.00";
    const cuentaTotal = localStorage.getItem("cuentaTotal") || "$0.00";

    // Mostrar los valores en el HTML
    document.getElementById("ingresoMensual").textContent = `$${parseFloat(ingresoMensual).toLocaleString()}`;
    document.getElementById("cuentaTotal").textContent = `$${parseFloat(cuentaTotal).toLocaleString()}`;

    // Cargar los gastos desde localStorage
    const gastosList = JSON.parse(localStorage.getItem("gastos")) || [];
    actualizarGastos(gastosList);
}

// Función para actualizar la lista de gastos en el HTML
function actualizarGastos(gastosList) {
    const gastosUl = document.getElementById("gastosList");
    gastosUl.innerHTML = ""; // Limpiar la lista de gastos

    gastosList.forEach(gasto => {
        const li = document.createElement("li");
        li.textContent = `${gasto.nombre} - $${gasto.monto.toFixed(2)} (${gasto.tipo})`;
        gastosUl.appendChild(li);
    });
}

// Función para borrar los datos del localStorage y actualizar la página
function borrarDatos() {
    // Eliminar los datos del localStorage
    localStorage.removeItem("ingresoMensual");
    localStorage.removeItem("cuentaTotal");
    localStorage.removeItem("gastos");

    // Actualizar el contenido de la página
    document.getElementById("ingresoMensual").textContent = "$0.00";
    document.getElementById("cuentaTotal").textContent = "$0.00";
    actualizarGastos([]); // Limpiar la lista de gastos

    alert("Datos borrados con éxito.");
}

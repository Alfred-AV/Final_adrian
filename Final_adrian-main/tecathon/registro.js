function guardarDatos() {
    // Obtener valores de los campos de entrada
    const ingreso = document.getElementById("ingreso").value;
    const cuenta = document.getElementById("cuenta").value;

    // Validar que los campos no estén vacíos y que sean números válidos
    if (ingreso === "" || cuenta === "" || isNaN(ingreso) || isNaN(cuenta)) {
        alert("Por favor, ingresa valores numéricos válidos en ambos campos.");
        return;
    }

    // Guardar en localStorage
    localStorage.setItem("ingresoMensual", ingreso);
    localStorage.setItem("cuentaTotal", cuenta);

    // Redirigir a la página del menú
    window.location.href = "menu.html";
}

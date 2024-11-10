document.addEventListener("DOMContentLoaded", function () {
    // Obtener los datos de localStorage
    const ingresoMensual = parseFloat(localStorage.getItem("ingresoMensual")) || 0;
    const cuentaTotal = parseFloat(localStorage.getItem("cuentaTotal")) || 0;

    // Mostrar saldo en la cuenta
    document.getElementById("saldo").textContent = `$${cuentaTotal.toLocaleString()}`;

    // Recuperar los gastos desde el localStorage
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    // Mostrar historial de gastos
    const historialGastos = document.getElementById("historialGastos");
    historialGastos.innerHTML = gastos.map(gasto => `<li>${gasto.nombre} - $${gasto.monto.toLocaleString()}</li>`).join("");

    // Calcular el total de los gastos
    let totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);

    // Calcular el porcentaje de los gastos respecto al ingreso mensual
    let porcentajeGastos = ingresoMensual ? (totalGastos / ingresoMensual) * 100 : 0;
    document.getElementById("porcentajeGastos").textContent = `${Math.round(porcentajeGastos)}%`;

    // Agregar función para agregar una tarjeta
    window.agregarTarjeta = function () {
        const nuevaTarjeta = prompt("Ingrese el número de la nueva tarjeta:");
        if (nuevaTarjeta) {
            document.getElementById("tarjeta").textContent = nuevaTarjeta;
        }
    };

    // Obtener y mostrar los datos de la API de Finazon
    async function obtenerDatosFinazon() {
        try {
            const response = await fetch('https://api.finazon.io/latest/finazon/us_stocks_essential/tickers?page_size=1000&apikey=ce83ad39a7a64b22b1f724a7bd2b610ea6');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();

            console.log(data); // Verificar el contenido de la API en la consola

            const listaDatosFinazon = document.getElementById("datosFinazon");

            // Verificar estructura de datos para obtener las propiedades correctas
            if (data.data && Array.isArray(data.data)) {
                listaDatosFinazon.innerHTML = data.data
                    .slice(0, 10)  // Mostrar solo los primeros 10 resultados
                    .map(stock => {
                        // Cambia los nombres de las propiedades según lo que veas en el console.log(data)
                        return `<li>${stock.symbol || 'N/A'}: ${stock.price || 'N/A'} ${stock.currency || 'N/A'}</li>`;
                    })
                    .join("");
            } else {
                listaDatosFinazon.innerHTML = "<li>Formato de datos inesperado</li>";
            }
        } catch (error) {
            console.error("Error al obtener los datos de Finazon:", error);
            document.getElementById("datosFinazon").innerHTML = "<li>Error al cargar datos financieros</li>";
        }
    }

    obtenerDatosFinazon();

    // Redirigir a analisis.html al hacer clic en el botón de análisis
    window.Analisis = function () {
        window.location.href = "analisis.html";
    };
});

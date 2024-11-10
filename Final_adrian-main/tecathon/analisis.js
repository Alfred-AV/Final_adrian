function mostrarSeguros() {
    const seguroPregunta = document.getElementById("seguroPregunta").value;
    const seguroLista = document.getElementById("seguroLista");

    if (seguroPregunta === "si") {
        seguroLista.classList.remove("oculto");
    } else {
        seguroLista.classList.add("oculto");
    }
}
table
function mostrarInversiones() {
    const inversionPregunta = document.getElementById("inversionPregunta").value;
    const inversionLista = document.getElementById("inversionLista");

    if (inversionPregunta === "si") {
        inversionLista.classList.remove("oculto");
    } else {
        inversionLista.classList.add("oculto");
    }
}

function mostrarCapital() {
    const capitalPregunta = document.getElementById("capitalPregunta").value;
    const capitalLista = document.getElementById("capitalLista");

    if (capitalPregunta === "si") {
        capitalLista.classList.remove("oculto");
    } else {
        capitalLista.classList.add("oculto");
    }
}

function guardarDatos() {
    const seguroPregunta = document.getElementById("seguroPregunta").value;
    const inversionPregunta = document.getElementById("inversionPregunta").value;
    const capitalPregunta = document.getElementById("capitalPregunta").value;

    // Guardar datos de seguros
    let seguros = [];
    if (seguroPregunta === "si") {
        document.querySelectorAll(".seguro-item").forEach((item) => {
            const tipo = item.querySelector(".tipo-seguro").value;
            const monto = parseFloat(item.querySelector(".monto-seguro").value);
            if (!isNaN(monto)) {
                seguros.push({ tipo, monto });
            }
        });
    }

    // Guardar datos de inversiones
    let inversiones = [];
    if (inversionPregunta === "si") {
        document.querySelectorAll(".inversion-item").forEach((item) => {
            const tipo = item.querySelector(".tipo-inversion").value;
            const monto = parseFloat(item.querySelector(".monto-inversion").value);
            if (!isNaN(monto)) {
                inversiones.push({ tipo, monto });
            }
        });
    }

    // Guardar datos de capital
    let capital = [];
    if (capitalPregunta === "si") {
        document.querySelectorAll(".capital-item").forEach((item) => {
            const tipo = item.querySelector(".tipo-capital").value;
            const monto = parseFloat(item.querySelector(".monto-capital").value);
            if (!isNaN(monto)) {
                capital.push({ tipo, monto });
            }
        });
    }

    // Variables con los datos finales
    const datosUsuario = {
        tieneSeguro: seguroPregunta === "si",
        seguros: seguros,
        tieneInversion: inversionPregunta === "si",
        inversiones: inversiones,
        tieneCapital: capitalPregunta === "si",
        capital: capital
    };

    console.log("Datos guardados:", datosUsuario);
    window.location.href = "http://localhost/proyecto_ahorros/analizado.html";
}// Funciones de ordenación y filtrado
function mergeSort(array, key) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left, key), mergeSort(right, key), key);
}

function merge(left, right, key) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft][key] < right[indexRight][key]) {
            result.push(left[indexLeft]);
            indexLeft++;
        } else {
            result.push(right[indexRight]);
            indexRight++;
        }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

function filtrarPorSalario(datos, montoInicial) {
    return datos.filter(item => montoInicial >= item.salario_minimo);
}

// Función principal de guardado de datos
function guardarDatos() {
    const seguroPregunta = document.getElementById("seguroPregunta").value;
    const inversionPregunta = document.getElementById("inversionPregunta").value;
    const capitalPregunta = document.getElementById("capitalPregunta").value;

    // Recopilar y procesar datos de seguros
    let seguros = [];
    if (seguroPregunta === "si") {
        document.querySelectorAll(".seguro-item").forEach((item) => {
            const tipo = item.querySelector(".tipo-seguro").value;
            const monto = parseFloat(item.querySelector(".monto-seguro").value);
            const salario_minimo = 500; // Ejemplo, puedes reemplazar por el valor adecuado
            if (!isNaN(monto)) {
                seguros.push({ tipo, monto, salario_minimo });
            }
        });
    
    seguros = filtrarPorSalario(mergeSort(seguros, 'monto'), montoInicialUsuario);

    // Recopilar y procesar datos de inversiones
    let inversiones = [];
    if (inversionPregunta === "si") {
        document.querySelectorAll(".inversion-item").forEach((item) => {
            const tipo = item.querySelector(".tipo-inversion").value;
            const monto = parseFloat(item.querySelector(".monto-inversion").value);
            const salario_minimo = 1000; // Ejemplo, ajusta según tu lógica
            if (!isNaN(monto)) {
                inversiones.push({ tipo, monto, salario_minimo });
            }
        });
    }
    inversiones = filtrarPorSalario(mergeSort(inversiones, 'monto'), montoInicialUsuario);

    // Recopilar y procesar datos de capital
    let capital = [];
    if (capitalPregunta === "si") {
        document.querySelectorAll(".capital-item").forEach((item) => {
            const tipo = item.querySelector(".tipo-capital").value;
            const monto = parseFloat(item.querySelector(".monto-capital").value);
            const salario_minimo = 1200; // Ejemplo, ajusta según tu lógica
            if (!isNaN(monto)) {
                capital.push({ tipo, monto, salario_minimo });
            }
        });
    }
    capital = filtrarPorSalario(mergeSort(capital, 'monto'), montoInicialUsuario);

    // Resultado final
    const datosUsuario = {
        tieneSeguro: seguroPregunta === "si",
        seguros: seguros,
        tieneInversion: inversionPregunta === "si",
        inversiones: inversiones,
        tieneCapital: capitalPregunta === "si",
        capital: capital
    };

    console.log("Datos guardados:", datosUsuario);
    window.location.href = "http://localhost/proyecto_ahorros/analizado.html";
}

'use strict';

window.onload = function () {

    abrirModal("modalNombre");

    document.getElementById("btnComenzar").onclick = manejarInicioJugador;
    document.getElementById("reiniciar").onclick = iniciarPartida;
    document.getElementById("btnCerrarResultado").onclick = cerrarResultado;
};

function manejarInicioJugador() {
    var nombre = document.getElementById("inputNombre").value;

    if (!validarNombre(nombre)) {
        return;
    }

    cerrarModal("modalNombre");
    iniciarPartida();
}

function cerrarResultado() {
    cerrarModal("modalResultado");
}

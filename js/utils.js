'use strict';

function iniciarJuego() {
    juegoIniciado = true;
    iniciarTemporizador();
}

function iniciarTemporizador() {
    intervaloTiempo = setInterval(function () {
        segundos++;
        document.getElementById("tiempo").textContent = segundos;
    }, 1000);
}

function detenerTemporizador() {
    clearInterval(intervaloTiempo);
}

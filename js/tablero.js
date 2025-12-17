'use strict';

var filas = 8;
var columnas = 8;
var cantidadMinas = 10;

var tablero = [];
var reveladas = 0;
var juegoIniciado = false;
var juegoTerminado = false;   // NUEVO
var intervaloTiempo = null;
var segundos = 0;

/* ============================
   INICIAR PARTIDA
============================ */

function iniciarPartida() {
    detenerTemporizador();
    segundos = 0;
    reveladas = 0;
    juegoIniciado = false;
    juegoTerminado = false;   // NUEVO

    document.getElementById("tiempo").textContent = "0";

    generarTablero();
    colocarMinas();
    calcularNumeros();
    actualizarContadorMinas();
}

/* ============================
   GENERAR TABLERO
============================ */

function generarTablero() {
    var contenedor = document.getElementById("tablero");
    contenedor.innerHTML = "";
    tablero = [];

    var f;
    var c;

    for (f = 0; f < filas; f++) {
        tablero[f] = [];
        for (c = 0; c < columnas; c++) {

            var celda = document.createElement("div");
            celda.className = "celda";
            celda.setAttribute("data-f", f);
            celda.setAttribute("data-c", c);

            celda.oncontextmenu = manejarBandera;
            celda.addEventListener("click", manejarRevelar);

            tablero[f][c] = {
                elemento: celda,
                mina: false,
                numero: 0,
                revelada: false,
                bandera: false
            };

            contenedor.appendChild(celda);
        }
    }
}

/* ============================
   COLOCAR MINAS
============================ */

function colocarMinas() {
    var total = 0;

    while (total < cantidadMinas) {
        var f = Math.floor(Math.random() * filas);
        var c = Math.floor(Math.random() * columnas);

        if (!tablero[f][c].mina) {
            tablero[f][c].mina = true;
            total++;
        }
    }
}

/* ============================
   CALCULAR NUMEROS
============================ */

function calcularNumeros() {
    var dirs = [-1, 0, 1];

    var f, c;
    for (f = 0; f < filas; f++) {
        for (c = 0; c < columnas; c++) {

            if (tablero[f][c].mina) {
                tablero[f][c].numero = -1;
                continue;
            }

            var total = 0;
            var df, dc;

            for (df = 0; df < dirs.length; df++) {
                for (dc = 0; dc < dirs.length; dc++) {

                    if (dirs[df] === 0 && dirs[dc] === 0) continue;

                    var nf = f + dirs[df];
                    var nc = c + dirs[dc];

                    if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas) {
                        if (tablero[nf][nc].mina) total++;
                    }
                }
            }

            tablero[f][c].numero = total;
        }
    }
}

/* ============================
   MANEJAR CLICK IZQUIERDO
============================ */

function manejarRevelar() {

    if (juegoTerminado) return;   // BLOQUE NUEVO

    if (!juegoIniciado) iniciarJuego();

    var f = parseInt(this.getAttribute("data-f"));
    var c = parseInt(this.getAttribute("data-c"));

    revelarCelda(f, c);
}

/* ============================
   MANEJAR CLICK DERECHO
============================ */

function manejarBandera(e) {
    e.preventDefault();

    if (juegoTerminado) return;  // BLOQUE NUEVO

    var f = parseInt(this.getAttribute("data-f"));
    var c = parseInt(this.getAttribute("data-c"));
    var celda = tablero[f][c];

    if (celda.revelada) return;

    celda.bandera = !celda.bandera;
    celda.elemento.textContent = celda.bandera ? "X" : "";

    actualizarContadorMinas();
}

/* ============================
   REVELAR CELDA
============================ */

function revelarCelda(f, c) {
    var celda = tablero[f][c];

    if (celda.revelada || celda.bandera) return;

    celda.revelada = true;
    celda.elemento.classList.add("revelada");

    if (celda.mina) {
        terminarJuego(false);
        return;
    }

    reveladas++;

    if (celda.numero > 0) {
        celda.elemento.textContent = celda.numero;
    } else {
        expandirVacios(f, c);
    }

    if (reveladas === (filas * columnas - cantidadMinas)) {
        terminarJuego(true);
    }
}

/* ============================
   EXPANSION RECURSIVA
============================ */

function expandirVacios(f, c) {
    var dirs = [-1, 0, 1];
    var df, dc;

    for (df = 0; df < dirs.length; df++) {
        for (dc = 0; dc < dirs.length; dc++) {

            if (dirs[df] === 0 && dirs[dc] === 0) continue;

            var nf = f + dirs[df];
            var nc = c + dirs[dc];

            if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas) {
                var adj = tablero[nf][nc];
                if (!adj.revelada && !adj.mina) {
                    revelarCelda(nf, nc);
                }
            }
        }
    }
}

/* ============================
   CONTADOR DE MINAS
============================ */

function contarBanderas() {
    var f, c;
    var total = 0;

    for (f = 0; f < filas; f++) {
        for (c = 0; c < columnas; c++) {
            if (tablero[f][c].bandera) total++;
        }
    }
    return total;
}

function actualizarContadorMinas() {
    var restante = cantidadMinas - contarBanderas();
    document.getElementById("contadorMinas").textContent = restante;
}

/* ============================
   TERMINAR JUEGO
============================ */

function terminarJuego(gano) {

    juegoTerminado = true;   // NUEVO

    detenerTemporizador();

    var msg = gano ? "Ganaste la partida" : "Pisaste una mina";
    document.getElementById("mensajeResultado").textContent = msg;

    abrirModal("modalResultado");
}

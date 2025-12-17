'use strict';

function abrirModal(id) {
    document.getElementById(id).classList.remove("oculto");
}

function cerrarModal(id) {
    document.getElementById(id).classList.add("oculto");
}

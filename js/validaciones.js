'use strict';

function validarNombre(valor) {
    return /^[a-zA-Z]{3,}$/.test(valor);
}

function validarContacto() {

    var nombre = document.getElementById("nombre").value;
    var mail = document.getElementById("mail").value;
    var mensaje = document.getElementById("mensaje").value;

    var esNombre = /^[a-zA-Z0-9 ]{3,}$/.test(nombre);
    var esMail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(mail);
    var esMensaje = mensaje.length > 5;

    return esNombre && esMail && esMensaje;
}

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector("input-container-error").innerHTML = "";

    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector("input-container-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12. Mayusculas, minusculas y numeros"

    },
    nacimiento: {
        valueMissing: "Este campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años",

    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros",

    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres",

    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",

    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres",

    },




};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error])
            mensaje = mensajesDeError[tipoDeInput][error];
    })

}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    if (!mayorDeEdad(fechaCliente)) {

        let mensaje = "Debes tener al menos 18 años para registrarte";

        input.setCustomValidity(mensaje)
    }

}
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return (diferenciaFechas <= fechaActual);


}
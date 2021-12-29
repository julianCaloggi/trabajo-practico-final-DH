const email = document.querySelector("#email");
const password = document.querySelector("#user_password");

//PARA CAMBIO DE COLOR EN ERRORES
const input = document.querySelector(
  "section .contentbx .formbx .inputbx input"
);

//MUESTRA LOS ERRORES y ARREGLO DE CSS PARA LA MUESTRAS DE ERRORES
const ulErrores = document.querySelector("div.hidden");
ulErrores.style.color = "red";
ulErrores.style.listStyle = "none";
ulErrores.style.padding = "5px 0px";

email.focus();

const form = document.querySelector("form.formu");
form.addEventListener("submit", function (event) {
  const errors = dataIsValid();
  if (errors.length > 0) {
    event.preventDefault();
    ulErrores.classList.remove("hidden");
    ulErrores.innerHTML = "";

    for (const error of errors) {
      ulErrores.innerHTML += `<li>${error}<li>`;
    }
  } else {
    ulErrores.classList.add("hidden");
    ulErrores.innerHTML = "";
  }
});

function dataIsValid() {
  let errors = [];

  //VALIDACIONES DEL EMAIL Y CONFIRMACION SI ES UN EMAIL
  errors.push(
    dataConfirm(email, isEmpty, "*El campo email no puede estar vacio")
  );
  errors.push(confirmEmail(email, "*El email debe de ser valido"));

  //VALIDACIONES DEL CONTRASEÑA Y LARGO
  errors.push(
    dataConfirm(password, isEmpty, "*El campo contraseña no puede estar vacio")
  );
  errors.push(
    maxLength(
      password,
      8,
      "*La contraseña debe tener un minimo de ocho caracteres"
    )
  );

  return errors.filter((msg) => msg != null);
}

/////////////////// FUNCIONES DE VALIDACIONES ////////////////////////

//AVERIGUA SI EL VALOR DE LOS INPUT ESTAN VACIOS
function isEmpty(input) {
  return input.value.trim() == "";
}

//AVERIGUA SI CUMPLE CON LA CONDICION MINIMA DE LETRAS
function maxLength(input, min, msg) {
  if (input.value.length < min) {
    input.style.border = "1px solid #ff0000";
    return msg;
  } else {
    input.style.border = "1px solid #00ff00";
  }
}

//AVERIGUA SI CUMPLE CON LOS REQUISITOS O NO
function dataConfirm(input, validationFunction, msg) {
  if (validationFunction(input)) {
    input.style.border = "1px solid #ff0000";
    return msg;
  } else {
    input.style.border = "1px solid #00ff00";
  }
}

//AVERIGUA SI LO QUE HAY EN EL EMAIL ES UN EMAIL
function confirmEmail(input, msg) {
  if (
    input.value ==
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  ) {
    return msg;
  }
}

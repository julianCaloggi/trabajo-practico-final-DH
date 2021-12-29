const firstName = document.querySelector("#first_name");
const lastName = document.querySelector("#last_name");
const email = document.querySelector("#email");
const avatar = document.querySelector("#avatar");
const password = document.querySelector("#user_password");
const Repeat_password = document.querySelector("#Repeat_password");
const idCategorie = document.querySelector("#idCategorie");
const birth_date = document.querySelector("#birth_date");

//PARA CAMBIO DE COLOR EN ERRORES
const input = document.querySelector(
  "section .contentbx .formbx .inputbx input"
);
//
firstName.focus();
//MUESTRA LOS ERRORES y ARREGLO DE CSS PARA LA MUESTRAS DE ERRORES
const ulErrores = document.querySelector("div.hidden");
ulErrores.style.color = "red";
ulErrores.style.listStyle = "none";
ulErrores.style.padding = "5px 0px";

//SELECCION DEL FORMULARIO
const form = document.querySelector("form.reservation");

form.addEventListener("submit", (event) => {
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

  //VALIDACIONES DEL NOMBRE Y LARGO
  errors.push(
    dataConfirm(firstName, isEmpty, "*El campo nombre no puede estar vacio")
  );
  errors.push(
    maxLength(firstName, 2, "*El nombre debe tener un minimo de dos letras")
  );

  //VALIDACIONES DEL APELLIDO Y LARGO
  errors.push(
    dataConfirm(lastName, isEmpty, "*El campo apellido no puede estar vacio")
  );
  errors.push(
    maxLength(
      lastName,
      2,
      "*El apellido debe tener un minimo de dos caracteres"
    )
  );

  //VALIDACION DE CATEGORIA
  //errors.push(confirmCheck(idCategorie, "*Seleccione una o mas categorias"));

  //VALIDACION DEL CUMPLEAÑOS
  errors.push(
    dataConfirm(
      birth_date,
      isEmpty,
      "*El campo fecha de nacimiento no puede estar vacio"
    )
  );

  //VALIDACIONES DEL EMAIL Y CONFIRMACION SI ES UN EMAIL
  errors.push(
    dataConfirm(email, isEmpty, "*El campo email no puede estar vacio")
  );
  errors.push(confirmEmail(email, "*El email debe de ser valido"));

  //VALIDACION DE FORMATO DE IMAGEN
  // errors.push(
  //   confirmIMG(avatar, "*Su avatar debe ser en formato JPG, JPEG, PNG, GIF")
  // );

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
  //VALIDACIONES DE REPETIR CONTRASEÑA Y LARGO
  errors.push(
    dataConfirm(
      Repeat_password,
      isEmpty,
      "*El campo repetir contraseña no puede estar vacio"
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

//VALIDACION PARA FORMATOS DE IMAGENES (mirar)
function confirmIMG(avatar, msg) {
  if (avatar.value != "JPG, JPEG, PNG, GIF") {
    return msg;
  }
}

//VALIDACION CHECKBOX DE CATEGORIA (mirar)
function confirmCheck(input, msg) {
  if (input.value != 1 || input.value != 2 || (input.value != 1 && 2)) {
    return msg;
  }
}

document.querySelector("#event_name").focus();
const form = document.querySelector("#formulario form");

const event_name = document.querySelector("#event_name");
const idProvince = document.querySelector("#idProvince");
const idLocations = document.querySelector("#idLocations");
const event_address = document.querySelector("#event_address");
const event_date = document.querySelector("#event_date");
const start_time = document.querySelector("#start_time");
const end_time = document.querySelector("#end_time");
const price = document.querySelector("#price");
const event_description = document.querySelector("#event_description");
const more_info = document.querySelector("#more_info");
const banner = document.querySelector("#banner");

const errorList = document.querySelector("#errors");

const requiredInputs = [
  event_name,
  idProvince,
  idLocations,
  event_address,
  event_date,
  start_time,
  end_time,
  price,
  event_description,
  more_info,
  banner,
];

form.addEventListener("submit", (e) => {
  const errors = formIsInvalid();
  if (errors.length > 0) {
    console.log("Form Invalid");
    e.preventDefault();

    errorList.classList.remove("hidden");

    errorList.innerHTML = "";
    for (const error of errors) {
      errorList.innerHTML += `<li>${error}<li>`;
    }
  } else {
    errorList.classList.add("hidden");
    errorList.innerHTML = "";
  }
});

function formIsInvalid() {
  let errors = [];

  errors.push(
    validateInput(event_name, isEmpty, "El nombre no puede estar vacío")
  );
  errors.push(
    validateInput(idProvince, isEmpty, "Debe seleccionar una provincia")
  );
  errors.push(
    validateInput(idLocations, isEmpty, "Debe seleccionar una localidad")
  );
  errors.push(
    validateInput(event_address, isEmpty, "Escriba la dirección del evento")
  );
  errors.push(
    validateInput(
      event_date,
      isEmpty,
      "Debe seleccionar una fecha para su evento"
    )
  );
  errors.push(
    validateInput(start_time, isEmpty, "Debe configurar un horario de inicio")
  );
  errors.push(
    validateInput(
      end_time,
      isEmpty,
      "Debe configurar un horario final (Estimativo)"
    )
  );
  errors.push(validateInput(price, isEmpty, "El precio no puede quedar vacío"));
  errors.push(
    validateInput(
      event_description,
      isEmpty,
      "La descripción no puede quedar vacía"
    )
  );
  errors.push(
    validateInput(more_info, isEmpty, "Aproveche a escribir mas información")
  );
  errors.push(
    validateInput(banner, isEmpty, "Debe seleccionar una imagen para su evento")
  );

  if (price.value <= 0) {
    price.classList.add("is-invalid");
    errors.push("El precio no puede ser un numero negativo");
  } else {
    price.classList.remove("is-invalid");
    price.classList.add("is-valid");
  }

  return errors.filter((msg) => msg != null);
}

function isEmpty(input) {
  return input.value.trim() == "";
}

function validateInput(input, validationFuntion, message) {
  if (validationFuntion(input)) {
    input.classList.add("is-invalid");
    return message;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return null;
  }
}

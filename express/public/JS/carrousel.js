const imagenes = [
  "imagenes/imagen-fondo-usuario-2.jpg",
  "imagenes/imagen-fondo-usuario-3.jpg",
  "imagenes/imagen-fondo-usuario-4.jpg",
  "imagenes/imagen-fondo-usuario-5.jpg",
];
const cont = 0;

function carrousel(contenedor) {
  contenedor.addEventListener("click", (e) => {
    const atras = contenedor.querySelector(".atras"),
      adelante = contenedor.querySelector(".adelante"),
      img = contenedor.querySelector("img"),
      tgt = e.target;

    if (tgt == atras) {
      if (cont > 0) {
        img.src = imagenes[cont - 1];
        cont--;
      } else {
        img.src = imagenes[imagenes.length - 1];
        cont = imagenes.length - 1;
      }
    } else if (tgt == adelante) {
      if (cont > 0) {
        img.src = imagenes[cont - 1];
        cont--;
      } else {
        img.src = imagenes[imagenes.length - 1];
        cont = imagenes.length - 1;
      }
    }
  });
}

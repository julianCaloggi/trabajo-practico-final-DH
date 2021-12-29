const fs = require("fs");
const path = require("path");

let eventsFilePath = path.join(__dirname, "../data/eventDataBase.json");
let events = JSON.parse(fs.readFileSync(eventsFilePath, "utf-8"));

//Importar DB como importabamos el json
// const db = require("../database/models");

const eventService = {
  filterByID(id) {
    const event = events.find((event) => {
      return event.id == id;
    });
    return event;
  },

  filterByStatus() {
    const openEvents = events.filter((event) => {
      return event.estado == "open";
    });
    return openEvents;
  },

  save() {
    fs.writeFileSync(eventsFilePath, JSON.stringify(events));
  },

  // CreatOneEvent(payload, img) {
  //   const lastEvent = events[events.length - 1];
  //   const biggestEventId = events.length > 0 ? lastEvent.id : 1;
  //   const event = {
  //     ...payload,
  //     id: biggestEventId + 1,
  //     precio: Number(payload.precio),
  //     banner: img ? img.filename : "evento1.jpg",
  //     estado: "open",
  //   };

  //   events.push(event);
  //   this.save();
  // },

  EditOneEvent(id, payload, img) {
    const editEvent = this.filterByID(id);

    editEvent.nombre = payload.nombre;
    editEvent.provincia = payload.provincia;
    editEvent.localidad = payload.localidad;
    editEvent.direccion = payload.direccion;
    editEvent.fecha = payload.fecha;
    editEvent.horaI = payload.horaI;
    editEvent.horaF = payload.horaF;
    editEvent.precio = Number(payload.precio);
    editEvent.banner = img ? img.filename : editEvent.banner;
    editEvent.descripcion = payload.descripcion;
    editEvent.masInformacion = payload.masInformacion;
    this.save();
  },
};

module.exports = eventService;

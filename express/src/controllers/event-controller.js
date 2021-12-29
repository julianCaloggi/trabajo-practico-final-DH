const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

//--------------DataBase.Json---------------------------//
// const eventService = require("../services/events-services");
const db = require("../database/models");

module.exports = {
  search: async (req, res) => {
    const events = await db.Event.findAll({
      include: [{ association: "location", include: "province" }],
      where: {
        event_name: { [Op.like]: `%${req.query.event_name}%` },
        // province: {
        //   [Op.like]: `%${req.query.event.location.province.province}%`,
        // },
        //Ver documentacion de los operadores para buscar por fecha y la relacion de las tablas
        // location.locations: { [Op.like]: `%${req.query.locations}%` },
        // event_date: { [Op.like]: `%${req.query.event_date}%` },
        event_date: {
          [Op.startsWith]: `%${req.query.event_date}`,
        },
      },
    });

    if (events.length > 0) {
      res.render("events", { events });
    } else {
      res.send("eventos no encontrados");
    }
  },
  index: async (req, res) => {
    //filterByStatus
    // const openEvents = eventService.filterByStatus();
    // res.render("events", { openEvents });
    const events = await db.Event.findAll({
      include: [{ association: "location", include: "province" }],
      where: { eventOpen: 1 },
    });

    res.render("events", { events });
  },

  //controlador de EventDetail
  detail: async (req, res) => {
    //filterByID
    // const event = eventService.filterByID(req.params.id);

    const event = await db.Event.findByPk(req.params.id, {
      include: [{ association: "location", include: "province" }],
    });
    res.render("events/EventDetail", { event });
  },

  //controladores de CreateEvent
  creatEvent: async (req, res) => {
    const provinces = await db.Province.findAll();
    const locations = await db.Location.findAll();

    res.render("events/CreateEvent", { provinces, locations });
  },

  storeEvent: async (req, res) => {
    //validaciones del usuario al ingresar informacion
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("events/CreateEvent", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    //CreatOneEvent
    // eventService.CreatOneEvent(req.body, req.file);
    await db.Event.create({
      ...req.body,
      eventOpen: 1,
      banner: req.file ? req.file.filename : "evento1.jpg",
      idUser: 49,
    });

    res.redirect("/Evento");
  },

  //controladores de EditEvent
  edit: async (req, res) => {
    //filterByID
    const event = await db.Event.findByPk(req.params.id);
    const provinces = await db.Province.findAll();
    const locations = await db.Location.findAll();
    res.render("events/EditEvent", { event, provinces, locations });
  },

  update: async (req, res) => {
    //eventService.EditOneEvent(req.params.id, req.body, req.file);
    await db.Event.update(
      {
        ...req.body,
        banner: req.file ? req.file.filename : "evento1.jpg",
      },
      { where: { id: req.params.id } }
    );
    res.redirect("/Evento");
  },

  delete: async (req, res) => {
    //filterByID
    //const event = eventService.filterByID(req.params.id);
    //DeleteOneEvent
    //event.estado = "close";
    //Save
    //eventService.save();
    await db.Event.update(
      {
        eventOpen: 0,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.redirect("/Evento");
  },
  //controlador del EventCart
  carrito: (req, res) => {
    res.render("events/EventCart");
  },
};

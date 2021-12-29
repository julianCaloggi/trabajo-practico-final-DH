const { Event } = require("../../src/database/models");

const PAGE_SIZE = 10;

module.exports = {
  list: async (req, res) => {
    const page = Number(req.query.page) || 0;
    const offset = page * PAGE_SIZE;
    const { count, rows } = await Event.findAndCountAll(
      { include: [{ association: "location", include: "province" }] },
      {
        order: [["id", "ASC"]],
        offset: offset,
        limit: PAGE_SIZE,
      }
    );

    rows.map((event) => {
      event.dataValues.Location = event.location.locations;
      event.dataValues.Province = event.location.province.province;
      event.dataValues.Url = "http://localhost:3000/api/events/" + event.id;
      event.dataValues.BannerUrl =
        "http://localhost:3000/imagenes/Eventos/" + event.banner;
      delete event.dataValues.idLocations;
      delete event.dataValues.location;
      delete event.dataValues.idUser;
      delete event.dataValues.created_at;
      delete event.dataValues.updated_at;
    });

    res.json({
      meta: {
        status: 200,
        total: count,
        page: page,
        pageSize: PAGE_SIZE,
        nextUrl:
          offset + PAGE_SIZE < count
            ? `http://localhost:3000/api/events?page=${page + 1}`
            : null,
        prevUrl:
          page > 0 ? `http://localhost:3000/api/events?page=${page - 1}` : null,
      },
      data: rows,
    });
  },
  detail: async (req, res) => {
    const event = await Event.findByPk(req.params.id, {
      include: [{ association: "location", include: "province" }],
    });

    event.dataValues.Location = event.location.locations;
    event.dataValues.Province = event.location.province.province;
    event.dataValues.BannerUrl =
      "http://localhost:3000/imagenes/Eventos/" + event.banner;
    delete event.dataValues.idLocations;
    delete event.dataValues.location;
    delete event.dataValues.idUser;
    delete event.dataValues.created_at;
    delete event.dataValues.updated_at;

    if (event) {
      res.json({
        meta: {
          status: 200,
          url: "http://localhost:3000/api/events/" + req.params.id,
        },
        data: event,
      });
    } else {
      res.json({
        meta: {
          status: 404,
          url: "http://localhost:3000/api/events/" + req.params.id,
        },
        data: `No se encontró el evento con id: ${req.params.id}`,
      });
    }
  },
  create: async (req, res) => {
    const newEvent = await Event.create(req.body);

    res.send({
      meta: {
        status: 201,
        url: "api/events",
      },
      data: newEvent,
    });
  },
  destroy: async (req, res) => {
    const deleteEvent = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("API destroy");
  },
};

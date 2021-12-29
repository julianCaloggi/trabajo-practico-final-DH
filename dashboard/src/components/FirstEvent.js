import React, { Component } from "react";

const URL = "/api/events";

class FirstEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  render() {
    if (!this.state.events) {
      return <p className="text-center">Cargando empleados...</p>;
    }

    return (
      <div className="contenedor_evento">
        <div className="div_primer evento">
          <div className="imagen_evento">
            <img
              className="imagen_de_evento"
              src={this.state.events.BannerUrl}
              alt=""
            />
          </div>
          <div className="infromacion_evento">
            <p className="info_evento">
              Nombre : {this.state.events.event_name}
            </p>
            <p className="info_evento">
              Provincia : {this.state.events.Province}
            </p>
            <p className="info_evento">
              Localidad : {this.state.events.Location}
            </p>
            <p className="info_evento">
              Direccion : {this.state.events.event_address}
            </p>
            <p className="info_evento">
              Fecha : {this.state.events.event_date}
            </p>
            <p className="info_evento">
              Hora de inicio : {this.state.events.start_time}
            </p>
            <p className="info_evento">
              Hora de finalizacion : {this.state.events.end_time}
            </p>
            <p className="info_evento">
              Precio de entrada : {this.state.events.price}
            </p>
            <p className="info_evento">
              Descripcion del evento : {this.state.events.event_description}
            </p>
            <p className="info_evento">
              Mas informacion : {this.state.events.more_info}
            </p>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.fetchEvents();
  }

  async fetchEvents() {
    const result = await fetch(URL);
    const response = await result.json();
    const events = response.data;

    const lastEvent = events.pop();

    this.setState({ events: lastEvent });
  }
}

export default FirstEvent;

import React, { Component } from "react";

const URL = "/api/events";

class EventsCards extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  render() {
    if (!this.state.events) {
      return <p className="text-center">Cargando empleados...</p>;
    }

    return (
      <div className="listaEvento">
        {this.state.events.map((events) => {
          return (
            <div className="tarjeta_evento">
              <div className="img_lista_event">
                <img className="img_e" src={events.BannerUrl} alt="" />
              </div>
              <div className="info_e">
                <p className="tarjeta_info_e">Nombre: {events.event_name}</p>
                <p className="tarjeta_info_e">Provincia: {events.Province}</p>
                <p className="tarjeta_info_e">Localidad: {events.Location}</p>
                <p className="tarjeta_info_e">Precio:{events.price}</p>
              </div>
            </div>
          );
        })}
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

    this.setState({ events: events });
  }
}
export default EventsCards;

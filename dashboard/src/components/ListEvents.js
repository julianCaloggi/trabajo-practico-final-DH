import React, { Component } from "react";

const URL = "/api/events";

class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  render() {
    if (!this.state.events) {
      return <p className="text-center">Cargando empleados...</p>;
    }

    return (
      <div className="lista_de_eventos">
        {this.state.events.map((events) => {
          return (
            <p className="p_event">
              <p className="p_info">Nombre : {events.event_name}</p>
              <p className="p_info">Direccion : {events.event_address}</p>
              <p className="p_info">Fecha : {events.event_date}</p>
              <p className="p_info">Hora de inicio : {events.start_time}</p>
              <p className="p_info">Hora de finalizacion : {events.end_time}</p>
              <p className="p_info">Precio de entrada : {events.price}</p>
              <p className="p_info">
                Descripcion del evento : {events.event_description}
              </p>
              <p className="p_info">Mas informacion : {events.more_info}</p>
            </p>
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
export default ListEvents;

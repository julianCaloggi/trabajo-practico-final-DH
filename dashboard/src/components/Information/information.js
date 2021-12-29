import React, { Component } from "react";

const URL = "/api/users";
const URLEVENTS = "/api/events";

class information extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.state = { events: [] };
  }

  render() {
    if (!this.state.users) {
      return <p className="text-center">Cargando empleados...</p>;
    }

    return (
      <div className="contenedor_info">
        <div className="cuadrado_total">
          <div className="contenedor_usuarios">
            <p className="lec_info">
              Actualmente hay : {this.state.users.total} Usuarios
            </p>
          </div>
          <div className="contenedor_eventos">
            <p className="lec_info">
              Actualmente hay : {this.state.events.total} Eventos
            </p>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this.fetchUsers();
    this.fetchEvents();
  }

  async fetchUsers() {
    const result = await fetch(URL);
    const response = await result.json();
    const users = response.meta;
    this.setState({ users: users });
  }

  async fetchEvents() {
    const result = await fetch(URLEVENTS);
    const response = await result.json();
    const events = response.meta;
    this.setState({ events: events });
  }
}
export default information;

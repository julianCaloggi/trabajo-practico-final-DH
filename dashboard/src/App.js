import WelcomeTitle from "./components/WelcomeTitle/WelcomeTitle";
import Information from "./components/Information/information";
import UsersAndEvent from "./components/UsersAndEvents/UsersAndEvent";
import EventsInfo from "./components/EventsInfo/EventsInfo";

function App() {
  return (
    <div className="secion_info">
      <WelcomeTitle title="Bienvenido al panel de información" />
      <Information />
      <UsersAndEvent />
      <EventsInfo />
    </div>
  );
}

export default App;

import Backdrop from "./components/Backdrop/Backdrop";
import Events from "./components/Events/Events";

function App() {
  return (
    <div className="App">
      <Backdrop>
        <Events />
      </Backdrop>
    </div>
  );
}

export default App;

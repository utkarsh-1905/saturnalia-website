import Backdrop from "./components/Backdrop/Backdrop";
import Events from "./components/Events/Events";
import Sponsors from "./components/Sponsors/Sponsors";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Backdrop>
        <Events />
        <Sponsors />
        <Footer />
      </Backdrop>
    </div>
  );
}

export default App;

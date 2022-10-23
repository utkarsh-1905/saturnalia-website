import Backdrop from "./components/Backdrop/Backdrop";
import Landing from "./Pages/Landing";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Navbar from "./components/Navbar";
import Events from "./components/Events/Events";
import Sponsors from "./components/Sponsors/Sponsors";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Backdrop>
        <Landing />
        {/* <Events /> */}
        {/* <Sponsors /> */}
        <Footer />
      </Backdrop>
      <Navbar />
    </div>
  );
}

export default App;

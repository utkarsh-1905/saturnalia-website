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
      <Parallax pages={2} style={{ top: "0", left: "0" }}>
        <ParallaxLayer offset={0} speed={17}>
          <Landing />
        </ParallaxLayer>
      </Parallax>
      <Backdrop>
        <Events />
        <Sponsors />
        <Footer />
      </Backdrop>
      <Navbar />
    </div>
  );
}

export default App;

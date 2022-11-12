import Backdrop from "./components/Backdrop/Backdrop";
import Landing from "./Pages/Landing";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Navbar from "./components/Navbar";
import Events from "./components/Events/Events";
import Sponsors from "./components/Sponsors/Sponsors";
import Footer from "./components/Footer/Footer";
import Highlights from "./components/Highlights/Highlights";
import ContactUsMain from "./components/ContactUs/ContactUsmain";

function App() {
  return (
    <div className="App">
      <Backdrop>
        <section id="landing">
          <Landing />
        </section>
        <section id="highlights">
          <Highlights />
        </section>
        <section id="events">
          <Events />
        </section>
        {/* <section id="sponsor">
          <Sponsors />
        </section> */}
        <section id="contact-us">{/* <ContactUsMain /> */}</section>
        <Footer />
      </Backdrop>
      <Navbar />
    </div>
  );
}

export default App;

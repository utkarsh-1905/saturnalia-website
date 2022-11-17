import Backdrop from "./components/Backdrop/Backdrop";
import Landing from "./Pages/Landing";
import Navbar from "./components/Navbar";
import Events from "./components/Events/Events";
import Sponsors from "./components/Sponsors/Sponsors";
import Footer from "./components/Footer/Footer";
import Highlights from "./components/Highlights/Highlights";
import ContactUsMain from "./components/ContactUs/ContactUsmain";
import { Routes, Route } from "react-router-dom";
import EmailVerified from "./components/email-verified/index";
import Loader from "./components/Loader/loader";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/verification" element={<EmailVerified />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route
          path="/"
          exact
          element={
            <>
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
                <section id="contact-us">
                  <ContactUsMain />
                </section>
                <Footer />
              </Backdrop>
              <Navbar />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

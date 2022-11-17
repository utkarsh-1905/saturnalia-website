import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Snackbar,
  Tab,
  Tabs,
  Typography,
  Modal,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { useCookies } from "react-cookie";
import axios from "axios";
import EventModal from "../EventModal";
import Navbar from "../Navbar";
import logo from "../../assets/bhoot.svg";
import zIndex from "@mui/material/styles/zIndex";
import { setLocale } from "yup";
import { Groups } from "@mui/icons-material";

const Dashboard = () => {
  const [tabs, setTabs] = useState(1);
  const [cookie, setCookie] = useCookies(["authToken"]);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (cookie.authToken) {
        (async () => {
          const evts = await axios.get(
            "https://api.saturnaliatiet.com/event/all/",
            {
              headers: {
                Authorization: "Token " + cookie.authToken,
                "Content-Type": "application/json",
              },
            }
          );
          const team = await axios.get(
            "https://api.saturnaliatiet.com/event/teams-joined/",
            {
              headers: {
                Authorization: "Token " + cookie.authToken,
                "Content-Type": "application/json",
              },
            }
          );
          setTeams(team.data);
          setEvents(evts.data);
        })();
      } else {
        setShowError(true);
        setErrors({
          type: "error",
          message: "You need to login first to view this page!",
        });
        setTimeout(() => {
          setShowError(false);
          setErrors({});
        }, 3000);
      }
    } catch (err) {
      setShowError(true);
      setErrors({
        type: "error",
        message: "Something went wrong!",
      });
      setTimeout(() => {
        setShowError(false);
        setErrors({});
      }, 3000);
    }
  }, []);

  return (
    <Box>
      <Backdrop />
      <Container>
        <Tabs
          value={tabs}
          sx={{
            marginTop: 3,
            ["@media (max-width: 768px)"]: {
              marginTop: 15,
              zIndex: 1000,
            },
          }}
          onChange={(e, n) => {
            setTabs(n);
          }}
          variant="fullWidth"
        >
          <Tab label="My Events" sx={{ color: "white" }} value={1} />
          <Tab label="My Teams" sx={{ color: "white" }} value={2} />
          {/* <Tab label="Create Team" sx={{ color: "white" }} value={3} /> */}
          {/* <Tab label="Join Team" sx={{ color: "white" }} value={4} /> */}
          <Tab label="Payment Details" sx={{ color: "white" }} value={5} />
        </Tabs>
        {tabs === 1 && (
          <>
            <h2 style={{ color: "white", letterSpacing: "0.5rem" }}>
              REGISTERED EVENTS
            </h2>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
                padding: 1,
                marginTop: 3,
                marginBottom: 3,
              }}
            >
              {events.map((event) => {
                if (event.is_registered) {
                  return (
                    <>
                      <Card
                        sx={{
                          maxWidth: 300,
                          marginBottom: 2,
                          background: "gray",
                        }}
                        key={event.id}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={event.image}
                          alt={event.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {event.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.description.substring(0, 75) + "..."}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => {
                              setOpenModal(true);
                              setModalEvent(event);
                            }}
                          >
                            Rules
                          </Button>
                        </CardActions>
                      </Card>
                    </>
                  );
                }
              })}
            </Container>
          </>
        )}
        {tabs === 2 && (
          <>
            {teams &&
              teams.map((team) => {
                return (
                  <Container
                    sx={{
                      mt: 4,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Card
                      sx={{
                        maxWidth: 300,
                        marginBottom: 2,
                        // background: "gray",
                      }}
                      key={team.key}
                    >
                      <CardContent>
                        {team.amount_paid ? (
                          <Typography
                            gutterBottom
                            variant="body2"
                            align="left"
                            component="div"
                          >
                            <Alert severity="success">
                              Registered successfully !! (Amount Paid)
                            </Alert>
                          </Typography>
                        ) : (
                          <Typography
                            gutterBottom
                            variant="body2"
                            align="left"
                            component="div"
                          >
                            <Alert severity="warning">
                              Registered successfully !! (Amount Pending)
                            </Alert>
                          </Typography>
                        )}
                        <Typography gutterBottom variant="h5" component="div">
                          {team.event_name.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mb: 2 }}
                          color="text.secondary"
                        >
                          {team.team_name.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="left"
                        >
                          Team Members
                        </Typography>
                        <ul>
                          {team.members.map((member, index) => {
                            if (index === 0) {
                              return (
                                <li style={{ textAlign: "left" }}>
                                  {member} (Leader)
                                </li>
                              );
                            } else {
                              return (
                                <li style={{ textAlign: "left" }}>{member}</li>
                              );
                            }
                          })}
                        </ul>
                        <Typography variant="body1" align="center">
                          Your team code - {team.key}
                        </Typography>
                        {/* Implement delete team */}
                      </CardContent>
                    </Card>
                  </Container>
                );
              })}
          </>
        )}
        {tabs === 5 && (
          <>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ color: "white", letterSpacing: "0.5rem" }}>
                PAYMENT DETAILS
              </h1>
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                padding: 3,
                marginTop: 3,
                marginBottom: 3,
                background: "#ffffff11",
                ["@media (max-width: 768px)"]: {
                  flexDirection: "column",
                },
                // width: "65%"
              }}
            >
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: 800,
                }}
              >
                <img
                  src={logo}
                  style={{
                    maxWidth: "60vw",
                  }}
                  alt="Payment Details"
                />
              </Container>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingTop: 15,
                  ["@media (max-width: 768px)"]: {
                    paddingTop: 3,
                  },
                }}
              >
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    color: "white",
                    fontSize: "1.2rem",
                    margin: 1,
                    padding: 1,
                  }}
                >
                  <b>Account Number:&nbsp;&nbsp;</b>
                  <em>40507372828</em>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    color: "white",
                    fontSize: "1.2rem",
                    margin: 1,
                    padding: 1,
                  }}
                >
                  <b>IFSC Code:&nbsp;&nbsp;</b>
                  <em>SBIN0050244</em>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    color: "white",
                    fontSize: "1.2rem",
                    margin: 1,
                    padding: 1,
                  }}
                >
                  <div>
                    <b>(50244) - PATIALA, THAPAR INSTITUTE</b>
                  </div>
                  <div
                    style={{ textAlign: "left", marginTop: 3, marginBottom: 3 }}
                  >
                    THAPAR INSTITUTE OF ENGINEERING AND TECHNOLOGY
                  </div>
                  PUNJAB - 147001
                </Container>
              </Container>
            </Container>
          </>
        )}
      </Container>
      {showError && (
        <Snackbar open={showError}>
          <Alert severity={errors.type}>{errors.message}</Alert>
        </Snackbar>
      )}
      {modalEvent && (
        <EventModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalEvent={modalEvent}
        />
      )}
      <Navbar />
    </Box>
  );
};

export default Dashboard;

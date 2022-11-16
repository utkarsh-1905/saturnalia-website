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
  const [openJoinTeamModal, setOpenJoinTeamModal] = useState({
    status: false,
    code: null,
  });
  const [joinTeamCode, setJoinTeamCode] = useState(null);

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
          setEvents(evts.data);
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
          console.log(teams);
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

  async function joinTeam() {
    setLoading(true);
    console.log(joinTeamCode);
  }

  return (
    <Box>
      <Backdrop />
      <Container>
        <Tabs
          value={tabs}
          sx={{ marginTop: 3 }}
          onChange={(e, n) => {
            setTabs(n);
          }}
          variant="fullWidth"
        >
          <Tab label="My Events" sx={{ color: "white" }} value={1} />
          <Tab label="My Teams" sx={{ color: "white" }} value={2} />
          <Tab label="Create Team" sx={{ color: "white" }} value={3} />
          <Tab label="Join Team" sx={{ color: "white" }} value={4} />
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
        {tabs === 2 && <></>}
        {tabs === 4 && (
          <>
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
                if (
                  event.is_registered &&
                  event.is_team_event &&
                  !event.is_member
                ) {
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
                              setOpenJoinTeamModal({
                                status: true,
                                code: event.id,
                              });
                            }}
                          >
                            Join Team
                          </Button>
                        </CardActions>
                      </Card>
                    </>
                  );
                }
              })}
            </Container>
            <Modal
              open={openJoinTeamModal.status}
              closeModal={() =>
                setOpenJoinTeamModal({ status: false, code: null })
              }
            >
              <Container>
                <Typography align="center" variant="h5">
                  Enter Team Code
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setJoinTeamCode(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={joinTeam}
                >
                  {loading ? <CircularProgress color="inherit" /> : "Join Team"}
                </Button>
              </Container>
            </Modal>
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

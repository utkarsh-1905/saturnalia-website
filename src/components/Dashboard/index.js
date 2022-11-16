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
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { useCookies } from "react-cookie";
import { Grid } from "swiper";
import axios from "axios";

const Dashboard = () => {
  const [tabs, setTabs] = useState(1);
  const [cookie, setCookie] = useCookies(["authToken"]);
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    maxHeight: 500,
    // bgcolor: "background.paper",
    backgroundColor:
      "linear-gradient(180deg, #1C1C1C 0%, rgba(18, 18, 18, 0.65) 100%)",
    boxShadow: 24,
    p: 2,
    overflow: "scroll",
    overflowX: "hidden",
  };

  useEffect(() => {
    try {
      if (cookie.authToken) {
        (async () => {
          const res = await axios.get(
            "https://api.saturnaliatiet.com/event/all/",
            {
              headers: {
                Authorization: "Token " + cookie.authToken,
                "Content-Type": "application/json",
              },
            }
          );
          setEvents(res.data);
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

  // useEffect(() => {
  //   console.log(modalEvent);
  // }, [modalEvent]);

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
      </Container>
      {showError && (
        <Snackbar open={showError}>
          <Alert severity={errors.type}>{errors.message}</Alert>
        </Snackbar>
      )}
      {modalEvent && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Paper sx={modalStyle}>
            <img
              src={modalEvent?.image}
              alt={modalEvent?.name}
              style={{ maxWidth: "100%", textAlign: "center" }}
            />
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
              {modalEvent?.name}
            </Typography>
            <Typography variant="body1" textAlign="justify">
              {modalEvent?.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Date: {modalEvent?.date}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Time: {modalEvent?.time}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Venue: {modalEvent?.venue}
            </Typography>
            {modalEvent?.is_team_event && (
              <>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Max Team Size: {modalEvent?.max_team_size}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Min Team Size: {modalEvent?.min_team_size}
                </Typography>
              </>
            )}
            {modalEvent?.rules && (
              <>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Rules:{" "}
                  <ul>
                    {modalEvent?.rules.map((rule) => {
                      return <li>{rule}</li>;
                    })}
                  </ul>
                </Typography>
              </>
            )}
          </Paper>
        </Modal>
      )}
    </Box>
  );
};

export default Dashboard;

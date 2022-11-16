import React from "react";
import styles from "./styles.module.scss";
import { Modal, Paper, Container, Typography, Grid } from "@mui/material";
import { LocationOn, CalendarMonth, AccessTime } from "@mui/icons-material";

const EventModal = ({ openModal, setOpenModal, modalEvent }) => {
  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: {
      sm: 1000,
      md: 900,
    },
    minWidth: 300,
    maxHeight: 500,
    background:
      "linear-gradient(180deg, #171717 0%, rgba(58, 54, 54, 0.62) 100%)",
    borderRadius: "13px",
    boxShadow: 24,
    p: 2,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    color: "white",
    backdropFilter: "blur(5px)",
    webkitBackdropFilter: "blur(5px)",
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          sx={{
            ...modalStyle,
          }}
          className={styles.paperModal}
        >
          <Typography
            align="center"
            className={styles.showMobile}
            variant="h4"
            sx={{ mt: 2, mb: 2 }}
          >
            {modalEvent?.name}
          </Typography>
          <Container
            sx={{
              width: "90%",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={modalEvent?.image}
              alt={modalEvent?.name}
              style={{ maxWidth: "100%", textAlign: "center" }}
            />
            <Container>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  mt: 3,
                }}
              >
                <Grid item xs={12} md={6}>
                  <CalendarMonth /> {modalEvent?.date}
                </Grid>
                <Grid item xs={12} md={6}>
                  <AccessTime /> {modalEvent?.time}
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocationOn /> {modalEvent?.venue}
                </Grid>
              </Grid>
            </Container>
          </Container>
          <Container
            sx={{
              maxHeight: "100%",
              position: "relative",
            }}
          >
            <div
              style={{ overflowY: "scroll", maxHeight: 500 }}
              className={styles.scrollBox}
            >
              <Typography
                align="center"
                className={styles.hideMobile}
                variant="h4"
                sx={{ mt: 2, mb: 2 }}
              >
                {modalEvent?.name}
              </Typography>
              <Typography variant="body1" textAlign="left">
                {modalEvent?.description}
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
            </div>
          </Container>
        </Paper>
      </Modal>
    </>
  );
};

export default EventModal;

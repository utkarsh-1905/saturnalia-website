import React, { useState } from 'react'
import {
    Modal,
    Box,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Button,
    FormHelperText,
    Alert,
    Snackbar,
    Tab,
    Tabs,
  } from "@mui/material";
  import modalStyles from "./modal.module.scss";
  import * as yup from "yup";

function TeamRegForm({open, close, event}) {
  const [teamData, setTeamData] = useState({});
  const [joinTeamData, setJoinTeamData] = useState({});
  const [tabs, setTabs] = useState(1);
  const createTeam = () => {
    console.log(teamData);
  }
  const joinTeam = () => {
    console.log(joinTeamData);
  }
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    backgroundColor:
      "linear-gradient(180deg, #1C1C1C 0%, rgba(18, 18, 18, 0.65) 100%)",
    boxShadow: 24,
    p: 4,
  };
  if(open){
    return (
        <div className={modalStyles.container}>
            <Modal open={open} onClose={() => close(false)}>
            <Box
                sx={modalStyle}
                style={{
                    background:
                    "linear-gradient(180deg, #1C1C1C 0%, rgba(18, 18, 18, 0.65) 100%)",
                    color: "#fff",
                }}
            >
                <Tabs
                    value={tabs}
                    onChange={() => {
                    if (tabs === 1) {
                        setTabs(2);
                    } else {
                        setTabs(1);
                    }
                    }}
                    variant="fullWidth"
                    indicatorColor="info"
                    textColor="primary"
                >
                    <Tab label="Create Team" sx={{ color: "white" }} value={1} />
                    <Tab label="Join Team" sx={{ color: "white" }} value={2} />
                </Tabs>
                {tabs === 1 && (
                    <Box>
                        <form>
                            <TextField
                                variant="outlined"
                                label="Team Name"
                                type="string"
                                required
                                sx={{
                                width: "100%",
                                marginBottom: 2,
                                marginTop: 2,
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                }}
                                onChange={(e) =>
                                setTeamData({ ...teamData, name: e.target.value })
                                }
                            />
                            <TextField
                                variant="outlined"
                                label={event.min_team_size ? "Team Size: " + event.min_team_size + " - " + event.max_team_size : "Team Size"}
                                type="password"
                                required
                                sx={{
                                width: "100%",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                }}
                                onChange={(e) =>
                                setTeamData({ ...teamData, members_count: e.target.value })
                                }
                            />
                            <Button
                                variant="contained"
                                sx={{ marginTop: "1rem", width: "100%" }}
                                onClick={() => createTeam()}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                )}
                {tabs === 2 && (
                    <Box>
                        <form>
                            <TextField
                                variant="outlined"
                                label="Team Code"
                                type="string"
                                required
                                sx={{
                                width: "100%",
                                marginBottom: 2,
                                marginTop: 2,
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                }}
                                onChange={(e) =>
                                setJoinTeamData({key: e.target.value })
                                }
                            />
                            <Button
                                variant="contained"
                                sx={{ marginTop: "1rem", width: "100%" }}
                                onClick={() => joinTeam()}
                            >
                                Join Team
                            </Button>
                        </form>
                    </Box>
                )} 
            </Box>
        </Modal>
        </div>
    )}else{
        return null;
    }
}

export default TeamRegForm
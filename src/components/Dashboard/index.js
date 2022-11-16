import { Box, Tab, Tabs } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [tabs, setTabs] = useState(1);
  const [cookie, setCookie] = useCookies(["authToken"]);
  return (
    <Box>
      <Backdrop />
      <Container>
        <Tabs
          value={tabs}
          sx={{ marginTop: 3 }}
          onChange={setTabs}
          variant="fullWidth"
        >
          <Tab label="My Events" sx={{ color: "white" }} value={1} />
          <Tab label="My Teams" sx={{ color: "white" }} value={2} />
          <Tab label="Create Team" sx={{ color: "white" }} value={3} />
          <Tab label="Join Team" sx={{ color: "white" }} value={4} />
        </Tabs>
        <p>{cookie.authToken}</p>
      </Container>
    </Box>
  );
};

export default Dashboard;

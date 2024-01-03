import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box, Paper, Typography } from "@mui/material";
import BreadCrumb from "./BreadCrumb";

const Dashboard = () => {
  const breadcrumbs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Site', path: '/tabledata' },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />

      <Box
        sx={{
          height: "100vh",
          bgcolor: "lavenderblush",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "80vh",
            width: "90vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", 
              justifyContent: "flex-start", 
              alignItems: "flex-start", 
              paddingLeft: "16px", 
              // border:"10px solid black"
            }}
          >
            {/* Site Management text */}
            <Typography>
              Site Management
            </Typography>

            {/* Breadcrumbs */}
            <BreadCrumb breadcrumbs={breadcrumbs} activeElement={breadcrumbs[0].name} />
          </Box>

          <Paper
            elevation={4}
            sx={{
              height: "100%",
              padding: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>Dashboard</Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

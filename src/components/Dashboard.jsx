import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import DynamicBreadcrumb from './DynamicBreadcrumb'

const Dashboard = () => {
    const isSideBarPinned = false;
    const isOpenforGridTable = false;
    const breadcrumbs = [
        { name: 'Dashboard', path: '/' },
      ];
      

  return (
    <>
        <Navbar />
      <Sidebar />
         <Box
        sx={{
          height: "100vh",
          bgcolor: "#f1f1f1",
          display: "flex",
          flexGrow: 1,
          px: 3,
          pl:'4em'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}></Grid>
         
          <Grid item xs={12} md={12} lg={12}>
          <Box sx={{flexGrow:1, display:"flex", justifyContent:'space-between', mb:'2em', gap:2,}}>
            <Box>
            <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
            </Box>
            </Box>
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                overflowX: "hidden",
                flexDirection: "column",
                // bgcolor:'orange',
                maxWidth: isSideBarPinned
                  ? isOpenforGridTable
                    ? "83.5vw"
                    : "95.5vw"
                  : "95.5vw",
                flexGrow: 1,
                minHeight: "75vh",
                // pb: "0.5em",
              }}
            >
                <Typography sx={{fontSize:'50px', fontWeight:600, color:'#4F4F4F'}}> DASHOBOARD</Typography>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Dashboard
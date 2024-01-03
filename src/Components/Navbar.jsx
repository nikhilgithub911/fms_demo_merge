import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";
import nkc from "../assets/nkc.png";
import MuiAppBar from "@mui/material/AppBar";


const AppBar = styled(
    MuiAppBar,
    {}
  )(({ theme }) => ({
    zIndex: theme.zIndex.modal + 5,
  }));

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgb(255,255,255)",
        background:
          "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(95,59,143,1) 100%)",
        height: "3.39em",
      }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1em", 
            }}
          >
            <img
              src={nkc}
              alt="Logo"
              style={{
                height: "3em",
                marginRight: "1em",
                marginBottom: "1em",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              mb: "1em",
              marginRight: "1em", 
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle sx={{ fontSize: "38px" }} />
              </IconButton>

              <Typography
                sx={{ color: "white", fontSize: "13px", fontWeight: 700 }}
              >
                NKC
              </Typography>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "flex",
                  color: "#ffffff",
                  position: "relative",
                  bgcolor: "orange",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                },
              }}
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <LogoutIcon sx={{ fontSize: "30px" }} />
              </IconButton>

              <Typography
                sx={{ color: "white", fontSize: "13px", fontWeight: 700 }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RoomIcon from "@mui/icons-material/Room";
import { Link } from "react-router-dom";

const drawerWidth = 245;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} - 15px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} - 15px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: theme.zIndex.modal + 1,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav({ open: propOpen, onClose }) {
// export default function Sidenav() {
  const [open, setOpen] = useState(false);

  const toggleSidebarOpenOnHover = () => {
    setOpen(true);
  };

  const toggleSidebarCloseOnHover = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        onMouseEnter={toggleSidebarOpenOnHover}
        onMouseLeave={toggleSidebarCloseOnHover}
        onClose={toggleSidebarCloseOnHover}
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#47217a",
            color: "#ffffff",
          },
        }}
      >
        
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/tabledata" 
              sx={{
                minHeight: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2.5,
                mt: 7,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RoomIcon sx={{ color: "yellow", ml: 1 }} />
              </ListItemIcon>
              <ListItemText
                primary="Site Management"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

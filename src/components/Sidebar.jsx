import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import Groups3Icon from "@mui/icons-material/Groups3";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const drawerWidth = 240;

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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
//   const { userRole, activeListItem, isSideBarPinned, setIsSideBarPinned, isHoverOpen, setIsHoverOpen, isOpenforGridTable, setIsOpenForGridTable } =
//     useAuth();

const navigate = useNavigate()


  const [isSideBarSettings, setIsSideBarSettings] = useState(false)

  const theme = useTheme();
//   const navigate = useNavigate();
// const [open, setOpen] = useState(!propOpen);
const [open, setOpen] = useState(false);

  const activeListBgColor = "#2A3550";
  const inactiveListBgColor = "#141b2d";

  const handleSelectListItem = (route) => {
    navigate(route);
  };

//   useEffect(() => {
//     setIsOpenForGridTable(open)
//   }, [open])

//   useEffect(() => {
//     setOpen(!propOpen);

//   }, [propOpen]);

//   let pintext = "";
//   if (isSideBarPinned) {
//     pintext = "Unpin Sidebar";
//   } else {
//     pintext = "Pin Sidebar";
//   }

//   const handleChangeIsSideBarPinnedValue = () => {
//     if (isSideBarPinned) {
//       sessionStorage.setItem("isSideBarPinned", "false");
//       setIsSideBarPinned(false);

//       // setIsSideBar(true)
//     } else {
//       // If the current value is anything other than 'true', set it to 'true'
//       sessionStorage.setItem("isSideBarPinned", "true");
//       setIsSideBarPinned(true);
//       // setIsSideBar(true)
//     }
//   };

//   const handleChangeIsHoverOpen = () => {
//     if (isHoverOpen) {
//       sessionStorage.setItem("isHoverOpen", "false");
//       setIsHoverOpen(false);

//       // setIsSideBar(true)
//     } else {
//       // If the current value is anything other than 'true', set it to 'true'
//       sessionStorage.setItem("isHoverOpen", "true");
//       setIsHoverOpen(true);
//       // setIsSideBar(true)
//     }
//   };

  const toggleSidebarOpenOnHover = () => {
    setOpen(true)
  }

  const toggleSidebarCloseOnHover = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: "flex", }}>
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
            // boxShadow: isSideBarPinned ? '' : "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add this line for shadow
            // elevation: isSideBarPinned ? '' : 5,
          },
        }}
      >
        <DrawerHeader>
          {/* <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <List>

              <ListItem
                disablePadding
                // sx={{
                //   display: "block",
                //   bgcolor:
                //     activeListItem === "/empdashboard"
                //       ? activeListBgColor
                //       : inactiveListBgColor,
                //       '&:hover': {
                //         bgcolor:'#5E6985'
                //       },
                // }}
                onClick={() => handleSelectListItem("/vehiclelist")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DirectionsCarIcon sx={{ color: "#81d3cf", }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Vehicle List"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
   
        </List>
      </Drawer>
    </Box>
  );
}

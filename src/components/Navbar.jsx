import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  Popover,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { InputAdornment } from "@mui/material";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircle from "@mui/icons-material/AccountCircle";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreIcon from "@mui/icons-material/MoreVert";
// import { useNavigate } from "react-router-dom";
import Logo from '../data/Picsart_23-12-22_11-16-36-964.png'
const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 5,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar({ toggleSidebar }) {



//   const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
//   const { logout, autoStatusChange, setAutoStatusChange, bellItemChanged, setBellItemChanged, activeListItem, isOpenforGridTable } = useAuth();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isSUPERADMIN, setIsSUPERADMIN] = useState(false);
  const [isRECEPTIONIST, setIsRECEPTIONIST] = useState(false)

  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const [bellMenu, setBellMenu] = useState(false);
  const [bellMenuItem, setBellMenuItem] = useState([]);
  const [isBellVisible, setIsBellVisible] = useState(false);
  const [bellBadgeCount, setBellBadgeCount] = useState();
  const [ isHamburgerAllowed, setIsHamburgerAllowed] = useState(true)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false)



  const compLogo = {
    backgroundImage: `url(${Logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
    setIsProfileMenuOpen(true)
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleOpenBellMenu = (event) => {
    setBellAnchorEl(event.currentTarget);
    setBellMenu(true);
    setIsNotificationPopupOpen(true)
  };

  const handleCloseBellMenu = () => {
    setBellAnchorEl(null);
    setBellMenu(false);
    setIsNotificationPopupOpen(false)
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false)
    // handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileOpen = () => {
    // navigate("/profile");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      elevation={2}
      sx={{
        // zIndex:1500,
        // overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: "3.2em",
        // bgcolor:'red'
        // mr: "7em",
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
  

<Box
            sx={{
              // display:'flex',
              display: {xs: 'flex', sm:'flex', md:'none'},
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              mb:'0.5em',
              // bgcolor:'red'
              userSelect:'none',
            }}
          >
            <Typography
              component={"span"}
              sx={{
                // fontSize: { xs: "17px", sm: "20px" },
                fontSize:'19px',
                fontWeight:'600'
                
              }}
            >
              {/* {formData.firstName} {formData.lastName} */}
            </Typography>
            <Typography
              component={"span"}
              sx={{
                fontSize:'15px'
              }}
            >
              {/* ({loggedUserRole}) */}
            </Typography>
          </Box>

            <MenuItem
              key="profileMenuItem"
              onClick={handleProfileOpen}
              sx={{
                height: "2em",
                fontSize: "15px",
              }}
            >
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <PersonIcon />
              </IconButton>
              <Typography sx={{ paddingLeft:'1.2em' ,width:'100%', textAlign:'center' }}>Profile</Typography>
            </MenuItem>,
            <hr key="profileMenuDivider" />,


      <MenuItem
        // onClick={}
        sx={{
          height: "2em",
          fontSize: "15px",
        }}
      >
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SyncLockIcon />
        </IconButton>
        <Typography 
        sx={{ paddingLeft: "1.2em", width:'100%', textAlign:'center' }}
        >Change Password</Typography>
      </MenuItem>
      <hr />
      <MenuItem
        // onClick={}
        sx={{
          height: "2em",
          fontSize: "15px",
        }}
      >
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>

        <Typography sx={{ paddingLeft:'1.2em' ,width:'100%', textAlign:'center' }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          // edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          // onClick={handleLogout}
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <Typography>Notifications</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
      <MenuItem 
    //   onClick={}
      >
        <IconButton
          size="large"
          // edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          // onClick={handleLogout}
          color="inherit"
          // sx={{mr:'1em'}}
        >
          <LogoutIcon />
        </IconButton>
        <Typography>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={4} sx={{ background: 'rgb(255,255,255)',
background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(95,59,143,1) 100%)', height:'3em' }}>
        <Toolbar>
          <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
          }}>
                   <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px', marginBottom:'1em' }} />
          </Box>


          <Box sx={{ flexGrow: 1,
             bgcolor:'cyan',
              minWidth:'12em',
               }} />

          <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            // bgcolor:'red',
            gap:5,
            mb:"1em",
          }}>
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "flex",
                color: "#ffffff",
                position: "relative",
                bgcolor:'orange',
                flexDirection:'row',
                alignItems:'center',
                gap:2
              },
            }}
          >


            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
            //   onClick={isProfileMenuOpen? handleMenuClose : handleProfileMenuOpen}
              color="inherit"
  
            >
              <AccountCircle sx={{ fontSize: "38px" }} />
            </IconButton>

            <Typography sx={{color:'white', fontSize:'13px', fontWeight:700}}>NKC</Typography>
          </Box>

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "flex",
                color: "#ffffff",
                position: "relative",
                bgcolor:'orange',
                flexDirection:'row',
                alignItems:'center',
                gap:2,
              },
            }}
          >


            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
            //   onClick={isProfileMenuOpen? handleMenuClose : handleProfileMenuOpen}
              color="inherit"
  
            >
              <LogoutIcon sx={{ fontSize: "30px" }} />
            </IconButton>

            <Typography sx={{color:'white', fontSize:'13px', fontWeight:700}}>Logout</Typography>
          </Box>
           </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}

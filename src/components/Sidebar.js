import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Home from './Home';
import Dashboard from './Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import Users from './Users/Users';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { signOut } from '../actions/action';
import swal from 'sweetalert';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menudata, setMenudata] = React.useState('Dashboard');
  const dispatch = useDispatch();
  const navigate = useNavigate('/dashboard')
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dataRes = useSelector((state) => state).LoginReducer;
  const loginUserInfo = JSON.parse(localStorage.getItem('user-info'))
  const [checkClicked, setCheckClicked] = React.useState(false)
  
  if(checkClicked === true){
    localStorage.removeItem('user-info')
    localStorage.removeItem('token')
    navigate('/')
  }
  const LogOut = () => {
    dispatch(signOut())
    setCheckClicked(true)
  }
  const data = JSON.parse(localStorage.getItem('user-info'));
  let lists = []
  if(loginUserInfo.role_id === 3){
    lists = [{
      text:"Dashboard",
      to:"/dashboard"
    },{
      text:"Event",
      to:"/event"
    },{
      text:"Users",
      to:"/users"
    },{
      text:"Role",
      to:"/role"
    },{
      text:"Register Event",
      to:"/register-event"
    }]
  }else if(loginUserInfo.role_id === 1){
    lists = [{
      text:"Event",
      to:"/event"
    },{
      text:"Register Event",
      to:"/register-event"
    }]
  }else{
    lists = [{
      text:"Event",
      to:"/event"
    },{
      text:"Register Event",
      to:"/register-event"
    }]
  }

  const roleArr = {"1":"organizer", "2":"Registants", 3:"Admin"}
  
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Event Registration System <span style={{"marginLeft":"500px"}}>{loginUserInfo.first_name +' '+loginUserInfo.last_name}</span><span style={{"marginLeft":"20px", "marginRight":"20px"}}>{roleArr[loginUserInfo.role_id]}</span> <Link><span onClick={LogOut}>Logout</span></Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
          {lists.map((data,index) => {
              return <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={()=>setMenudata(`${data.text}`)}>
                <ListItemButton onClick={()=>navigate(`${data.to}`)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                  {data.text=== 'Event' && <EventIcon />}
                  {data.text=== 'Dashboard' && <DashboardIcon />}
                  {data.text=== 'Users' && <GroupIcon />}
                  {data.text=== 'Home' && <HomeIcon />}
                  {data.text=== 'Role' && <PersonIcon />}
                  {data.text === 'Register Event' && <AppRegistrationIcon />}
                  </ListItemIcon>
                  <ListItemText primary={data.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
          })}
          </List>
          <Divider />
          
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          
                {/* {menudata == 'Dashboard' && <Dashboard />} */}
                {/* {menudata == 'Home' && <Home />} */}
        </Box>
      </Box>
    </>
  );
}
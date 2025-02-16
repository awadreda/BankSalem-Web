import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentsIcon from '@mui/icons-material/Payments';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PeopleIcon from '@mui/icons-material/People';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogOut from '../LogOut/LogOut';
import { Typography } from '@mui/material';
import { useAppSelector, useAppDispatch  } from '../../hooks';
import { GetCurrentUserIDFromLocalStorage } from '../../Global/CurrentUserAndClent';
import { User } from '../../Types/types';
import { useEffect } from 'react';
import { getCurrentUserByID } from '../../features/Users/UsersSlice';
const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Clients', icon: <PeopleIcon />, path: '/dashboard/clients' },
  { text: 'Transactions', icon: <PaymentsIcon />, path: '/dashboard/transactions' },
  { text: 'Logs History', icon: <HistoryIcon />, path: '/dashboard/logs' },
  { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/dashboard/admin' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
  { text: 'ATM', icon: <LocalAtmIcon />, path: '/dashboard/atm' },
  // { text: 'Log Out', icon: <LogoutIcon />, path: '/logout' }, 

];

export default function SideBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:950px)');
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentUserID = GetCurrentUserIDFromLocalStorage();
  const currentUser = useAppSelector((state) => state.users.CurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(currentUserID) {
      dispatch(getCurrentUserByID(parseInt(currentUserID)));
    }
  }, [currentUser]);
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', mt: 8 }}>
      <Typography variant="h6" align="center" sx={{ fontWeight: "bold",fontSize: "1.5rem", mb: 2, color: "white" }}>
        {currentUser?.firstName} {currentUser?.lastName} 
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                margin: '4px 8px',
                borderRadius: '8px',
                padding: '8px 16px',
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: 2, 
            display: { sm: 'block' },
            position: 'fixed',
            top: '1.5rem',
            left: '1rem',
            zIndex: 1200,
            backgroundColor: '#1a237e',
            '&:hover': {
              backgroundColor: '#2a337e'
            }
          }}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1a237e',
            color: 'white',
          },
        }}
      >
        {drawer}
        <LogOut />
      </Drawer>
    </>
  );
}

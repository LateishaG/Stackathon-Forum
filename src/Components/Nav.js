import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import {
  AppBar,
  Button,
  IconButton,
  Container,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Link,
  Tooltip,
  Typography,
  Avatar,
  Icon
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = ev => {
    setAnchorElNav(ev.currentTarget);
  };
  const handleOpenUserMenu = ev => {
    setAnchorElUser(ev.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' }
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  component={RouterLink}
                  underline='none'
                  to='/'
                >
                  Home
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Icon
            sx={{ mr: 1, width: 56, height: 56 }}
            component='img'
            src='/static/universe.png'
            title='created by Icongeek26'
          />
          <Typography
            variant='h6'
            noWrap
            href='/'
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: { xs: 1, sm: 0 },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Universal Dialog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <Button
              component={RouterLink}
              sx={{ my: 2, color: 'white', display: 'block' }}
              to='/'
            >
              Topics
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Account settings'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  src={
                    auth.id
                      ? auth.imgUrl
                      : 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  component={RouterLink}
                  underline='none'
                  to='/login'
                >
                  Login
                </Link>
              </MenuItem>

              {!!auth.id && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component='button'
                    underline='none'
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
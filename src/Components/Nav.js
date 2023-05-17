import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import BadgedAvatar from './BadgedAvatar';
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
} from '@mui/material/';
import { Menu as MenuIcon } from '@mui/icons-material/';

const Nav = () => {
  const { auth, topics } = useSelector(state => state);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
    <AppBar
      position='static'
      sx={{ maxWidth: 'xl' }}
    >
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
              {topics.map(topic => {
                return (
                  <MenuItem
                    key={topic.id}
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      component={RouterLink}
                      underline='none'
                      to={`/t/${topic.name}`}
                    >
                      {topic.name}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Icon
            sx={{ mr: 1, width: 48, height: 48 }}
            component='img'
            src='/static/universe.png'
            title='created by Icongeek26'
          />

          <Typography
            variant='h6'
            noWrap
            component={RouterLink}
            to='/'
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
            {topics.map(topic => {
              return (
                <Button
                  key={topic.id}
                  component={RouterLink}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  to={`/t/${topic.name}`}
                >
                  {topic.name}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Account settings'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <BadgedAvatar
                  id={auth.id}
                  imageUrl={auth.avatar}
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
              {!auth.id && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component={RouterLink}
                    underline='none'
                    to='/login'
                  >
                    Login / Sign Up
                  </Link>
                </MenuItem>
              )}

              {!!auth.id && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component={RouterLink}
                    underline='none'
                    to={`/profile/${auth.id}`}
                  >
                    Profile
                  </Link>
                </MenuItem>
              )}

              {!!auth.id && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    component={RouterLink}
                    underline='none'
                    to={'/friends'}
                  >
                    Friends
                  </Link>
                </MenuItem>
              )}

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

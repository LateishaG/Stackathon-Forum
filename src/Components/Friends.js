import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFriend, removeFriend } from '../store';
import { Link as RouterLink } from 'react-router-dom';
import BadgedAvatar from './BadgedAvatar';
import {
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Typography,
  Tooltip
} from '@mui/material';

import { PersonRemove, PersonAdd, PersonOff } from '@mui/icons-material';

const Friend = () => {
  const { friends, auth } = useSelector(state => state);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  const changeTab = (ev, index) => {
    setTab(index);
  };

  const accept = id => {
    dispatch(updateFriend({ id, status: 'CONFIRMED', ignored: false }));
  };

  const ignore = id => {
    dispatch(updateFriend({ id, ignored: true }));
  };

  const remove = id => {
    dispatch(removeFriend(id));
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={changeTab}
        centered
      >
        <Tab label='Friends' />
        <Tab label='Pending' />
        <Tab label='Ignored' />
      </Tabs>
      <Box>
        {tab === 0 && (
          <List>
            {friends
              .filter(friend => friend.friend.status === 'CONFIRMED')
              .map(friend => {
                return (
                  <ListItem key={friend.id}>
                    <ListItemAvatar>
                      <BadgedAvatar
                        id={friend.id}
                        imageUrl={friend.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography
                        variant='body2'
                        component={RouterLink}
                        sx={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        to={`/profile/${friend.id}`}
                      >
                        {friend.username}
                      </Typography>
                    </ListItemText>
                    <Tooltip title='Remove'>
                      <ListItemButton onClick={() => remove(friend.friend.id)}>
                        <PersonRemove color='secondary' />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
          </List>
        )}
        {tab === 1 && (
          <List>
            {friends
              .filter(
                friend =>
                  friend.friend.status === 'PENDING' &&
                  !friend.friend.ignored &&
                  friend.friend.friendingId === auth.id
              )
              .map(friend => {
                return (
                  <ListItem key={friend.id}>
                    <ListItemAvatar>
                      <BadgedAvatar
                        id={friend.id}
                        imageUrl={friend.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography
                        variant='body2'
                        component={RouterLink}
                        sx={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        to={`/profile/${friend.id}`}
                      >
                        {friend.username}
                      </Typography>
                    </ListItemText>
                    <Tooltip title='Accept'>
                      <ListItemButton onClick={() => accept(friend.friend.id)}>
                        <PersonAdd color='secondary' />
                      </ListItemButton>
                    </Tooltip>
                    <Tooltip title='Ignore'>
                      <ListItemButton onClick={() => ignore(friend.friend.id)}>
                        <PersonOff color='secondary' />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
          </List>
        )}
        {tab === 2 && (
          <List>
            {friends
              .filter(friend => friend.friend.ignored)
              .map(friend => {
                return (
                  <ListItem key={friend.id}>
                    <ListItemAvatar>
                      <BadgedAvatar
                        id={friend.id}
                        imageUrl={friend.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography
                        variant='body2'
                        component={RouterLink}
                        sx={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        to={`/profile/${friend.id}`}
                      >
                        {friend.username}
                      </Typography>
                    </ListItemText>
                    <Tooltip title='Accept'>
                      <ListItemButton onClick={() => accept(friend.friend.id)}>
                        <PersonAdd color='secondary' />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Friend;

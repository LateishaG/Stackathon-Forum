import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFriend } from '../store';
import {
  Tabs,
  Tab,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton
} from '@mui/material';

const Friend = () => {
  const { friends } = useSelector(state => state);
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

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={changeTab}
      >
        <Tab label='Friends' />
        <Tab label='Pending' />
        <Tab label='Ignored' />
      </Tabs>
      {tab === 0 && (
        <List>
          {friends
            .filter(friend => friend.friend.status === 'CONFIRMED')
            .map(friend => {
              return (
                <ListItem key={friend.id}>
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} />
                  </ListItemAvatar>
                  <ListItemText>{friend.username}</ListItemText>
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
                friend.friend.status === 'PENDING' && !friend.friend.ignored
            )
            .map(friend => {
              return (
                <ListItem key={friend.id}>
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} />
                  </ListItemAvatar>
                  <ListItemText>{friend.username}</ListItemText>
                  <ListItemButton onClick={() => accept(friend.friend.id)}>
                    Accept
                  </ListItemButton>
                  <ListItemButton onClick={() => ignore(friend.friend.id)}>
                    Ignore
                  </ListItemButton>
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
                    <Avatar src={friend.avatar} />
                  </ListItemAvatar>
                  <ListItemText>{friend.username}</ListItemText>
                  <ListItemButton onClick={() => accept(friend.friend.id)}>
                    Accept
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      )}
    </Box>
  );
};

export default Friend;

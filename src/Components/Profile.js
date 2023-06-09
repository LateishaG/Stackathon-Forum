import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPublicProfile, updateAuth, addFriend } from '../store';
import BadgedAvatar from './BadgedAvatar';
import ProfileThreads from './ProfileThreads';
import {
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  Stack,
  Card,
  Divider
} from '@mui/material';
import { Cancel, Upload } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';

const Profile = () => {
  const { id } = useParams();
  const { auth, extProfile, friends } = useSelector(state => state);
  const [isPublic, setIsPublic] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  const friend = friends.find(_friend => _friend.id === id);

  useEffect(() => {
    if (auth.id && auth.id === id) {
      setIsPublic(false);
    } else {
      setIsPublic(true);
      dispatch(fetchPublicProfile(id));
    }
  }, [id, auth]);

  useEffect(() => {
    if (editForm && auth.id) {
      setUsername(auth.username);
      setAvatarUrl(auth.avatar);
    }
  }, [editForm]);

  if (ref.current) {
    ref.current.addEventListener('change', ev => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setAvatarUrl(reader.result);
      });
    });
  }

  const update = ev => {
    ev.preventDefault();
    if (password === '') {
      dispatch(updateAuth({ id, username, avatar: avatarUrl }));
    } else {
      dispatch(updateAuth({ id, username, password, avatar: avatarUrl }));
    }
  };

  const sendRequest = () => {
    dispatch(addFriend(id));
  };

  /* if (!auth.id || extProfile.id) {
    return <h1>Wait</h1>;
  } */
  return (
    <Grid
      spacing={2}
      container
    >
      <Grid
        xs={12}
        textAlign='center'
      >
        <Typography variant='h2'>
          {isPublic ? extProfile.username : auth.username}
        </Typography>
        <BadgedAvatar
          size={100}
          id={isPublic ? extProfile.id : auth.id}
          imageUrl={isPublic ? extProfile.avatar : auth.avatar}
        />
        <Box>
          {!isPublic &&
            (editForm ? (
              <Button onClick={() => setEditForm(false)}>Cancel</Button>
            ) : (
              <Button onClick={() => setEditForm(true)}>Edit Profile</Button>
            ))}

          {isPublic && auth.id && !friend && (
            <Button onClick={() => sendRequest()}>Send Friend Request</Button>
          )}

          {isPublic &&
            auth.id &&
            !!friend &&
            friend.friend.status === 'PENDING' &&
            friend.friend.frienderId === auth.id && (
              <Button disabled>Friend Request Sent</Button>
            )}
        </Box>
      </Grid>

      <Grid xs={6}>
        <Typography variant='h5'>
          {`${isPublic ? extProfile.username : auth.username}'s Threads:`}
        </Typography>
        <ProfileThreads />
      </Grid>

      {!isPublic && editForm && (
        <Grid xs={6}>
          <form onSubmit={update}>
            <TextField
              margin='dense'
              label='Username'
              placeholder='Change Password?'
              value={username}
              onChange={ev => setUsername(ev.target.value)}
            />
            <TextField
              margin='dense'
              label='Password'
              placeholder='Change Password?'
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />

            <Card
              raised
              sx={{ maxWidth: 200 }}
            >
              <Typography
                variant='h6'
                align='center'
              >
                Avatar
              </Typography>
              <Avatar
                id='avatarSrc'
                src={avatarUrl}
                align='center'
                sx={{ width: 100, height: 100, margin: 'auto' }}
              />
              <Stack
                direction='row'
                divider={
                  <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                  />
                }
                justifyContent='space-around'
              >
                <IconButton
                  variant='contained'
                  component='label'
                >
                  <Upload />
                  <input
                    hidden
                    id='avatarUrl'
                    name='avatarUrl'
                    type='file'
                    ref={ref}
                  />
                </IconButton>
                <IconButton onClick={() => setAvatarUrl(auth.avatar)}>
                  <Cancel />
                </IconButton>
              </Stack>
            </Card>

            <Button type='submit'>Submit</Button>
          </form>
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;

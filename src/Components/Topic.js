import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { updateThread } from '../store';
import CreateThread from './CreateThread';
import BadgedAvatar from './BadgedAvatar.js';

import {
  Container,
  Typography,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField
} from '@mui/material/';

const Topic = () => {
  const { auth, topics, threads } = useSelector(state => state);
  const { topicName } = useParams();
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState({});
  const dispatch = useDispatch();

  const topic = topics.find(topic => topic.name === topicName);
  useEffect(() => {
    if (topic) {
      setShowForm(
        threads
          .filter(thread => thread.topicId === topic.id)
          .reduce((acc, thread) => {
            acc[thread.id] = false;
            return acc;
          }, {})
      );
    }
  }, [threads]);

  if (!topic) {
    return <h1>Topic Not Found</h1>;
  }

  const update = (ev, id) => {
    ev.preventDefault();
    dispatch(updateThread({ id, name }));
  };

  return (
    <Container>
      <Typography variant='h2'>{topic.name}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            {!!auth.id && (
              <TableRow>
                <TableCell colSpan={2}>
                  <CreateThread topicId={topic.id} />
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={{ textAlign: 'center', margin: 'auto' }}>
                Author
              </TableCell>
              <TableCell>Thread</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads
              .filter(thread => thread.topicId === topic.id)
              .map(thread => {
                return (
                  <TableRow key={thread.id}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Typography
                        variant='body2'
                        component={RouterLink}
                        sx={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'block'
                        }}
                        to={`/profile/${thread.user.id}`}
                      >
                        {thread.user.username}
                      </Typography>
                      <BadgedAvatar
                        imageUrl={thread.user.avatar}
                        id={thread.user.id}
                      />
                    </TableCell>
                    <TableCell>
                      {!showForm[thread.id] ? (
                        <Typography
                          variant='h6'
                          component={RouterLink}
                          sx={{ textDecoration: 'none', color: 'inherit' }}
                          to={`/t/${topic.name}/${thread.id}`}
                        >
                          {thread.name}
                        </Typography>
                      ) : (
                        <form onSubmit={ev => update(ev, thread.id)}>
                          <TextField
                            required
                            label='Thread Name'
                            margin='dense'
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                          />
                          <Button type='submit'>Submit</Button>
                        </form>
                      )}
                    </TableCell>
                    {!!auth.id && thread.userId === auth.id && (
                      <TableCell>
                        {showForm[thread.id] ? (
                          <Button
                            onClick={() =>
                              setShowForm({ ...showForm, [thread.id]: false })
                            }
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setShowForm({ ...showForm, [thread.id]: true });
                              setName(thread.name);
                            }}
                          >
                            Edit Thread
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Topic;

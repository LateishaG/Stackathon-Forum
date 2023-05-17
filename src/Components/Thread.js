import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchThreadPosts, deletePost, updatePost } from '../store';
import CreatePost from './CreatePost';
import BadgedAvatar from './BadgedAvatar';
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField
} from '@mui/material/index.js';

const Thread = () => {
  const { threadId } = useParams();
  const { posts, auth, threads } = useSelector(state => state);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState({});
  const dispatch = useDispatch();

  const thread = threads.find(_thread => _thread.id === threadId);

  useEffect(() => {
    dispatch(fetchThreadPosts(threadId));
  }, [threadId]);

  useEffect(() => {
    setShowForm(
      posts.reduce((acc, post) => {
        acc[post.id] = false;
        return acc;
      }, {})
    );
  }, [posts]);

  const destroy = id => {
    dispatch(deletePost(id));
  };

  const update = (ev, id) => {
    ev.preventDefault();
    dispatch(updatePost({ id, threadId, name, message }));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {!!auth.id && !!thread && !thread.isArchived && (
            <TableRow>
              <TableCell colSpan={3}>
                <CreatePost />
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell sx={{ textAlign: 'center', margin: 'auto' }}>
              Author
            </TableCell>
            <TableCell>Post</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => {
            return (
              <TableRow key={post.id}>
                <TableCell sx={{ textAlign: 'center', margin: 'auto' }}>
                  <Typography
                    variant='body2'
                    component={RouterLink}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                    to={`/profile/${post.userId}`}
                  >
                    {post.user.username}
                  </Typography>
                  <BadgedAvatar
                    id={post.userId}
                    imageUrl={post.user.avatar}
                  />
                </TableCell>
                {!showForm[post.id] ? (
                  <TableCell>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{post.message}</Typography>
                  </TableCell>
                ) : (
                  <TableCell>
                    <form onSubmit={ev => update(ev, post.id)}>
                      <TextField
                        required
                        label='Post Name'
                        margin='dense'
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                      />
                      <TextField
                        required
                        multiline
                        label='Message'
                        margin='dense'
                        value={message}
                        onChange={ev => setMessage(ev.target.value)}
                      />
                      <Button type='submit'>Submit</Button>
                    </form>
                  </TableCell>
                )}
                <TableCell>
                  {!!auth.id &&
                    !thread.isArchived &&
                    (post.userId === auth.id || auth.isAdmin) && (
                      <Box>
                        {showForm[post.id] ? (
                          <Button
                            onClick={() =>
                              setShowForm({ ...showForm, [post.id]: false })
                            }
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              setShowForm({ ...showForm, [post.id]: true });
                              setName(post.name);
                              setMessage(post.message);
                            }}
                          >
                            Edit Post
                          </Button>
                        )}
                        <Button onClick={() => destroy(post.id)}>
                          Delete Post
                        </Button>
                      </Box>
                    )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Thread;

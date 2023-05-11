import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchThreadPosts, deletePost } from '../store';
import CreatePost from './CreatePost';
import {
  Typography,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@mui/material/index.js';

const Thread = () => {
  const { threadId } = useParams();
  const { posts, auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreadPosts(threadId));
  }, [threadId]);

  const destroy = id => {
    dispatch(deletePost(id));
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          {!!auth.id && (
            <TableRow>
              <TableCell colSpan={2}>
                <CreatePost />
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell sx={{ textAlign: 'center', margin: 'auto' }}>
              Author
            </TableCell>
            <TableCell>Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => {
            return (
              <TableRow key={post.id}>
                <TableCell sx={{ textAlign: 'center', margin: 'auto' }}>
                  <Avatar
                    sx={{ margin: 'auto' }}
                    src={post.user.avatar}
                  />
                  <Typography
                    variant='body2'
                    component={RouterLink}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                    to={`/`}
                  >
                    {post.user.username}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>{post.name}</Typography>
                  <Typography variant='body2'>{post.message}</Typography>
                </TableCell>
                {!!auth.id && post.userId === auth.id && (
                  <TableCell>
                    <Button onClick={() => destroy(post.id)}>
                      Delete Post
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Thread;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Typography, List, ListItem, Avatar } from '@mui/material/index.js';
import { fetchThreadPosts } from '../store';

const Thread = () => {
  const { threadId } = useParams();
  const { posts } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThreadPosts(threadId));
  }, [threadId]);
  return (
    <List>
      {posts.map(post => {
        return (
          <ListItem key={post.id}>
            <Avatar src={post.user.avatar} />
            <Typography
              variant='body2'
              component={RouterLink}
              sx={{ textDecoration: 'none', color: 'inherit' }}
              to={`/`}
            >
              {post.user.username}
            </Typography>
            {post.name}
            {post.message}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Thread;

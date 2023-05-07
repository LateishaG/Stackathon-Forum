import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem } from '@mui/material';
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
        return <ListItem key={post.id}>{post.name}</ListItem>;
      })}
    </List>
  );
};

export default Thread;

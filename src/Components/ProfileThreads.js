import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { List, ListItem, Typography } from '@mui/material';

const ProfileThreads = () => {
  const { threads, topics } = useSelector(state => state);
  const { id } = useParams();
  let topic = {};

  return (
    <List>
      {threads
        .filter(thread => thread.userId === id)
        .map(thread => {
          topic = topics.find(_topic => _topic.id === thread.topicId);
          return (
            <ListItem
              divider
              key={thread.id}
            >
              {!!topic.name && (
                <Typography
                  variant='h6'
                  component={RouterLink}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                  to={`/t/${topic.name}/${thread.id}`}
                >
                  {thread.isArchived && 'Archived: '}
                  {thread.name}
                </Typography>
              )}
            </ListItem>
          );
        })}
    </List>
  );
};

export default ProfileThreads;

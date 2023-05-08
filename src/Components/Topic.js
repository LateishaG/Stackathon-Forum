import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  Avatar,
  Box
} from '@mui/material/';

const Topic = () => {
  const { topics, threads } = useSelector(state => state);
  const { topicName } = useParams();

  const topic = topics.find(topic => topic.name === topicName);

  if (!topic) {
    return <h1>Topic Not Found</h1>;
  }

  return (
    <Container>
      <Typography variant='h2'>{topic.name}</Typography>
      <List>
        {threads
          .filter(thread => thread.topicId === topic.id)
          .map(thread => {
            return (
              <ListItem
                key={thread.id}
                divider
              >
                <Avatar src={thread.user.avatar} />
                <Typography
                  variant='body2'
                  component={RouterLink}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                  to={`/`}
                >
                  {thread.user.username}
                </Typography>

                <Typography
                  variant='h6'
                  component={RouterLink}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                  to={`/t/${topic.name}/${thread.id}`}
                >
                  {thread.name}
                </Typography>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
};

export default Topic;

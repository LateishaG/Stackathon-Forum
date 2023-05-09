import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
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
      <TableContainer>
        <Table>
          <TableHead>
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
                  <TableRow
                    key={thread.id}
                    divider
                  >
                    <TableCell sx={{ textAlign: 'center', margin: 'auto' }}>
                      <Avatar
                        sx={{ margin: 'auto' }}
                        src={thread.user.avatar}
                      />
                      <Typography
                        variant='body2'
                        component={RouterLink}
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                        to={`/`}
                      >
                        {thread.user.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='h6'
                        component={RouterLink}
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                        to={`/t/${topic.name}/${thread.id}`}
                      >
                        {thread.name}
                      </Typography>
                    </TableCell>
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

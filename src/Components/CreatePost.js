import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createPost } from '../store';
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField
} from '@mui/material';

const CreatePost = () => {
  const { threadId } = useParams();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const create = ev => {
    ev.preventDefault();
    console.log('hello');
    dispatch(createPost({ threadId, name, message }));
    setName('');
    setMessage('');
  };

  return (
    <Accordion elevation={0}>
      <AccordionSummary>+ New Post</AccordionSummary>
      <AccordionDetails>
        <form onSubmit={create}>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default CreatePost;

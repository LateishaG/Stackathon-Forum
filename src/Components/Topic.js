import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Topic = () => {
  const { topics, threads } = useSelector(state => state);
  const { topicName } = useParams();

  const topic = topics.find(topic => topic.name === topicName);

  if (!topic) {
    return <h1>Topic Not Found</h1>;
  }

  return (
    <ul>
      {threads
        .filter(thread => thread.topicId === topic.id)
        .map(thread => {
          return <li key={thread.id}>{thread.name}</li>;
        })}
    </ul>
  );
};

export default Topic;

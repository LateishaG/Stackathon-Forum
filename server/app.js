import express from 'express';
const app = express();
import path from 'path';
import authRouter from './api/auth.js';
import topicsRouter from './api/topics.js';
import threadsRouter from './api/threads.js';

const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.json({ limit: '50mb' }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

app.use('/api/auth', authRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/threads', threadsRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

export default app;

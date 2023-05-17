import app from './app.js';
import { syncAndSeed, User } from './db/index.js';
import { WebSocketServer } from 'ws';
import socketMap from './SocketMap.js';

const init = async () => {
  try {
    if (process.env.SYNC !== 'NO') {
      await syncAndSeed();
    }
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () =>
      console.log(`listening on port ${port}`)
    );

    const socketServer = new WebSocketServer({ server });
    socketServer.on('connection', socket => {
      console.log('connected');
      socket.on('close', () => {
        const userId = socket.userId;
        delete socketMap[userId];
        console.log('closed');

        Object.values(socketMap).forEach(value => {
          value.socket.send(
            JSON.stringify({ type: 'OFFLINE', user: { id: userId } })
          );
        });
      });
      socket.on('message', async data => {
        const message = JSON.parse(data);
        if (message.token) {
          const user = await User.findByToken(message.token);
          socketMap[user.id] = { socket, user };
          socket.userId = user.id;
          socket.send(JSON.stringify({ status: 'online' }));

          Object.values(socketMap).forEach(value => {
            if (value.user.id !== user.id) {
              value.socket.send(
                JSON.stringify({ type: 'ONLINE', user: { id: user.id } })
              );
            }
          });
        }
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();

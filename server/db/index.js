import conn from './conn.js';
import User from './User.js';
import Topic from './Topic.js';
import Thread from './Thread.js';
import Post from './Post.js';

import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

Thread.belongsTo(Topic);
Thread.belongsTo(User);

Post.belongsTo(Thread);
Post.belongsTo(User);

User.hasMany(Thread);
User.hasMany(Post);

export const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: 'moe',
      password: '123',
      avatar: createAvatar(thumbs, { seed: 'moe' }).toDataUriSync()
    }),
    User.create({
      username: 'lucy',
      password: '123',
      avatar: createAvatar(thumbs, { seed: 'lucy' }).toDataUriSync()
    }),
    User.create({
      username: 'larry',
      password: '123',
      avatar: createAvatar(thumbs, { seed: 'larry' }).toDataUriSync()
    }),
    User.create({
      username: 'ethyl',
      password: '123',
      avatar: createAvatar(thumbs, { seed: 'ethyl' }).toDataUriSync()
    })
  ]);

  const gamingTopic = await Topic.create({ name: 'Gaming' });
  const [Diablo, FFXVI] = await Promise.all([
    Thread.create({
      name: 'Another Beta!',
      userId: moe.id,
      topicId: gamingTopic.id
    }),
    Thread.create({
      name: 'Summons look cool',
      userId: larry.id,
      topicId: gamingTopic.id
    })
  ]);

  const [beta, summon] = await Promise.all([
    Post.create({
      name: Diablo.name,
      userId: Diablo.userId,
      threadId: Diablo.id,
      message:
        "There is another Beta on May 12th - 14th! Who's ready for the Server Slam?!"
    }),
    Post.create({
      name: FFXVI.name,
      userId: FFXVI.userId,
      threadId: FFXVI.id,
      message:
        "Summons look cool, but it's hard to tell how the Summon v Summon battles will be for the player"
    })
  ]);

  return {
    users: {
      moe,
      lucy,
      larry
    }
  };
};

export { User, Topic, Thread, Post };

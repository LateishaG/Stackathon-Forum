import conn from './conn.js';
import User from './User.js';
import Topic from './Topic.js';
import Thread from './Thread.js';
import Post from './Post.js';
import Friend from './Friend.js';

import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

Thread.belongsTo(Topic);
Thread.belongsTo(User);

Post.belongsTo(Thread);
Post.belongsTo(User);

User.hasMany(Thread);
User.hasMany(Post);

User.belongsToMany(User, {
  through: Friend,
  as: 'friender',
  foreignKey: 'frienderId',
  otherKey: 'friendingId'
});

User.belongsToMany(User, {
  through: Friend,
  as: 'friending',
  foreignKey: 'friendingId',
  otherKey: 'frienderId'
});

export const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: 'moe',
      password: '123',
      avatar: createAvatar(thumbs, {
        seed: 'moe'
      }).toDataUriSync()
    }),
    User.create({
      username: 'lucy',
      password: '123',
      avatar: createAvatar(thumbs, {
        seed: 'lucy'
      }).toDataUriSync()
    }),
    User.create({
      username: 'larry',
      password: '123',
      avatar: createAvatar(thumbs, {
        seed: 'larry'
      }).toDataUriSync()
    }),
    User.create({
      username: 'ethyl',
      password: '123',
      avatar: createAvatar(thumbs, {
        seed: 'ethyl'
      }).toDataUriSync()
    }),
    User.create({
      username: 'paige',
      password: '123', //process.env.ADMIN_PASSWORD,
      avatar: createAvatar(thumbs, {
        seed: 'paige'
      }).toDataUriSync(),
      isAdmin: true
    })
  ]);

  await Friend.create({ friendingId: moe.id, frienderId: lucy.id });
  await Friend.create({
    friendingId: larry.id,
    frienderId: moe.id,
    status: 'CONFIRMED'
  });
  await Friend.create({
    friendingId: moe.id,
    frienderId: ethyl.id,
    ignored: true
  });

  const friends = await User.findByPk(moe.id, {
    attributes: ['username'],
    include: [
      {
        model: User,
        as: 'friender',
        attributes: ['username', 'avatar'],
        through: {
          attributes: ['status', 'ignored']
        }
      },
      {
        model: User,
        as: 'friending',
        attributes: ['username', 'avatar'],
        through: {
          attributes: ['status', 'ignored']
        }
      }
    ]
  });

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

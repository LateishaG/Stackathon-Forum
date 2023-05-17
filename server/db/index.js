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
      password: process.env.ADMIN_PASSWORD,
      avatar: createAvatar(thumbs, {
        seed: 'paige'
      }).toDataUriSync(),
      isAdmin: true
    })
  ]);

  Promise.all([
    await Friend.create({ friendingId: moe.id, frienderId: lucy.id }),
    await Friend.create({
      friendingId: larry.id,
      frienderId: moe.id,
      status: 'CONFIRMED'
    }),
    await Friend.create({
      friendingId: moe.id,
      frienderId: ethyl.id,
      ignored: true
    })
  ]);

  const [gamingTopic, booksTopic] = await Promise.all([
    Topic.create({ name: 'Gaming' }),
    Topic.create({ name: 'Books' })
  ]);
  const [Diablo, FFXVI, time, recs] = await Promise.all([
    Thread.create({
      name: 'Another Beta!',
      userId: moe.id,
      topicId: gamingTopic.id
    }),
    Thread.create({
      name: 'FFXVI Summons look cool',
      userId: larry.id,
      topicId: gamingTopic.id
    }),
    Thread.create({
      name: 'The Wheel of Time',
      userId: lucy.id,
      topicId: booksTopic.id
    }),
    Thread.create({
      name: 'Need some recommendations!',
      userId: ethyl.id,
      topicId: booksTopic.id
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
        "FFXVI Summons look cool, but it's hard to tell how the Summon v Summon battles will be for the player"
    }),
    Post.create({
      name: time.name,
      userId: time.userId,
      threadId: time.id,
      message:
        'Just started this new fantasy series and loved it! Problem is when I checked the series out on Amazon, there are 10+ books. Has anyone read the whole series? How long before you finished?'
    }),
    Post.create({
      name: recs.name,
      userId: recs.userId,
      threadId: recs.id,
      message:
        'I need some new fantasy books that are a quick read, any suggestions :)'
    })
  ]);

  await Post.create({
    name: 'A long time...',
    userId: ethyl.id,
    threadId: time.id,
    message:
      'It took me years to finish that series and while I enjoyed it, I suggest to only start the others when you have got the time. Another thing, try renting the books from the library. The cost of these books can add up quickly.'
  });

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl
    }
  };
};

export { User, Topic, Thread, Post };

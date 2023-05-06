const conn = require('./conn');
const User = require('./User');
const Topic = require('./Topic');
const Thread = require('./Thread');
const Post = require('./Post');

Thread.belongsTo(Topic);
Thread.belongsTo(User);

Post.belongsTo(Thread);
Post.belongsTo(User);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123' }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' })
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

module.exports = {
  syncAndSeed,
  User,
  Topic,
  Thread,
  Post
};

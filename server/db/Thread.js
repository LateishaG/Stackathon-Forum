const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Thread = conn.define('thread', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },

  name: {
    type: STRING,
    allowNull: false,

    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: UUID,
    allowNull: false
  },
  topicId: {
    type: UUID,
    allowNull: false
  }
});

Thread.prototype.getPosts = async function () {
  let posts = await conn.models.post.findAll({
    where: {
      threadId: this.id
    }
  });
  return posts;
};

module.exports = Thread;

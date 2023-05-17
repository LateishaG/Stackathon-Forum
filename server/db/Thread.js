import conn from './conn.js';
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;

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
  },
  isArchived: {
    type: BOOLEAN,
    defaultValue: false
  }
});

Thread.prototype.getPosts = async function () {
  let posts = await conn.models.post.findAll({
    where: {
      threadId: this.id
    },
    include: {
      model: conn.models.user,
      attributes: ['username', 'avatar']
    }
  });
  return posts;
};

Thread.prototype.archive = async function () {
  this.isArchived = true;
  await this.save();

  return await Thread.findByPk(this.id, {
    include: {
      model: conn.models.user,
      attributes: ['id', 'username', 'avatar']
    }
  });
};

Thread.prototype.restore = async function () {
  this.isArchived = false;
  await this.save();

  return await Thread.findByPk(this.id, {
    include: {
      model: conn.models.user,
      attributes: ['id', 'username', 'avatar']
    }
  });
};

export default Thread;

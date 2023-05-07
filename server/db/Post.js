import conn from './conn.js';
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;

const Post = conn.define('post', {
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
  threadId: {
    type: UUID,
    allowNull: false
  },
  message: {
    type: TEXT,
    allowNull: false,

    validate: {
      notEmpty: true
    }
  }
});

export default Post;

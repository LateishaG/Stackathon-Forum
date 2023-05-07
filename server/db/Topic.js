import conn from './conn.js';
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Topic = conn.define('topic', {
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
  }
});

export default Topic;

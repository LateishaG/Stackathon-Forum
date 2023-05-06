const conn = require('./conn');
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

module.exports = Topic;

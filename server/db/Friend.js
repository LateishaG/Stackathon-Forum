import conn from './conn.js';
const { UUID, UUIDV4, ENUM, BOOLEAN } = conn.Sequelize;

const Follow = conn.define('friend', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  status: {
    type: ENUM('PENDING', 'CONFIRMED'),
    defaultValue: 'PENDING'
  },
  ignored: {
    type: BOOLEAN,
    defaultValue: false
  }
});

export default Follow;

import conn from './conn.js';
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, Op } = conn.Sequelize;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT = process.env.JWT;

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  avatar: {
    type: TEXT
  }
});

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true
    }
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product]
      }
    ]
  });
  return cart;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find(lineItem => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find(lineItem => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.prototype.createThread = async function ({ name, topicId, message }) {
  const thread = await conn.models.thread.create({
    name,
    userId: this.id,
    topicId
  });
  await conn.models.post.create({
    name,
    userId: this.id,
    threadId: thread.id,
    message
  });

  return await conn.models.thread.findByPk(thread.id, {
    include: { model: User, attributes: ['id', 'username', 'avatar'] }
  });
};

User.prototype.updateThread = async function (updatedThread) {
  const thread = await conn.models.thread.findByPk(updatedThread.id);
  await thread.update(updatedThread);

  return await conn.models.thread.findByPk(thread.id, {
    include: { model: User, attributes: ['id', 'username', 'avatar'] }
  });
};

User.prototype.createPost = async function ({ name, threadId, message }) {
  const post = await conn.models.post.create({
    name,
    threadId,
    message,
    userId: this.id
  });

  return await conn.models.post.findByPk(post.id, {
    include: { model: User, attributes: ['id', 'username', 'avatar'] }
  });
};

User.prototype.deletePost = async function (id) {
  const post = await conn.models.post.findByPk(id);
  await post.destroy();
};

User.prototype.updatePost = async function (post) {
  const uPost = await conn.models.post.findByPk(post.id);
  await uPost.update(post);

  return await conn.models.post.findByPk(uPost.id, {
    include: { model: User, attributes: ['id', 'username', 'avatar'] }
  });
};

User.prototype.getFriends = async function () {
  return await conn.models.user.findByPk(this.id, {
    include: [
      {
        model: User,
        as: 'friender',
        attributes: ['id', 'username', 'avatar']
      },
      {
        model: User,
        as: 'friending',
        attributes: ['id', 'username', 'avatar']
      }
    ]
  });
};

User.prototype.updateFriend = async function (updated) {
  const friend = await conn.models.friend.findByPk(updated.id);
  await friend.update(updated);

  return this.getFriends();
};

User.prototype.removeFriend = async function (id) {
  const friend = await conn.models.friend.findByPk(id);
  await friend.destroy();

  return this.getFriends();
};

User.prototype.addFriend = async function ({ id }) {
  await conn.models.friend.create({ frienderId: this.id, friendingId: id });

  return this.getFriends();
};

User.findPublicProfile = async function (id) {
  const user = await this.findByPk(id);
  return { id, username: user.username, avatar: user.avatar };
};

User.addHook('beforeSave', async user => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username
    }
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
};

export default User;

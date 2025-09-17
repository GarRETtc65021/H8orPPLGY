// 代码生成时间: 2025-09-17 12:31:45
const fastify = require('fastify')({ logger: true });

// 定义购物车数据结构
const cart = {
  // 购物车中的商品列表
  items: [],

  // 添加商品到购物车
  addItem: function (itemId, quantity) {
    // 查找购物车中是否已有该商品
    const existingItem = this.items.find(item => item.id === itemId);
    if (existingItem) {
      // 如果存在，增加数量
      existingItem.quantity += quantity;
    } else {
      // 如果不存在，添加新商品
      this.items.push({ id: itemId, quantity });
    }
  },

  // 从购物车中移除商品
  removeItem: function (itemId) {
    // 过滤掉要移除的商品
    this.items = this.items.filter(item => item.id !== itemId);
  },

  // 获取购物车中的所有商品
  getItems: function () {
    return this.items;
  }
};

// 路由处理 - 添加商品到购物车
fastify.post('/cart/add', async (request, reply) => {
  try {
    const { itemId, quantity } = request.body;
    if (!itemId || quantity <= 0) {
      reply.status(400).send({ error: 'Invalid item or quantity' });
      return;
    }
    cart.addItem(itemId, quantity);
    reply.status(200).send({ message: 'Item added to cart' });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

// 路由处理 - 从购物车移除商品
fastify.post('/cart/remove', async (request, reply) => {
  try {
    const { itemId } = request.body;
    if (!itemId) {
      reply.status(400).send({ error: 'Invalid item' });
      return;
    }
    cart.removeItem(itemId);
    reply.status(200).send({ message: 'Item removed from cart' });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

// 路由处理 - 获取购物车中的商品
fastify.get('/cart/items', async (request, reply) => {
  try {
    const items = cart.getItems();
    reply.status(200).send({ items });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

// 服务器启动
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
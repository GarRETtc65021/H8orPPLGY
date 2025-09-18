// 代码生成时间: 2025-09-19 02:19:34
const fastify = require('fastify')({ logger: true });

// In-memory store for cart items
const cartStore = {};

// Add an item to the shopping cart
fastify.post('/cart/:userId', async (request, reply) => {
  const { userId } = request.params;
  const { item } = request.body;

  if (!userId || !item) {
    reply.status(400).send({ error: 'UserId and item are required' });
    return;
  }

  // Initialize cart if not exists
  if (!cartStore[userId]) {
    cartStore[userId] = [];
  }

  // Add item to cart
  cartStore[userId].push(item);

  reply.status(200).send({ message: 'Item added to cart', cart: cartStore[userId] });
});

// Get cart items for a user
fastify.get('/cart/:userId', async (request, reply) => {
  const { userId } = request.params;

  // Check if cart exists
  if (!cartStore[userId]) {
    reply.status(404).send({ error: 'Cart not found' });
    return;
  }

  reply.status(200).send(cartStore[userId]);
});

// Remove an item from the shopping cart
fastify.delete('/cart/:userId/:itemId', async (request, reply) => {
  const { userId, itemId } = request.params;

  // Check if cart exists
  if (!cartStore[userId]) {
    reply.status(404).send({ error: 'Cart not found' });
    return;
  }

  // Find and remove item
  const index = cartStore[userId].findIndex((item) => item.id === itemId);
  if (index === -1) {
    reply.status(404).send({ error: 'Item not found in cart' });
    return;
  }

  cartStore[userId].splice(index, 1);

  reply.status(200).send({ message: 'Item removed from cart', cart: cartStore[userId] });
});

// Start the server
const start = async () => {
  try {
    await fastify.listen(3000);
    console.log(`Server is running at ${fastify.serverAddress().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
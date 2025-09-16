// 代码生成时间: 2025-09-17 00:52:15
const fastify = require('fastify')({
  logger: true // Enable logger for logging
});

// Middleware to format the response
function formatResponseMiddleware() {
  return async (request, reply, done) => {
    reply.addHook('onSend', async (request, reply) => {
      const payload = reply.raw;
      // Check if the payload is an object and not null
      if (payload && typeof payload === 'object') {
        // Format the response as a JSON with status and data
        reply.send({
          status: 'success',
          data: payload
        });
      } else {
        // If payload is not an object, send as is
        done();
      }
    });
  };
}

// Register the middleware
fastify.register(formatResponseMiddleware);

// Example route that uses the middleware
fastify.get('/', async (request, reply) => {
  // Simulate some data retrieval logic
  const data = {
    id: 1,
    name: 'John Doe'
  };
  // The middleware will automatically format this response
  return data;
});

// Error handling middleware
fastify.setErrorHandler((error, request, reply) => {
  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: '0.0.0.0'
    });
    fastify.log.info(`Server running at http://0.0.0.0:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
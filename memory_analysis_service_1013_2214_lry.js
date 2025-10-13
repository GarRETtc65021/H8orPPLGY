// 代码生成时间: 2025-10-13 22:14:33
const fastify = require('fastify')({ logger: true });
const os = require('os');

// A helper function to get memory usage in a friendly format.
const getMemoryUsage = () => {
  const free = os.freemem();
  const total = os.totalmem();
  const used = total - free;

  return {
    total: `${(total / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    free: `${(free / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    used: `${(used / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    usage: `${((used / total) * 100).toFixed(2)}%`,
  };
};

// A route to get the current memory usage.
fastify.get('/', async (request, reply) => {
  try {
    const memoryUsage = getMemoryUsage();
    reply.send({
      success: true,
      data: memoryUsage,
    });
  } catch (error) {
    reply.send({
      success: false,
      message: error.message,
    });
  }
});

// Start the server.
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
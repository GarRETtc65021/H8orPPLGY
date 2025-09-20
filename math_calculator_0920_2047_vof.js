// 代码生成时间: 2025-09-20 20:47:43
const fastify = require('fastify')({ logger: true });

// 定义数学计算工具集
const mathCalculator = {
  // 加法
  add: (a, b) => a + b,

  // 减法
  subtract: (a, b) => a - b,

  // 乘法
  multiply: (a, b) => a * b,

  // 除法
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  },
};

// 注册加法路由
fastify.post('/add', (request, reply) => {
  const { a, b } = request.body;
  try {
    const result = mathCalculator.add(a, b);
    reply.send({ result });
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
});

// 注册减法路由
fastify.post('/subtract', (request, reply) => {
  const { a, b } = request.body;
  try {
    const result = mathCalculator.subtract(a, b);
    reply.send({ result });
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
});

// 注册乘法路由
fastify.post('/multiply', (request, reply) => {
  const { a, b } = request.body;
  try {
    const result = mathCalculator.multiply(a, b);
    reply.send({ result });
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
});

// 注册除法路由
fastify.post('/divide', (request, reply) => {
  const { a, b } = request.body;
  try {
    const result = mathCalculator.divide(a, b);
    reply.send({ result });
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
});

// 错误处理
fastify.setErrorHandler((error, request, reply) => {
  reply.status(error.statusCode).send({
    code: error.code,
    message: error.message
  });
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
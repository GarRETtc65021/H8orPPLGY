// 代码生成时间: 2025-09-23 10:19:12
const fastify = require('fastify'); // 引入fastify框架
const crypto = require('crypto'); // 引入crypto模块用于计算哈希值

// 创建fastify实例
const app = fastify({ logger: true });

// 添加路由，用于计算哈希值
app.post('/hash', async (request, reply) => {
  // 提取请求体中的数据
  const { data } = request.body;

  // 检查请求体中是否包含data字段
  if (!data) {
    reply.status(400).send({ error: 'Missing data field in request body' });
    return;
  }

  // 计算哈希值
  const hash = crypto.createHash('sha256').update(data).digest('hex');

  // 返回哈希值
  reply.send({ hash: hash });
});

// 错误处理中间件
app.setErrorHandler((err, request, reply) => {
  // 打印错误信息
  console.error(err);
  // 返回错误响应
  reply.status(err.statusCode || 500).send({
    error: err.message || 'Internal Server Error',
  });
});

// 监听端口启动服务
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// 导出启动函数
module.exports = { start };

// 使用模块时启动服务
if (require.main === module) {
  start();
}
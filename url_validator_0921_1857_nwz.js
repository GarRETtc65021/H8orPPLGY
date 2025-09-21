// 代码生成时间: 2025-09-21 18:57:11
const fastify = require('fastify')({ logger: true });

// 引入URL验证库
const validator = require('validator');

// 定义URL有效性验证的路由
fastify.post('/validate-url', async (request, reply) => {
  // 从请求体中获取URL
  const { url } = request.body;

  // 检查URL是否提供了
  if (!url) {
    reply.status(400).send({
      error: 'URL is required'
    });
    return;
  }

  // 使用validator库验证URL
  const isValid = validator.isURL(url, { require_protocol: true });

  // 如果URL无效，返回错误
  if (!isValid) {
    reply.status(400).send({
      error: 'Invalid URL'
    });
    return;
  }

  // 如果URL有效，返回成功响应
  reply.status(200).send({
    valid: true,
    message: 'URL is valid'
  });
});

// 服务器监听3000端口
fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});

// 错误处理中间件
fastify.setErrorHandler((err, request, reply) => {
  reply.status(err.statusCode).send({
    error: err.message
  });
});

// 导出fastify实例，以便在测试或其他模块中使用
module.exports = fastify;
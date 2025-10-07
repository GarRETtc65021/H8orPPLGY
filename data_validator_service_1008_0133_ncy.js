// 代码生成时间: 2025-10-08 01:33:20
const fastify = require('fastify')({ logger: true });
const Ajv = require('ajv');

// 初始化Ajv实例
const ajv = new Ajv({ allErrors: true });

// 定义数据验证模式
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
  },
  required: ['name', 'age'],
  additionalProperties: false
};

// 编译模式
const validate = ajv.compile(schema);

// 数据验证中间件
function validateData(request, reply, done) {
  if (!validate(request.body)) {
    const err = new Error(ajv.errorsText(validate.errors));
    err.statusCode = 400;
    done(err);
  } else {
    done();
  }
}

// 路由处理函数
const routeHandler = (request, reply) => {
  // 处理请求
  reply.send({
    message: 'Data is valid',
    data: request.body
  });
};

// 注册中间件用于数据验证
fastify.post('/api/data', { preHandler: validateData }, routeHandler);

// 服务器启动配置
const start = async function () {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// 导出启动函数
module.exports = { start };
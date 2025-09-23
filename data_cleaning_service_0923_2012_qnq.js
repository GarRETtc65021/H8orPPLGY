// 代码生成时间: 2025-09-23 20:12:39
const fastify = require('fastify')({ logger: true });

// 数据清洗和预处理工具模块
const dataCleaningService = {
  // 去除字符串中的前后空白字符
  trim: (str) => str.trim(),

  // 将字符串转换为小写
  toLowerCase: (str) => str.toLowerCase(),

  // 替换字符串中的特定字符
  replace: (str, search, replacement) => str.replace(search, replacement),

  // 去除字符串中的数字
  removeNumbers: (str) => str.replace(/[0-9]/g, ''),

  // 去除字符串中的非字母字符
  removeNonAlpha: (str) => str.replace(/[^a-zA-Z]/g, ''),

  // 更多的清洗和预处理函数可以在这里添加
};

// 定义数据清洗接口
fastify.post('/clean-data', async (request, reply) => {
  try {
    // 获取请求体中的数据
    const { data, operations } = request.body;

    // 检查数据和操作是否有效
    if (!data || !operations) {
      return reply.status(400).send({ error: 'Invalid request' });
    }

    // 执行数据清洗和预处理操作
    operations.forEach((operation) => {
      const { type, value } = operation;
      if (dataCleaningService[type]) {
        data = dataCleaningService[type](data, value);
      } else {
        throw new Error(`Operation type '${type}' is not supported`);
      }
    });

    // 返回清洗后的数据
    return { cleanedData: data };
  } catch (error) {
    // 错误处理
    reply.status(500).send({ error: error.message });
  }
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Data cleaning service listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
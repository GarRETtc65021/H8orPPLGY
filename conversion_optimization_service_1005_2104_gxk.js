// 代码生成时间: 2025-10-05 21:04:36
const Fastify = require('fastify');
const { v4: uuidv4 } = require('uuid');

// 定义转化率优化服务
class ConversionOptimizationService {
  // 构造函数，初始化服务
  constructor() {
    this.conversionRates = new Map(); // 存储转化率数据
  }

  // 添加转化率数据
  addConversionRate(experimentId, conversionRate) {
    if (!experimentId || typeof conversionRate !== 'number') {
      throw new Error('Invalid experimentId or conversionRate');
    }
    this.conversionRates.set(experimentId, conversionRate);
  }

  // 获取转化率数据
  getConversionRate(experimentId) {
    if (!experimentId) {
      throw new Error('Invalid experimentId');
    }
    return this.conversionRates.get(experimentId) || null;
  }
}

// 创建Fastify实例
const fastify = Fastify({ logger: true });

// 实例化转化率优化服务
const conversionService = new ConversionOptimizationService();

// 添加转化率数据的路由
fastify.post('/add-conversion-rate', async (request, reply) => {
  try {
    const { experimentId, conversionRate } = request.body;
    conversionService.addConversionRate(experimentId, conversionRate);
    reply.send({
      message: 'Conversion rate added successfully',
      experimentId,
      conversionRate
    });
  } catch (error) {
    reply.status(400).send({
      message: error.message
    });
  }
});

// 获取转化率数据的路由
fastify.get('/get-conversion-rate/:experimentId', async (request, reply) => {
  try {
    const { experimentId } = request.params;
    const conversionRate = conversionService.getConversionRate(experimentId);
    if (!conversionRate) {
      reply.status(404).send({
        message: 'Conversion rate not found'
      });
      return;
    }
    reply.send({
      experimentId,
      conversionRate
    });
  } catch (error) {
    reply.status(400).send({
      message: error.message
    });
  }
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server is running on http://127.0.0.1:${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
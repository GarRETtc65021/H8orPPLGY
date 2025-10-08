// 代码生成时间: 2025-10-08 21:16:43
const fastify = require('fastify')({ logger: true });

// 引入用于文件系统的模块
const fs = require('fs');
// 引入用于路径解析的模块
const path = require('path');

// 定义CDN存储目录
const CDN_STORAGE_PATH = './cdn-storage';

// 确保CDN目录存在
if (!fs.existsSync(CDN_STORAGE_PATH)) {
  fs.mkdirSync(CDN_STORAGE_PATH, { recursive: true });
}

// 上传文件到CDN的接口
fastify.post('/upload', async (request, reply) => {
  // 获取上传的文件
  const { file } = request.body;
  if (!file) {
    return reply.code(400).send({
      message: 'No file provided'
    });
  }

  // 检查文件类型
  if (!['image/jpeg', 'image/png', 'application/javascript'].includes(file.type)) {
    return reply.code(400).send({
      message: 'Unsupported file type'
    });
  }

  // 保存文件到CDN存储路径
  const filePath = path.join(CDN_STORAGE_PATH, file.originalname);
  await fs.promises.writeFile(filePath, file.buffer);

  // 返回文件URL
  return {
    message: 'File uploaded successfully',
    url: `http://localhost:3000/cdn/${file.originalname}`
  };
});

// 提供文件的CDN接口
fastify.get('/cdn/:filename', async (request, reply) => {
  const { filename } = request.params;
  const filePath = path.join(CDN_STORAGE_PATH, filename);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return reply.code(404).send({
      message: 'File not found'
    });
  }

  // 设置响应头
  const contentType = ['image/jpeg', 'image/png'].includes(path.extname(filename).toLowerCase()) ? 'image' : 'application/javascript';
  reply.header('Content-Type', contentType);

  // 发送文件内容
  return fs.createReadStream(filePath);
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
// 代码生成时间: 2025-09-19 23:24:51
const fastify = require('fastify')({ logger: true });
const bcrypt = require('bcrypt');

// 用户数据存储（示例，实际开发中应使用数据库）
const users = {
  'user1': {
    username: 'user1',
    password: bcrypt.hashSync('password123', 8),
  }
};

// 注册新用户
fastify.post('/register', async (request, reply) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return reply.status(400).send({ error: 'Missing username or password' });
  }
  if (users[username]) {
    return reply.status(409).send({ error: 'Username already exists' });
  }
  users[username] = {
    username,
    password: bcrypt.hashSync(password, 8),
  };
  return reply.status(201).send({ message: 'User registered successfully' });
});

// 用户登录
fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return reply.status(400).send({ error: 'Missing username or password' });
  }
  const user = users[username];
  if (!user) {
    return reply.status(404).send({ error: 'User not found' });
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return reply.status(401).send({ error: 'Invalid credentials' });
  }
  return reply.status(200).send({ message: 'User logged in successfully', username });
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
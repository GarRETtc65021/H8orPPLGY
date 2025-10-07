// 代码生成时间: 2025-10-07 23:41:58
const fastify = require('fastify')({ logger: true });

// 模拟数据库
const medicalRecords = [];

// 定义电子病历数据接口
const addMedicalRecord = async (request, reply) => {
  try {
    const { patientId, diagnosis, treatment, doctorId } = request.body;
    if (!patientId || !diagnosis || !treatment || !doctorId) {
      reply.status(400).send({
        error: 'Missing required fields'
      });
      return;
    }
    const newRecord = {
      id: Date.now().toString(), // 使用时间戳作为唯一ID
      patientId,
      diagnosis,
      treatment,
      doctorId,
      timestamp: new Date()
    };
    medicalRecords.push(newRecord);
    reply.status(201).send(newRecord);
  } catch (error) {
    reply.status(500).send({
      error: 'Internal Server Error'
    });
  }
};

// 获取特定患者的电子病历
const getMedicalRecordByPatientId = async (request, reply) => {
  try {
    const { patientId } = request.params;
    const records = medicalRecords.filter(record => record.patientId === patientId);
    if (records.length === 0) {
      reply.status(404).send({
        error: 'No records found for patient'
      });
      return;
    }
    reply.send(records);
  } catch (error) {
    reply.status(500).send({
      error: 'Internal Server Error'
    });
  }
};

// 启动Fastify服务
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

// 注册路由
fastify.post('/records', addMedicalRecord);
fastify.get('/records/:patientId', getMedicalRecordByPatientId);

// 启动服务
start();
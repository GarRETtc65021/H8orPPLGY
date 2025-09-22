// 代码生成时间: 2025-09-22 21:48:01
const fastify = require('fastify')({ logger: true });

// 测试报告生成器服务
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// 定义测试报告数据结构
class TestReport {
    constructor(id, title, description, status, testDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.testDate = testDate;
    }
}

// 存储报告的数组
const reports = [];

// 生成测试报告
const generateReport = (reportData) => {
    const report = new TestReport(
        uuidv4(),
        reportData.title,
        reportData.description,
        reportData.status,
        new Date().toISOString()
    );
    reports.push(report);
    return report;
};

// 创建测试报告的路由
fastify.post('/create-report', async (request, reply) => {
    try {
        const reportData = request.body;
        const report = generateReport(reportData);
        reply.send({ status: 'success', report: report });
    } catch (error) {
        reply.status(500).send({ status: 'error', message: error.message });
    }
});

// 获取所有测试报告的路由
fastify.get('/reports', async (request, reply) => {
    try {
        reply.send({ reports: reports });
    } catch (error) {
        reply.status(500).send({ status: 'error', message: error.message });
    }
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
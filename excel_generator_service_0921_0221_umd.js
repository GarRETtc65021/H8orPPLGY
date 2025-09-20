// 代码生成时间: 2025-09-21 02:21:17
const fastify = require('fastify')({
  logger: true
});

const ExcelJS = require('exceljs');
const fs = require('fs');

// 定义Excel工作簿类
class ExcelWorkbook {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  // 添加工作表
  addWorksheet(name) {
    this.workbook.addWorksheet(name);
  }

  // 添加数据行
  addDataRow(worksheetName, dataRow) {
    const worksheet = this.workbook.getWorksheet(worksheetName);
    worksheet.addRow(dataRow);
  }

  // 保存工作簿为Excel文件
  save(filename) {
    this.workbook.xlsx.writeFile(filename)
      .then(() => console.log(`Excel file saved as ${filename}`))
      .catch(err => console.error('Error saving Excel file:', err));
  }
}

// 实现Excel生成器服务
class ExcelGeneratorService {
  constructor() {
    this.excelWorkbook = new ExcelWorkbook();
  }

  // 创建Excel文件并添加数据
  createExcelWithContent(req, reply) {
    try {
      const { filename, data } = req.body;
      if (!filename || !data) {
        throw new Error('Filename and data are required');
      }

      this.excelWorkbook.addWorksheet('Sheet1');
      data.forEach((row) => {
        this.excelWorkbook.addDataRow('Sheet1', row);
      });

      const filePath = `./${filename}.xlsx`;
      this.excelWorkbook.save(filePath);

      reply.code(200).send({
        message: 'Excel file created successfully',
        filePath
      });
    } catch (err) {
      reply.code(500).send({
        message: `Error creating Excel file: ${err.message}`,
      });
    }
  }
}

// 注册路由
const excelGeneratorService = new ExcelGeneratorService();
fastify.post('/createExcel', (req, reply) => {
  excelGeneratorService.createExcelWithContent(req, reply);
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// 代码生成时间: 2025-10-03 03:37:23
const fastify = require('fastify')({ logger: true });
const noble = require('@abandonware/noble');

// 定义蓝牙设备通信服务
class BluetoothService {
  // 初始化蓝牙服务
  constructor() {
    this.characteristics = new Map();
  }

  // 开始扫描蓝牙设备
  startScanning() {
    noble.on('stateChange', async (state) => {
      if (state === 'poweredOn') {
        try {
          await this.scanForDevices();
        } catch (error) {
          console.error('Error scanning for devices:', error);
        }
      } else {
        noble.stopScanning();      }
    });
  }

  // 扫描设备
  async scanForDevices() {
    noble.startScanning([], true);
    noble.on('discover', (peripheral) => {
      console.log('Discovered device:', peripheral.advertisement.localName);
      this.characteristics.set(peripheral.id, peripheral.advertisement.serviceUuids);
    });
  }

  // 连接到设备
  async connectToDevice(deviceId) {
    const device = await noble.connect(deviceId);
    console.log('Connected to device:', deviceId);
  }

  // 读取设备特性
  async readCharacteristic(deviceId, serviceUuid, characteristicUuid) {
    const device = await noble.getConnection(deviceId);
    const service = await device.discoverServices([serviceUuid]);
    const characteristic = await service[0].discoverCharacteristics([characteristicUuid]);
    const data = await characteristic[0].readValue();
    console.log('Read data:', data.toString('hex'));
  }
}

// 创建蓝牙服务实例
const bluetoothService = new BluetoothService();

// 启动蓝牙扫描
bluetoothService.startScanning();

// 定义Fastify路由
fastify.get('/connect/:deviceId', async (request, reply) => {
  try {
    await bluetoothService.connectToDevice(request.params.deviceId);
    reply.send({ message: 'Connected to device successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to connect to device' });
  }
});

fastify.get('/read/:deviceId/:serviceUuid/:characteristicUuid', async (request, reply) => {
  try {
    await bluetoothService.readCharacteristic(
      request.params.deviceId,
      request.params.serviceUuid,
      request.params.characteristicUuid
    );
    reply.send({ message: 'Data read successfully' });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to read data' });
  }
});

// 启动Fastify服务器
const startServer = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server listening on port 3000');
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
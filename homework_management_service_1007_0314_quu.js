// 代码生成时间: 2025-10-07 03:14:34
const fastify = require('fastify')({ logger: true });
const { MongoClient } = require('mongodb');

// MongoDB Connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'homework_management';

// Define the Homework schema
class Homework {
  constructor(id, title, description, dueDate, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
  }
}

// MongoDB collection
let homeworkCollection;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    throw err;
  }

  const db = client.db(dbName);
  homeworkCollection = db.collection('homework');
  fastify.listen(3000, (err, address) => {
    if (err) throw err;
    fastify.log.info(`Homework management service is listening on ${address}`);
  });
});

// Registering routes
// Create a new homework assignment
fastify.post('/homework', async (request, reply) => {
  try {
    const { title, description, dueDate, status } = request.body;
    const newHomework = new Homework(
      Mongo.ObjectID(), title, description, dueDate, status
    );
    const result = await homeworkCollection.insertOne(newHomework);
    reply.code(201).send({
      id: result.insertedId,
      message: 'Homework assignment created successfully'
    });
  } catch (error) {
    reply.code(500).send({
      message: 'Failed to create homework assignment',
      error: error.message
    });
  }
});

// Get all homework assignments
fastify.get('/homework', async (request, reply) => {
  try {
    const homeworks = await homeworkCollection.find({}).toArray();
    reply.send(homeworks);
  } catch (error) {
    reply.code(500).send({
      message: 'Failed to retrieve homework assignments',
      error: error.message
    });
  }
});

// Update a homework assignment
fastify.put('/homework/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const updateData = {
      $set: {
        ...request.body
      }
    };
    const result = await homeworkCollection.updateOne({ _id: Mongo.ObjectID(id) }, updateData);
    if (result.modifiedCount === 0) {
      reply.code(404).send({
        message: 'Homework assignment not found'
      });
    } else {
      reply.send({
        message: 'Homework assignment updated successfully',
        id: id
      });
    }
  } catch (error) {
    reply.code(500).send({
      message: 'Failed to update homework assignment',
      error: error.message
    });
  }
});

// Delete a homework assignment
fastify.delete('/homework/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const result = await homeworkCollection.deleteOne({ _id: Mongo.ObjectID(id) });
    if (result.deletedCount === 0) {
      reply.code(404).send({
        message: 'Homework assignment not found'
      });
    } else {
      reply.send({
        message: 'Homework assignment deleted successfully',
        id: id
      });
    }
  } catch (error) {
    reply.code(500).send({
      message: 'Failed to delete homework assignment',
      error: error.message
    });
  }
});
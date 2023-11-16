// services/redisService.js
const redis = require('redis');
require('dotenv').config();

let redisClient;

function createRedisClient() {
  return redis.createClient({
    // Your Redis server configuration
    host: 'localhost',
    port: process.env.REDIS_PORT,
    pass:'',
    legacyMode: true ,
  });
}

 getRedisClient = () =>{
  if (!redisClient || redisClient.status === 'end') {
    redisClient = createRedisClient();

    // Handle Redis connection events
    redisClient.on('error', (err) => {
      console.error('Redis Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  return redisClient;
}

setFormData =  (formData) => {
  const client = getRedisClient();
  if (client.connected) {
    client.set('formData', JSON.stringify(formData));
  } else {
    console.error('Redis client is not connected.');
  }
}

getFormData = (callback) => {
  const client = getRedisClient();
  if (client.connected) {
    client.get('formData', (err, data) => {
      if (err) throw err;
      callback(data ? JSON.parse(data) : null);
    });
  } else {
    console.error('Redis client is not connected.');
    callback(null);
  }
}

clearFormData = () => {
  const client = getRedisClient();
  if (client.connected) {
    client.del('formData');
  } else {
    console.error('Redis client is not connected.');
  }
}

module.exports = {
  getRedisClient, setFormData, getFormData, clearFormData
};

import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';
import config from './utils/configs.js';
import redis from 'redis';

const app = express();
const server = createServer(app);
const PORT = config.serverPort;

const router = express.Router();
// connect Redis
export const redisClient = redis.createClient({
  url: `redis://${config.redisUsername}:${config.redisPassword}@${config.redisHost}:${config.redisPort}/0`,
  legacyMode: true,
});
redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기존은 콜백 기반이고, v4 버전은 Promise 기반

let bool = await redisCli.set('key', '123'); // OK
let data = await redisCli.get('key'); // 123
console.log(data);

// static file(html, css, js) serve middleware
app.use(express.static('public'));
// body parser middleware
app.use(express.json());
// content-type이 form인 경우, body data 가져옴
app.use(express.urlencoded({ extended: false }));

initSocket(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const assets = await loadGameAssets();
    //console.log(assets);
    console.log('Assets loaded successfully');
  } catch (error) {
    console.error('Failed to load game assets:', error);
  }
});

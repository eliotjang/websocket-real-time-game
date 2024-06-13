import { CLIENT_VERSION } from './Constants.js';
import { setHighScore } from './index.js';
import Score from './Score.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

socket.on('broadcast', (data) => {
  console.log(`${data.broadcast[0]} 님이 최고 점수를 달성 했습니다.`);
  console.log(`현재 최고 점수 : ${data.broadcast[1]}`);
  Score.setHighScore(data.broadcast[1]);
});

export { sendEvent };

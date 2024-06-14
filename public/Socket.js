import { CLIENT_VERSION } from './Constants.js';
import Score from './Score.js';

const socket = io('http://13.209.73.219:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  if (data.score) {
    Score.setHighScore(data.score);
  }
  console.log(data);
});
socket.on('event', (data) => {
  if (data.score) {
    Score.setHighScore(data.score);
  }
  console.log(data);
});

socket.on('connection', (data) => {
  const user = window.localStorage.getItem('client');
  if (user) {
    console.log(`클라이언트 정보가 확인됐습니다. ${user}`);
    userId = user;
  } else {
    console.log('connection: ', data);
    userId = data.uuid;
    window.localStorage.setItem('client', userId);
    console.log(`클라이언트 정보가 확인되지 않았습니다. ${userId}`);
  }

  if (data.highRecord) {
    console.log(data.highRecord);
  } else {
    console.log('최고 점수에 도전해보세요!');
  }
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
  Score.setHighScore(data.broadcast[1]);
});

export { sendEvent };

import { getGameAssets } from '../init/assets.js';

const INTERVAL_MIN = 5;
let getItemTime = null;

// 아이템 생성 시간 검증
export const acquireItemHandler = (userId, payload) => {
  const { items } = getGameAssets();

  const { itemId, timestamp } = payload;

  // 처음 아이템 획득 시, 아이템 검증 시작
  if (!getItemTime) {
    getItemTime = timestamp;
    return { status: 'success', message: 'begin item verification' };
  }

  const index = items.data.findIndex((e) => e.id === itemId);
  const responseTime = items.data[index].responseTime;

  const elapsedTime = (timestamp - getItemTime) / 1000;

  // 아이템에 따른 생성시간과 아이템 실제 획득 시간 출력
  console.log(`responseTime : ${responseTime}, elapsedTime : ${elapsedTime}`);

  // 아이템 최소 생성 시간(5초)보다 작을 시 아이템 획득 인증 실패
  if (elapsedTime < INTERVAL_MIN) {
    return { status: 'fail', message: 'item verification failed' };
  }

  getItemTime = timestamp;

  return { status: 'success', message: 'item verification successfully' };
};

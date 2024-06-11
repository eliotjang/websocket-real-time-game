// 스테이지 정보를 객체에 {key: uuid, value: array}의 형태로 uuid를 Key로 저장
// value: array에는 stageId를 가진 객체 저장
const stages = {};

export const createStage = (uuid) => {
  stages[uuid] = []; // 초기 스테이지 배열 생성
};

export const getStage = (uuid) => {
  return stages[uuid];
};

// 기존에 stageId만 저장했던 것에서
// stageId와 timeStamp 2가지를 저장
export const setStage = (uuid, id, timestamp) => {
  return stages[uuid].push({ id, timestamp });
};

export const clearStage = (uuid) => {
  return (stages[uuid] = []);
};

/*
stages = {
  001: [{
    id: 1000,
    timestamp: 12345
  },
  {
    id: 1001,
    timestamp: 12350
  }]
}
*/

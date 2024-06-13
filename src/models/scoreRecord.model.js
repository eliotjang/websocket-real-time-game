// 점수 정보를 객체에 {key: uuid, value: score}의 형태로 uuid를 Key로 저장
// value: score에는 가장 높은 점수 저장
const scoreRecord = {};

export const createScoreRecord = (uuid) => {
  scoreRecord[uuid] = 0; // 기본 점수 0점 저장
};

export const getScoreRecord = (uuid) => {
  return scoreRecord[uuid];
};

export const setScoreRecord = (uuid, score) => {
  return (scoreRecord[uuid] = score);
};

export const clearScoreRecord = (uuid) => {
  return (scoreRecord[uuid] = 0);
};

export const getHighScoreRecord = () => {
  const sortable = [];
  for (const uuid in scoreRecord) {
    sortable.push([uuid, scoreRecord[uuid]]);
  }

  sortable.sort((a, b) => b[1] - a[1]);

  return sortable[0];
};

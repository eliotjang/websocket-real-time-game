export const scoreRecordHandler = (userId, payload) => {
  return {
    status: 'success',
    message: 'broadcast successfully',
    broadcast: `${userId} score is ${payload.score}`,
  };
};

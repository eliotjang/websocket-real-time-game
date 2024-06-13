import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { acquireItemHandler } from './item.handler.js';
import { scoreRecordHandler } from './scoreRecord.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  21: acquireItemHandler,
  31: scoreRecordHandler,
};

export default handlerMappings;

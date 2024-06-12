import { sendEvent } from './Socket.js';
import stages from './assets/stage.json' with { type: 'json' };
import items from './assets/item.json' with { type: 'json' };

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange1 = true;
  stageChange2 = true;
  stageChange3 = true;
  stageChange4 = true;
  stageChange5 = true;
  stageChange6 = true;
  stageLevel = 0;
  scorePerSecond = 1;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.scorePerSecond = stages.data[this.stageLevel].scorePerSecond;

    this.score += deltaTime * 0.001 * this.scorePerSecond;
    // 점수가 10점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 10 && this.stageChange1) {
      console.log('get in 10 score loop');
      this.stageChange1 = false;
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
      this.stageLevel++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 20점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 20 && this.stageChange2) {
      console.log('get in 20 score loop');
      this.stageChange2 = false;
      sendEvent(11, { currentStage: 1001, targetStage: 1002 });
      this.stageLevel++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 30점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 30 && this.stageChange3) {
      console.log('get in 30 score loop');
      this.stageChange3 = false;
      sendEvent(11, { currentStage: 1002, targetStage: 1003 });
      this.stageLevel++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 40점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 40 && this.stageChange4) {
      console.log('get in 40 score loop');
      this.stageChange4 = false;
      sendEvent(11, { currentStage: 1003, targetStage: 1004 });
      this.stageLevel++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 50점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 50 && this.stageChange5) {
      console.log('get in 50 score loop');
      this.stageChange5 = false;
      sendEvent(11, { currentStage: 1004, targetStage: 1005 });
      this.stageLevel++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 60점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 60 && this.stageChange6) {
      console.log('get in 60 score loop');
      this.stageChange6 = false;
      sendEvent(11, { currentStage: 1005, targetStage: 1006 });
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
  }

  // 현재 스테이지 레벨 리턴 [ 0스테이지 ~ 5스테이지 ]
  getStageLevel() {
    return this.stageLevel;
  }

  getItem(itemId) {
    // 아이템 획득시 점수 변화
    console.log(`before get item Score : ${this.score}`);
    this.score += 10;
    console.log(`after get item Score : ${this.score}`);

    // 5. Update 아이템 별 획득 점수 구분 시 추가 로직
    // 아이템 id와 점수 출력
    // console.log(`itemId : ${itemId}, itemScore : ${items.data[index].score}`);

    // 현재 점수에 아이템 획득 점수 추가
    // console.log(`before get item Score : ${this.score}`);
    // this.score += items.data[index].score;
    // console.log(`after get item Score : ${this.score}`);
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;

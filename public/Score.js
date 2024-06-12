import { sendEvent } from './Socket.js';
import stages from './assets/stage.json' with { type: 'json' };
import items from './assets/item.json' with { type: 'json' };

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  stageLevel = 1;
  currentStageId = 1000;
  targetStageId = 1001;
  scorePerSecond = 1;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  moveNextStage() {
    stageLevel++;
    console.log(`Stage Level : ${this.stageLevel}`);
    sendEvent(11, { currentStage: currentStageId, targetStage: targetStageId });
    this.currentStageId = this.targetStageId;
    this.targetStageId++;
  }

  update(deltaTime) {
    this.scorePerSecond = stages.data[this.stageLevel].scorePerSecond;
    this.score += deltaTime * 0.001 * this.scorePerSecond;

    const index = stages.data.findIndex((e) => e.id === this.targetStageId);
    const nextStageScore = stages.data[index].score;

    if (!nextStageScore) {
      this.stageChange = false;
    }

    if (Math.floor(this.score) >= nextStageScore && this.stageChange) {
      this.moveNextStage();
    }

    /* 
    // 점수가 100점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 100 && this.stageChange1) {
      console.log('[Stage 1] get in 100 score!');
      this.stageChange1 = false;
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
      this.stageLevel++;
      this.stageId++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 200점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 200 && this.stageChange2) {
      console.log('[Stage 2] get in 200 score!');
      this.stageChange2 = false;
      sendEvent(11, { currentStage: 1001, targetStage: 1002 });
      this.stageLevel++;
      this.stageId++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 300점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 300 && this.stageChange3) {
      console.log('[Stage 3] get in 300 score!');
      this.stageChange3 = false;
      sendEvent(11, { currentStage: 1002, targetStage: 1003 });
      this.stageLevel++;
      this.stageId++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 400점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 400 && this.stageChange4) {
      console.log('[Stage 4] get in 400 score!');
      this.stageChange4 = false;
      sendEvent(11, { currentStage: 1003, targetStage: 1004 });
      this.stageLevel++;
      this.stageId++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 500점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 500 && this.stageChange5) {
      console.log('[Stage 5] get in 500 score!');
      this.stageChange5 = false;
      sendEvent(11, { currentStage: 1004, targetStage: 1005 });
      this.stageLevel++;
      this.stageId++;
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    }
    // 점수가 600점 이상이 될 시 서버에 메시지 전송
    if (Math.floor(this.score) >= 600 && this.stageChange6) {
      console.log('[Stage 6] get in 600 score!');
      this.stageChange6 = false;
      sendEvent(11, { currentStage: 1005, targetStage: 1006 });
      console.log(`scorePerSecond : ${this.scorePerSecond}`);
    } */
  }

  // 현재 스테이지 레벨 리턴
  getStageLevel() {
    return this.stageLevel;
  }

  getItem(itemId) {
    // 현재 점수에 아이템 획득 점수 추가
    const index = items.data.findIndex((e) => e.id === itemId);
    console.log(`before get item Score : ${this.score}`);
    this.score += items.data[index].score;
    console.log(`after get item Score : ${this.score}`);

    // 아이템 획득 시 서버에 메시지 전송
    sendEvent(21, {
      itemId,
      score: items.data[index].score,
      stageId: this.stageId,
      timestamp: Date.now(),
    });
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

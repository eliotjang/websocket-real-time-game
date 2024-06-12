import Item from './Item.js';
import item_unlock from './assets/item_unlock.json' with { type: 'json' };
import items from './assets/item.json' with { type: 'json' };

class ItemController {
  // 아이템 최소 생성시간 5초
  INTERVAL_MIN = 5000;
  //INTERVAL_MAX = 12000;

  nextInterval = null;
  items = [];

  constructor(ctx, itemImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.itemImages = itemImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    // item id가 1인 아이템 생성
    this.setNextItemTime(1);
  }

  // 아이템 생성 시간 설정
  setNextItemTime(itemId) {
    const index = items.data.findIndex((e) => e.id === itemId);
    const responseTime = items.data[index].responseTime * 1000;

    //this.nextInterval = responseTime;
    this.nextInterval = this.getRandomNumber(this.INTERVAL_MIN, responseTime);

    console.log(`item id : ${itemId}, item nextInterval : ${this.nextInterval}`);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createItem(stageLevel) {
    // item_unlock.json의 데이터 테이블 item_id
    const itemId = item_unlock.data[stageLevel].item_id;

    // 생성 가능한 아이템 id 목록 출력
    //console.log(itemId);

    //const index = this.getRandomNumber(0, this.itemImages.length - 1);
    // item_id의 index중 하나를 랜덤으로 가져옴
    const index = this.getRandomNumber(0, itemId.length - 1);
    // index의 item_id의 값 할당
    const itemInfo = this.itemImages[itemId[index] - 1];

    // 아이템 id 및 이미지 내용 출력
    //console.log(`item id : ${itemId[index]}`);
    console.log(itemInfo.image);

    const x = this.canvas.width * 1.5;
    const y = this.getRandomNumber(10, this.canvas.height - itemInfo.height);

    const item = new Item(
      this.ctx,
      itemInfo.id,
      x,
      y,
      itemInfo.width,
      itemInfo.height,
      itemInfo.image,
    );

    this.items.push(item);

    // 생성한 아이템 ID 반환
    return itemId[index];
  }

  update(gameSpeed, deltaTime, stageIndex) {
    if (this.nextInterval <= 0) {
      const itemId = this.createItem(stageIndex);
      this.setNextItemTime(itemId);
    }

    this.nextInterval -= deltaTime;

    this.items.forEach((item) => {
      item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
    });

    this.items = this.items.filter((item) => item.x > -item.width);
  }

  draw() {
    this.items.forEach((item) => item.draw());
  }

  collideWith(sprite) {
    const collidedItem = this.items.find((item) => item.collideWith(sprite));
    if (collidedItem) {
      this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height);
      return {
        itemId: collidedItem.id,
      };
    }
  }

  reset() {
    this.items = [];
  }
}

export default ItemController;

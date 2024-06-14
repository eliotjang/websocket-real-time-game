# WebSocket Real-Time Game Server

### 패킷 구조 설계

- 소켓 송수신 네임 스페이스

  - `connection` : 클라이언트와 서버의 연결 설정
  - `response` : 클라이언트에서 요청한 내용을 서버가 송수신
  - `broadcast` : 서버에서 모든 유저에게 결과를 송신
  - `event` : 클라이언트에 수신한 모든 서비스 이벤트 처리
  - `disconnect` : 클라이언트와 서버의 연결 해제

- 패킷 구조

  - `userId` : 서버에서 생성한 UUID
  - `clientVersion` : 클라이언트 / 서버가 사용하고 있는 데이터 테이블 버전
  - `handlerId` : 서버에서 사용하는 핸들러 맵핑 번호
  - `payload` : 클라이언트 / 서버 소켓 통신 간 주고받는 메타데이터

- gameStart 핸들러 반환값

  - `status` : 소켓 통신 반환 상태 (`success`)
  - `score` : 서버에서 저장한 최고 점수

- gameEnd 핸들러 반환값

  - `status` : 소켓 통신 반환 상태 (`success` , `fail`)
  - `message` : 서버가 수행한 로직에 따른 메시지
  - `score` : 성공적으로 반환될 경우, 클라이언트가 송신한 점수를 반환

- acquireItemHandler 핸들러 반환값

  - `status` : 소켓 통신 반환 상태 (`success` , `fail`)
  - `message` : 서버가 수행한 로직에 따른 메시지

- moveStagehandler 핸들러 반환값
  - `status` : 소켓 통신 반환 상태 (`success` , `fail`)
  - `message` : 서버가 수행한 로직에 따른 메시지

### 데이터 테이블

- stage 데이터 테이블

  ```json
  {
    "name": "stage",
    "version": "1.0.0",
    "data": [
      { "id": 1000, "score": 0, "scorePerSecond": 1 },
      { "id": 1001, "score": 100, "scorePerSecond": 2 },
      { "id": 1002, "score": 200, "scorePerSecond": 4 },
      { "id": 1003, "score": 300, "scorePerSecond": 8 },
      { "id": 1004, "score": 400, "scorePerSecond": 16 },
      { "id": 1005, "score": 500, "scorePerSecond": 32 },
      { "id": 1006, "score": 600, "scorePerSecond": 64 }
    ]
  }
  ```

- item 데이터 테이블

  ```json
  {
    "name": "item",
    "version": "1.0.0",
    "data": [
      { "id": 1, "score": 10, "responseTime": 11 },
      { "id": 2, "score": 20, "responseTime": 12 },
      { "id": 3, "score": 30, "responseTime": 13 },
      { "id": 4, "score": 40, "responseTime": 14 },
      { "id": 5, "score": 50, "responseTime": 15 },
      { "id": 6, "score": 60, "responseTime": 16 }
    ]
  }
  ```

- item_unlock 데이터 테이블
  ```json
  {
    "name": "item_unlock",
    "version": "1.0.0",
    "data": [
      { "id": 100, "stage_id": 1000, "item_id": [1] },
      { "id": 101, "stage_id": 1001, "item_id": [1] },
      { "id": 201, "stage_id": 1002, "item_id": [1, 2] },
      { "id": 301, "stage_id": 1003, "item_id": [1, 2, 3] },
      { "id": 401, "stage_id": 1004, "item_id": [1, 2, 3, 4] },
      { "id": 501, "stage_id": 1005, "item_id": [1, 2, 3, 4, 5] },
      { "id": 601, "stage_id": 1006, "item_id": [1, 2, 3, 4, 5, 6] }
    ]
  }
  ```

### 구현 내용

- [스테이지 구분](https://github.com/eliotjang/websocket-real-time-game/pull/2)
- [스테이지 구분에 따른 점수 획득](https://github.com/eliotjang/websocket-real-time-game/pull/5)
- [스테이지에 따른 아이템 생성](https://github.com/eliotjang/websocket-real-time-game/pull/7)
- [아이템 획득 시 점수 획득](https://github.com/eliotjang/websocket-real-time-game/pull/9)
- [아이템 생성시간에 따른 아이템 획득 시간 검증](https://github.com/eliotjang/websocket-real-time-game/pull/10)
- [아이템 별 획득 점수 구분](https://github.com/eliotjang/websocket-real-time-game/pull/12)
- [Broadcast 기능 추가](https://github.com/eliotjang/websocket-real-time-game/pull/17)
- [가장 높은 점수 Record 관리](https://github.com/eliotjang/websocket-real-time-game/pull/19)
- [유저 정보 연결](https://github.com/eliotjang/websocket-real-time-game/pull/22)
- [Redis 연동](https://github.com/eliotjang/websocket-real-time-game/pull/24)

### BackEnd 스킬

- Node.js 웹 프레임워크
- Express.js 서버 프레임워크
- WebSocket 웹 소켓 라이브러리
  - Socket.io
- Redis 인메모리 데이터 구조 저장소

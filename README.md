<h1 align="center">Welcome to Catch My Mind 🎄</h1>
<p>
  <a href="https://github.com/connect-foundation/2019-15/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

### :house: http://catchmymind.shop/

## Introduction

#### 캐치마인드를 웹으로 즐길 수 있는 캐치 마이 마인드
남녀노소 즐길 수 있는 캐주얼 웹 게임 **캐치 마이 마인드**입니다!
여러분의 창의력을 마음껏 발휘해 보세요!

#### Description
- pc게임인 캐치마인드를 웹게임으로 구현
- 출제자가 그림을 그리면 채팅으로 답을 맞추는 게임
- 참고: https://skribbl.io/
- 로그인 기능(Oauth)를 추가하여 친구기능, 랭킹기능, 과거 게임기록을 볼 수 있도록 구현
- 회원끼리 할 수 있는 랜덤게임과 친구끼리 비회원으로 할 수 있는 비밀게임 존재

## Team
|          | 손진아                     | 이지영             | 이창권             | 최형준                    |
| -------- | ----------------------- | --------------- | --------------- | ---------------------- |
| Sprint_1 | 친구 조회, 삭제, 요청 구현              | 웹소켓으로 게임시작기능 구현 | CI/CD 및 환경 설정   | OAuth 구현               |
| Sprint_2 | 친구 요청 수락 및 거절 구현 | 게임화면 유저리스트 구현   | 전체 랭킹, 친구 랭킹 구현 | 자동 로그인, 배포 환경에서의 OAuth |
| Sprint_3 |                         |                 |                 |                        |
| Sprint_4 |                         |                 |                 |                        |
| Sprint_5 |                         |                 |                 |                        |
| Sprint_6 |                         |                 |                 |                        |


## Directory
### Frontend
```
./
├── conf/                     # 설정 파일
├── public/                   # 정적 문서 
├── src/                      # 소스 파일
|    ├── asset/               # 어셋 파일 
|    ├── components/          # 컴포넌트
|    ├── logics/              # 컴포넌트에 주입할 로직
|    ├── pages/               # 페이지(뷰) 컴포넌트
|    ├── queries/             # 쿼리 파일
|    ├── themes/              # 테마(글로벌 스타일)
|    ├── util/                # 유틸리티 파일
|    ├── index.js             # 엔트리 포인트
|    ├── Router.js            # 라우터
|    └── serviceWorker.js     # 빌드 시 실행되는 파일
└── test/                     # 테스트 파일
```

### Backend
```
./
├── bin/                      # Express 실행 파일
├── config/                   # 각종 환경설정 파일
├── db/                       # DB 및 sequelize 관련 파일
|   ├── migrations/           # 마이그레이션 파일들 (sequelize-cli)
|   ├── models/               # 모델 파일 (sequelize-cli)
|   └── seeders/              # 시더 파일 (sequelize-cli)    
├── graphql/                  # graphQL 관련 폴더
|   ├── resolvers/            # 리졸버 파일
|   ├── typeDefs/             # 타입 파일
|   └── schema.js             # 스키마
├── middlewares/              # 커스텀 미들웨어
├── router/                   # 라우터
├── secket/                   # 소켓 관련 파일
├── test/                     # 테스트 파일
└── util/                     # 유틸리티 파일
```


## Environment
- FRONT
    - react
    - apollo-boost
    - styled-component
- BACK
    - express
    - passport
    - jsonwebtoken
    - graphql
    - sequelize
    - socket.io
- CI/CD
    - travis CI
- SERVER
    - docker
- DB
    - mysql 5.7
- VCS
    - git
    - gitflow
- etc
    - eslint (airbnb)
    
## Document
### [그라운드 룰](https://github.com/connect-foundation/2019-15/wiki/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0)

### [Wiki](https://github.com/connect-foundation/2019-15/wiki)

## Getting started


initialize tables

```
npx sequelize db:migrate --env local
npx sequelize db:seed:all --env local
```

run server 🐳

```
cd back
npm install
npm run local
```


run front 🎄

```
cd front
npm install
npm start
```

## Test 🕹

```
npm run test:local
```

## Show your support


Give a ⭐️ if this project helped you!

---

\_This README was generated with ❤️

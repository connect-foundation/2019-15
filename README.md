<h1 align="center"><img src="https://github.com/connect-foundation/2019-15/blob/master/front/src/asset/mainlogo_yellowpink.png?raw=true" style="width: 80%;"></h1>
<p>
  <a href="https://github.com/connect-foundation/2019-15/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://travis-ci.org/connect-foundation/2019-15" target="_blank">
    <img alt="travis-build-status" src="https://travis-ci.org/connect-foundation/2019-15.svg?branch=master" />
  </a>
</p>

![GitHub language count](https://img.shields.io/github/languages/count/connect-foundation/2019-15)
![GitHub top language](https://img.shields.io/github/languages/top/connect-foundation/2019-15)
![W3C Validation](https://img.shields.io/w3c-validation/html?preset=HTML%2C%20SVG%201.1%2C%20MathML%203.0&targetUrl=http%3A%2F%2Fcatchmymind.shop)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/connect-foundation/2019-15)
![GitHub repo size](https://img.shields.io/github/repo-size/connect-foundation/2019-15)
![GitHub All Releases](https://img.shields.io/github/downloads/connect-foundation/2019-15/total)
![GitHub issues](https://img.shields.io/github/issues/connect-foundation/2019-15)
![GitHub closed issues](https://img.shields.io/github/issues-closed/connect-foundation/2019-15)
![GitHub pull requests](https://img.shields.io/github/issues-pr/connect-foundation/2019-15)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/connect-foundation/2019-15)
![GitHub](https://img.shields.io/github/license/connect-foundation/2019-15)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/connect-foundation/2019-15?include_prereleases)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/connect-foundation/2019-15)
![Website](https://img.shields.io/website?url=http%3A%2F%2Fcatchmymind.shop)

## Link
### Release
:house: http://catchmymind.shop/
### Develop
:computer: http://catchyourmind.shop/

## Introduction

#### 캐치마인드를 웹으로 즐길 수 있는 캐치 마이 마인드
남녀노소 즐길 수 있는 캐주얼 웹 게임 **캐치 마이 마인드**입니다!
여러분의 창의력을 마음껏 발휘해 보세요!

#### Description
- PC 게임인 캐치마인드를 웹게임으로 구현하였습니다.
- 출제자가 그림을 그리면 이외의 플레이어가 채팅으로 답을 맞추는 웹 게임입니다.
- 기본적으로 회원제 서비스로서, 다른 유저에게 친구 신청을 보낼 수 있으며, 친구 신청을 수락하거나 거절할 수 있습니다.
- 회원끼리 할 수 있는 랜덤 게임과 친구끼리 비회원으로도 즐길 수 있는 비밀 게임, 두가지 게임 모드가 있습니다.
- 전체 회원 및 친구들의 점수를 랭킹을 통해 확인할 수 있으며, 게임에서 점수를 획득하여 랭킹을 올릴 수 있습니다.
- 과거의 게임 기록을 움짤의 형태로 조회할 수 있습니다.
- 나의 닉네임과 캐릭터를 변경할 수 있습니다.
- 참고: https://skribbl.io/

## Team
🙎‍♀️ [손진아](https://github.com/hos101010) - 팀과 함께 성장하고자 합니다.  
💁‍♂️ [이지영](https://github.com/eminem54) - 문제해결을 위해 끊임없이 고민하는 개발자입니다.  
🤷‍♂️ [이창권](https://github.com/changgunyee) - 재밌는 것을 만들고 싶은 개발자입니다.  
🙋‍♂️ [최형준](https://github.com/Einere) - 🌐지속 가능한 웹 개발자를 지향합니다.  

### Sprint
|          | 손진아                     | 이지영             | 이창권             | 최형준                    |
| -------- | ----------------------- | --------------- | --------------- | ---------------------- |
| Sprint 1 | 친구 기능 구현             | 웹소켓으로 게임시작기능 구현 | CI/CD 및 환경 설정   | OAuth 구현               |
| Sprint 2 | 단어 db 구축, 단어 선택 기능 구현 | 게임화면 유저리스트 구현   | 전체 랭킹, 친구 랭킹 구현 | 자동 로그인, 배포 환경에서의 OAuth |
| Sprint 3 | 채팅 기능 구현                       |비밀게임 시작구현                 | 친구 초대 알람, 닉네임 변경 | 전체적인UI, 타이머, 단어 미리보기  |
| Sprint 4 | 디자인 변경  | 리팩토링, 버그픽스    | 캔버스 소켓 통신, 알림 리팩토링 |  문제 종료, 라운드 변경, 프론트 코드 리팩토링(지영이와 페어 코딩) |
| Sprint 5 |   정답 기능 구현, 친구 리팩토링     |  아바타 선택 기능  | 캔버스 툴 추가, 게임 초대 | 타이머 정확도 개선, 난입에 대한 예외처리, 게임 종료 로직 구현 |
| Sprint 6 |                         |                 |                 |                        |

## Environment
- FRONT
    - React
    - apollo-boost
    - styled-component
    - Fabric.js
    - three.js
- BACK
    - Express
    - Passport.js
    - JSON Web Token
    - GraphQL
    - Sequelize
    - Socket.IO
    - NODE-CACHE
- CI/CD
    - Travis CI
- SERVER
    - Docker
- DB
    - MySQL 5.7
- VCS
    - Git
    - Git Flow
- TEST
    - Jest
- etc
    - ESLint (airbnb)

## Directory
### Frontend
<details>
  <summary>펼치기 / 접기</summary>
  <div>

```
./
├── conf/                     # 설정 파일
├── public/                   # 정적 문서 
├── src/                      # 소스 파일
|    ├── asset/               # 어셋 파일 
|    ├── components/          # 컴포넌트
|    ├── constant/            # 상수
|    ├── hooks/               # 커스텀 훅
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

  </div>
</details>

### Backend
<details>
  <summary>펼치기 / 접기</summary>
  <div>

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

  </div>
</details>

## Core Skills
- authentication with Passport.js and OAuth 2.0
- access control with Json Web Token
- WebSocket
    - Socket Room
    - Throttle
    - Debounce
    - Expoenetial Reconnection
- requestAnimationFrame in React
- canvas with Fabric.js and custom drawing tool
- cursor based lazy loading and infinite scroll
    
## Document
### [Ground Rule](https://github.com/connect-foundation/2019-15/wiki/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0)

### [Sharing Technology](https://github.com/connect-foundation/2019-15/wiki/%EA%B8%B0%EC%88%A0-%EA%B3%B5%EC%9C%A0)

### [Wiki](https://github.com/connect-foundation/2019-15/wiki)

## Getting started
Initialize DB Tables

```
npx sequelize db:migrate --env local
npx sequelize db:seed:all --env local
```

Run Server 🐳

```
cd back
npm install
npm run local
```


Run Front 🎄

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

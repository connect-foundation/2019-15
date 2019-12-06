/* 
mock 방식 테스트라는게 가짜 객체를 만들어 테스트 하는것 같은데요
그렇게 되면 소켓이 문제가 없는지 테스트 한다기 보단
소켓 이벤트 내에서 동작하는 로직만 테스트한다고 보는게 맞나요?
대부분의 소켓 테스트를 보면 외부 서버와 통신하지 않고 테스트에서 서버를 열고
이벤트를 호출해서 정상적으로 동작하는지만 확인하는것 같습니다.
*/

/*
또한 외부서버와 통신을 하게 되면 소켓이 바로 connected false 가 되어
다른 테스트를 진행 할 수가 없습니다. 한번 커넥트는 성공했다고 서버에 로그가 찍히는데
이유가 뭔지 잘 모르겠습니다.
mock으로 진행하는게 맞는걸까요?
*/
describe("소켓 테스트", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.REACT_APP_LOCAL_API_URI;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("소켓 연결 테스트", done => {
    process.env.REACT_APP_LOCAL_API_URI = "http://localhost:3000";
    const { connectGameSocket } = require("../../../src/logics/socketLogic");
    const gameSocket = connectGameSocket();
    expect(gameSocket).toBeTruthy();
    done();
  });
});

// describe('소켓 테스트', () => {
//   const OLD_ENV = process.env;

//   beforeEach(() => {
//     jest.resetModules(); // this is important - it clears the cache
//     process.env = { ...OLD_ENV };
//     delete process.env.REACT_APP_LOCAL_API_URI;
//   });

//   afterEach(() => {
//     process.env = OLD_ENV;
//   });

//   it('소켓 연결 테스트', (done) => {
//     process.env.REACT_APP_LOCAL_API_URI = 'http://localhost:3000';
//     const { connectGameSocket } = require('../../../src/logics/socketLogic');
//     const gameSocket = connectGameSocket();
//     expect(gameSocket).toBeTruthy();
//     done();
//   });
// });

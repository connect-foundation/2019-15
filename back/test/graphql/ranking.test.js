const { req, graphqlPath } = require('./setSuperTest');

describe('ranking resolvers test', () => {
  it('ranking test with order DESC limit 3 offset 1', async (done) => {
    const res = await req
      .post(graphqlPath)
      .send({
        query: `{
           ranking(order:DESC, limit:3, offset:1){
             score 
           }
         }`,
      })
      .expect(200);
    const { ranking } = res.body.data;
    expect(ranking.length).toEqual(3);
    ranking.forEach((user, idx) => {
      if (idx >= ranking.length - 1) return;
      expect(user.score).toBeGreaterThanOrEqual(ranking[idx + 1].score);
    });
    done();
  });

  it('ranking test with order ASC limit 1 offset 3', async (done) => {
    const res = await req
      .post(graphqlPath)
      .send({
        query: `{
           ranking(order:ASC, limit:1, offset:3){
             score 
           }
         }`,
      })
      .expect(200);
    const { ranking } = res.body.data;
    expect(ranking.length).toEqual(1);
    ranking.forEach((user, idx) => {
      if (idx >= ranking.length - 1) return;
      expect(user.score).toBeLessThanOrEqual(ranking[idx + 1].score);
    });
    done();
  });
});

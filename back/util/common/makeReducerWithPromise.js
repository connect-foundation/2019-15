function makeReducerWithPromise(query, updateAcc) {
  return async function(acc, val, index, array) {
    const queryResult = await query(val);

    if (acc instanceof Promise) acc = await acc;

    return updateAcc(acc, queryResult, val);
  };
}

module.exports = makeReducerWithPromise;

const { dateDiffInHours } = require('./helpers');

const store = {};

function clearOldEntries(key) {
  const keyRecords = store[key];
  let clearUpToIndexExclusive = -1;

  for (let i = 0; i < keyRecords.length; i++) {
    const now = new Date();
    if (dateDiffInHours(now, keyRecords[i][0]) <= 1) {
      clearUpToIndexExclusive = i;
    }
  }

  if (clearUpToIndexExclusive > 0) {
    store[key].splice(0, clearUpToIndexExclusive);
  }
}

async function postKey(ctx) {
  const { key } = ctx.params;
  const { value } = ctx.request.body;

  if (value === undefined || isNaN(value) || value < 0) {
    ctx.status = 400;
    ctx.body = {
      error: 'Please pass a valid number',
    };
    return;
  }

  if (!store[key]) {
    store[key] = [];
  } else {
    clearOldEntries(key);
  }

  store[key].push([new Date(), value]);
  ctx.body = {};
}

async function getKeySum(ctx) {
  const { key } = ctx.params;

  if (!key) {
    ctx.status = 400;
    ctx.body = {
      error: 'Please pass a valid key',
    };
  } else if (!store[key]) {
    ctx.body = {
      value: 0,
    };
  } else {
    ctx.body = {
      value: store[key].reduce((acc, elem) => acc + elem[1], 0),
    };
  }
}

module.exports = {
  postKey,
  getKeySum,
};

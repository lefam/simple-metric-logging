const { isStrictlyNumeric } = require('./helpers');

const storeService = require('./services/store');

/**
 * Implements the API endpoint which registers key metrics
 *
 * @apiParam (path) {String} key The given key
 * @apiParam (body) {String} value The value to register
 */
async function postKey(ctx) {
  const { key } = ctx.params;
  const { value } = ctx.request.body;

  if (!isStrictlyNumeric(value)) {
    ctx.status = 400;
    ctx.body = {
      error: 'Please pass a valid number',
    };
    return;
  }

  storeService.postKeyValue(key, value);
  ctx.body = {};
}

/**
 * Implements the API endpoint which returns the sum of all metrics reported
 * for a key.
 *
 * @apiParam (path) {String} key The given key
 */
async function getKeySum(ctx) {
  const { key } = ctx.params;

  ctx.body = {
    value: storeService.getKeySum(key),
  };
}

module.exports = {
  postKey,
  getKeySum,
};

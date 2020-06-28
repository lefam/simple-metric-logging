const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { getKeySum, postKey } = require('./routes');

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  console.log('Log: ', ctx.method, ctx.path);
  await next();
});

router.post('/metric/:key', postKey);
router.get('/metric/:key/sum', getKeySum);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(5000);
console.log('Listening on port 5000');

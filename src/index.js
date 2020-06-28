const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { getKeySum, postKey } = require('./routes');

const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV !== 'production') {
  // This is simple middleware which shows request method and path
  // We only enable it for development.
  app.use(async (ctx, next) => {
    console.log('Log: ', ctx.method, ctx.path);
    await next();
  });
}

router.post('/metric/:key', postKey);
router.get('/metric/:key/sum', getKeySum);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on port ${port}`);

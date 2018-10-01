import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter()

router
  .post('/public/login', controllers.login.Post)
  .post('/public/wxLogin', controllers.wxLogin.Post)
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .all('/upload', controllers.upload.default)
  .get('/api/list', controllers.fosan.Get)
  .get('/api/detail', controllers.detail.Get)
  //我的朋友圈
  .post('/api/myfri/add', controllers.addMyfri.Post)
  .get('/api/myfri/list', controllers.getMyfri.Get)
  .get('/api/myfri/detail', controllers.getMyfDetail.Get)
  .get('/api/:name', controllers.api.Get)
  .post('/api/:name', controllers.api.Post)
  .put('/api/:name', controllers.api.Put)
  .del('/api/:name', controllers.api.Delect)
  .post('/auth/:action', controllers.auth.Post)
  

module.exports = router

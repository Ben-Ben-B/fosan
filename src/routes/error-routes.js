import {statusCode} from '../tool/status-code.js'
module.exports = function (a) {
  return function (ctx, next) {
    console.log('ctx')
    switch (ctx.status) {
      case 404:
        ctx.body = statusCode.ERROR_404('没有找到内容 - 404') 
        break
    }
    return next()
  }
}

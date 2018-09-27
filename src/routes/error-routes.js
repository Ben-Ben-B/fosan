import {statusCode} from '../tool/status-code.js'
module.exports = function () {
  return function (ctx, next) {
    switch (ctx.status) {
      case 404:
        ctx.body = statusCode.ERROR_404('没有找到内容 - 404') 
        break
    }
    return next()
  }
}

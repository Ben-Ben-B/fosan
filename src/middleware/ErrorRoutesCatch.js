import {statusCode} from '../tool/status-code.js'
module.exports = function () {
  return function (ctx, next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = statusCode.ERROR_120001('token失效')
          // ctx.body = {
          //   status: 401,
          //   result: {
          //     err: 'Authentication Error',
          //     errInfo: 'Protected resource, use Authorization header to get access.'
          //   }
          // }
          break
        default:
          throw err
      }
    })
  }
}

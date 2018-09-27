import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import {statusCode} from '../tool/status-code.js'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

// 用户登录的时候返回token
export let getToken =  (userInfo)=>{
  return jwt.sign({
    userInfo: userInfo // 你要保存到token的数据
  }, publicKey, { expiresIn: '7d' })
}

/**
 * 检查授权是否合法
 */
export let CheckAuth = (ctx) => {
  let token = ctx.request.header.authorization
  console.log(token,123)
  try {
    let decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.userInfo) {
      let info = typeof decoded.userInfo == 'string' ? JSON.parse(decoded.userInfo) : decoded.userInfo
      return statusCode.SUCCESS_200('验证通过',info)
      // return {
      //   status: 1,
      //   result: decoded.userInfo
      // }
    } else {
      return statusCode.ERROR_120006('token失效1')
      // return {
      //   status: 403,
      //   result: {
      //     errInfo: '没有授权'
      //   }
      // }
    }
  } catch (err) {
    return statusCode.ERROR_503('用户不存在')
    // return {
    //   status: 503,
    //   result: {
    //     errInfo: '解密错误'
    //   }
    // }
  }
}

export let Post = (ctx) => {
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(result => { ctx.body = result })
    default:
      return CheckAuth(ctx).then(result => { ctx.body = result })
  }
}

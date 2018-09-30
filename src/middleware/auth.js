
/**
 * 检查用户信息是否有改变
 */
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import {statusCode} from '../tool/status-code.js'
import {knex} from '../lib/sequelize.js'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))
module.exports = async (ctx, next) =>{
    let token = ctx.request.header.authorization
    try {
        if(token){
            let decoded = jwt.verify(token.substr(7), publicKey)
            let obj = JSON.parse(decoded.userInfo)
            let result = await knex.select('*').from('user').where({'name':obj.name,'password':obj.password}) + ''
            if(!result){
                ctx.body = statusCode.ERROR_120006('密码或账号已修改，请重新登陆')
            }else{
                await next();
            }
        }else{
            await next();
        }
    } catch (error) {
        let msg = error.sqlMessage ? error.sqlMessage : '登陆异常：' + error
        ctx.body = statusCode.ERROR_10212(msg)
    }
    
}

//微信小程序登陆
import {knex} from '../lib/sequelize.js'
import {getToken} from './auth.js'
import {statusCode} from '../tool/status-code.js'
import {formatTimeString} from '../tool/Common.js'
export let Post = async (ctx) => {
  const {name, password,nickName='',gender=3} = ctx.request.body
  const loginTime = formatTimeString(new Date(),'yyyy-MM-dd HH:mm:ss')
  const genderName = gender == 0 ? "'女'" : gender == 1 ? "'男'" : "'性别未知'"
      try {
        let result = await knex.select('*').from('user').where({'name':name,'password':password})
        let resultObj = result[0]
        if(!resultObj){
          ctx.body = statusCode.ERROR_10212('密码或账号不对') 
        }else{
         //储存登陆的用户
          await knex('loginList').insert({'nickName':nickName,'gender':gender,'genderName':genderName,'loginTime':loginTime,'loginName':name})
          //派发token
          let token = getToken(JSON.stringify(resultObj))
          ctx.body = statusCode.SUCCESS_200('success',{
            jump_path:resultObj.jump_path,
            permissions:resultObj.permissions,
            token
          }) 
        }
        
      } catch (error) {
          let msg = error.sqlMessage ? error.sqlMessage : 'login:' + error
          ctx.body = statusCode.ERROR_10212(msg)
      }
   
  }
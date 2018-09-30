import {knex} from '../lib/sequelize.js'
import {getToken} from './auth.js'
import {statusCode} from '../tool/status-code.js'
export let Post = async (ctx) => {
  const {name, password} = ctx.request.body
      try {
        let result = await knex.select('*').from('user').where({'name':name,'password':password}).map(item=>{return item.permissions}) + ''
        if(!result){
          ctx.body = statusCode.ERROR_10212('密码或账号不对') 
        }else{
          let token = getToken(JSON.stringify({name, password}))
          ctx.body = statusCode.SUCCESS_200('success',{
            permissions:result,
            token
          }) 
        }
        
      } catch (error) {
          let msg = error.sqlMessage ? error.sqlMessage : 'login:' + error
          ctx.body = statusCode.ERROR_10212(msg)
      }
   
  }
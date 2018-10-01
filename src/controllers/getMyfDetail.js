import {knex} from '../lib/sequelize.js'
import {getToken} from './auth.js'
import {statusCode} from '../tool/status-code.js'
export let Get = async (ctx) => {
     const {id} = ctx.query
      try {
        if(!id){
          ctx.body = statusCode.ERROR_10212('id不能为空') 
        }else{
          let data = await knex.select('*').from('myfri').where('id',id).map(item=>{
            item.images = JSON.parse(item.images)
            return item})
            if(!data.length){
              ctx.body = statusCode.ERROR_10212('该信息不存在') 
            }else{
              ctx.body = statusCode.SUCCESS_200('success',...data) 
            }  
        }
        
      } catch (error) {
          ctx.body = statusCode.ERROR_10212(error.sqlMessage?error.sqlMessage:error)
      }
   
  }
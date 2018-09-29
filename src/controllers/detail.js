import {knex} from '../lib/sequelize.js'
import {getToken} from './auth.js'
import {statusCode} from '../tool/status-code.js'
export let Get = async (ctx) => {
     const {id} = ctx.query
      try {
        let date = new Date;
        let year = date.getFullYear(); 
        if(!id){
          ctx.body = statusCode.ERROR_10212('id不能为空') 
        }else{
          let data = await knex.select('*').from('fsestate').where('id',id).map(item=>{
            item.age = year - item.identity_card.substr(6,4)
            let str = item.identity_card.substr(6,8)
             item.birthday = str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2)
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
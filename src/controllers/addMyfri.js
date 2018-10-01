import { knex } from '../lib/sequelize.js'
import { statusCode } from '../tool/status-code.js'
import { isJSON_Arr } from '../tool/Common.js'
//添加我的朋友圈数据
export let Post = async (ctx) => {
  const {img='', title='',content='',images=JSON.stringify([])} = ctx.request.body
  if(isJSON_Arr(images)){
    try {
      await knex('myfri').insert({'img':img,'title':title,'content':content,'images':images})
      ctx.body = statusCode.SUCCESS_200('success')
    } catch (error) {
      let msg = error.sqlMessage ? error.sqlMessage : 'add:' + error
      ctx.body = statusCode.ERROR_10212(msg)
    }
  }else{
    ctx.body = statusCode.ERROR_10212('images不是一个JSON格式的字符串')
  }
}
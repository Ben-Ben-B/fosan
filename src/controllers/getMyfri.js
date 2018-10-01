import {knex} from '../lib/sequelize.js'
import {statusCode} from '../tool/status-code.js'
export let Get = async (ctx) => {
    let { page,size } = ctx.query
    parseInt(page) < 1 ? page = 1 : ''
    parseInt(size) < 1 ? size = 10 : ''
    try {
        //返回所有查询结果
        let list = await knex.select('*').from('myfri').limit(size).offset(Number(page-1) * size).map(item=>{
          item.images = JSON.parse(item.images)
          return item
        })
        //返会列表数量
        let count = await knex('myfri').count({list:'id'}).map(item=>{return item.list})
        let data = {
            count:count[0],
            list
          }
        ctx.body = statusCode.SUCCESS_200('success',data)
    } catch (error) {
        ctx.body = statusCode.ERROR_10212(error.sqlMessage?error.sqlMessage:error)
    }
}

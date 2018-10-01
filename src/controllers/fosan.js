import {knex} from '../lib/sequelize.js'
import {statusCode} from '../tool/status-code.js'
export let Get = async (ctx) => {
    let { page,size,gender,startTime,endTime} = ctx.query
    if(!startTime&&!endTime ){
       startTime = 1900
       endTime = 2011
    }
    parseInt(page) < 1 ? page = 1 : ''
    parseInt(size) < 1 ? size = 10 : ''
    try {
        let date = new Date();
        let year = date.getFullYear(); 
        //返回所有查询结果
        // let result = await knex.select('*').from('fsestate').where('genderName','女').whereRaw(`SUBSTR(identity_card,7,4)='1996'`).limit(10)
        let list = await knex.select('*').from('fsestate').where((builder)=>{
            //判断男女
            gender==0||gender==1 ? builder.where('gender',gender) : ''
        }).whereRaw(`SUBSTR(identity_card,7,4)>'${startTime-1}'`).whereRaw(`SUBSTR(identity_card,7,4)<'${endTime+1}'`).limit(size).offset(Number(page-1) * size).map(item=>{
            item.age = year - item.identity_card.substr(6,4)
            let str = item.identity_card.substr(6,8)
            item.birthday = str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2)
            return item
        })
        //返会列表数量
        let count = await knex('fsestate').where((builder)=>{
            //判断男女
            (gender==0||gender==1)&&gender!=='' ? builder.where('gender',gender) : ''
        }).whereRaw(`SUBSTR(identity_card,7,4)>'${startTime-1}'`).whereRaw(`SUBSTR(identity_card,7,4)<'${endTime+1}'`).count({list:'id'}).map(item=>{return item.list})
        let data = {
            count:count[0],
            list
          }
        ctx.body = statusCode.SUCCESS_200('success',data)
    } catch (error) {
        ctx.body = statusCode.ERROR_10212(error.sqlMessage?error.sqlMessage:error)
    }
}
// var DB = require('../lib/sequelize.js');
// var sql = 'select * from fsestate ';
// var sql = `select mail,identity_card,positive_photo,photo,personnel_name from fsestate where genderName='女' and SUBSTR(identity_card,7,3)='199'`;
// var result = await DB.query(sql);
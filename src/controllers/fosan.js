import {knex} from '../lib/sequelize.js'
// var DB = require('../lib/sequelize.js');
export let Get = async (ctx) => {
    // var sql = 'select * from fsestate ';
    // var sql = `select mail,identity_card,positive_photo,photo,personnel_name from fsestate where genderName='女' and SUBSTR(identity_card,7,3)='199'`;
    // var result = await DB.query(sql);
    var result = await knex.select('*').from('fsestate').where('genderName','女').whereRaw(`SUBSTR(identity_card,7,4)='1996'`).limit(10)
    // console.log(result,123)
    //返回所有查询结果
    ctx.body = {
        count:result.length,
        result: 'get',
        name: result,
        para: ctx.query
      }
   
  }
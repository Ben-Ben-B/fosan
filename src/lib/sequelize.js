// import Sequelize from 'sequelize'
import { DB as DBConfig, System as SystemConfig } from '../config'
// export default new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
//   host: DBConfig.host,
//   dialect: SystemConfig.db_type,
//   dialectOptions: { // MySQL > 5.5，其它数据库删除此项
//     charset: 'utf8mb4',
//     collate: 'utf8mb4_unicode_520_ci',
//     supportBigNumbers: true,
//     bigNumberStrings: true
//   },
//   pool: {
//     max: 50,
//     min: 0,
//     idle: 10000
//   }
// })

export const knex = require('knex')({
      client: 'mysql',
      connection: {
      host: DBConfig.host,
      port: DBConfig.port,
      user: DBConfig.username,
      password: DBConfig.password,
      database: DBConfig.database,
      charset: DBConfig.char,
      multipleStatements: true
  }
})
// var mysql = require('mysql');
// function __connection(){
  
//       var connection = mysql.createConnection({
//           host     : DBConfig.host,
//           user     : DBConfig.username,
//           password : DBConfig.password,
//           database : DBConfig.database
//       });
//       connection.connect();
//       return connection;
//   }
  
// exports.query=function(sql,parmas=null){
  
//           var connection=__connection();
//           return new Promise(function(reject,resolve){
//               connection.query(sql,parmas, function (error, results, fields) {
//                   if (error) throw error;
//                   reject(results);
  
//               });
//               connection.end();
//           })
//   }

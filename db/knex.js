var env = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[env];
var knex = require('knex')({

    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123456',
      database : 'jer2'
    }
   });
module.exports = knex;
// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'postgresql',
  //   connection: "postgres://localhost/jerancomdb"
  // },


  development: {
    client: 'postgresql',
    connection: {
        database: 'jerancomdb',
        user: 'postgres',
        password: '123456'
    },
    debug: true
},

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL 
     
    }
  // ,
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};

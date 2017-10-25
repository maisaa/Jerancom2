const express = require('express');
// const router = express.Router();
const app = express()
const pg = require('pg');
const path = require('path');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyparser = require('body-parser')
var urlencodedParser = bodyparser.urlencoded({ extended: false })
const connectionString = process.env.DATABASE_URL || 'postgres://jerano:123456@localhost:5433/jerancomdb';
app.use(express.static("app"));
app.use('/', express.static(__dirname + '/'));
//app.use(express.static(path.join(__dirname, "./src")));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.use(morgan('dev'));
//..................................
var session = require('express-session');

app.use(session({
  secret: "shhh it's a secret",
  resave: false,
  aveUnintinalized: true
}));

// var comparePassword = function (attempedPassword, callback){
//   bcrypt.compare(attempedPassword, this.password, function(err, isMatch){
//      if(err){
//        callback(err, null)
//      }
//      else{
//         callback(null, isMatch)
//      }
//   });
// }

//..................................
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  //resp.setHeader('Access-Control-Allow-Origin','*') 

  // Pass to next layer of middleware
  next();
});
//....................................................
app.post('/login', (req, res, next) => {
  const results = [];
  console.log("wwwwwwwwwwwwwwwwww", req.body.username)
  // Grab data from the URL parameters
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    const data = { username: req.body.username, password: req.body.password };

    if (data.username === undefined || data.username === '')
      res.send('No username specified');
    //console.log(data.username);

    // bcrypt.hash(data.password, saltRounds, function (err, hash) {
    //console.log("hiiiii login password")
    else {
      // SQL Query > Select Data
      var query = client.query('SELECT username ,password FROM users WHERE username=($1) AND password=($2) ', [data.username, data.password]);
      //console.log("hiiiii password",data.password);
      // Stream results back one row at a time

      //var hash = hash;

      query.on('row', (row) => {
        results.push(row);
        console.log(" results ", row);
        req.session.username = row.username;

      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        console.log(" results.............. ", results.username);
        // console.log('ayaaaaaaaaaaaaaaaaaaaaaaaaaaaa i love youuuuuuuuuuuuuuuuuuuuu');
        //res.send('./');
        res.sendFile(__dirname + './src/app/components/home/home.html');
        return res.send(results);

      });
      //});
    }
  });
});
/////////////////////////////////////

// app.get('/',(req, res) => {
//    console.log ('app.get(/)');
//    if( !!req.session.username ){
//       res.sendFile(__dirname + './index.html');
//    }else{
//     res.redirect('/index.html'); // check if this path right or not
//    }
// });

// app.get('/home',(req, res) =>{
//   console.log('req.session---->',req.session);
//   if( !!req.session.username){
//      res.redirect('/app/app.component.html')
//   }
// })

app.get('/logout',(req,res) =>{
 res.sendFile(__dirname + './src/app/components/login/login.component.html'); // check if this path right or not
 res.send("get login");
})

//....................................................

app.post('/signup', urlencodedParser, (req, res, next) => {
  console.log(req.body)
  const results = [];
  // Grab data from http request
  const data = { username: req.body.username, password: req.body.password, phone: req.body.phone };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    bcrypt.hash(data.password, saltRounds, function (err, hash) {
      console.log()
      // Store hash in your password DB.
      client.query('INSERT INTO users(username, password,phone) values($1, $2,$3)',
        [data.username, hash, data.phone]);
      // SQL Query > Select Data
      const query = client.query('SELECT * FROM users ');
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {

        return res.json(results);
      });
    });
  });
});



app.post('/item', urlencodedParser, (req, res, next) => {
  console.log(req.body)
  const results = [];
  // Grab data from http request
  const data = { itemname: req.body.itemname, itemtype: req.body.itemtype, massege: req.body.massege, price: req.body.price };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(itemname, itemtype,massege,price) values($1, $2,$3,$4)',
      [data.itemname, data.itemtype, data.massege, data.price]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {

      return res.json(results);
    });
  });
});


app.get('/user', (req, res, next) => {
  console.log('hiiiiiiiii')
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM users ;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


app.get('/item', (req, res, next) => {
  console.log('hiiiiiiiii')
  console.log(req.body)
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
/////


////
app.delete('/delete', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const user_id = req.body.user_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM users WHERE user_id=($1)', [user_id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM users');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

app.put('/putt', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const user_id = req.body.user_id;
  // Grab data from http request
  const data = { username: req.body.username, password: req.body.password };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Update Data
    client.query('UPDATE users SET username=($1), password=($2) WHERE user_id=($3)',
      [data.username, data.password, user_id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM users");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
});

app.listen(4500, function () {
  console.log('server started on port 4500');
});

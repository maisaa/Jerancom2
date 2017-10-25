const express = require('express');
// const router = express.Router();
const app = express()
const pg = require('pg');
const path = require('path');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyparser = require('body-parser')

var multer = require('multer')
var upload = multer({
  dest: './uploads/'
}).single('photo');
//var upload = multer({dest: DIR}).single('photo');
// var upload = multer({ storage: storage });

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

/*************************************** HEADERS ***************************************************/
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
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


/***************************************SAVE LOCATION IN DATABASE***************************************************/

app.post('/loc', urlencodedParser, (req, res, next) => {
  const results = [];
  const data = { longitude: req.body.longitude, latitude: req.body.latitude };
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ sucsess: false, data: err });
    }
    client.query('INSERT INTO users(longitude,latitude) values($1, $2)',
      [data.longitude, data.latitude]);

    console.log(data.longitude)
    const query = client.query('SELECT * FROM users ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {

      return res.json(results);
    });
  })
})

/*************************************** LOGIN ***************************************************/
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

    //console.log(data.username);

    
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




/***************************************SIGN UP***************************************************/

app.post('/user', urlencodedParser, (req, res, next) => {
  //console.log(req.body)
  const results = [];
  // Grab data from http request
  const data = { username: req.body.username, password: req.body.password, phone: req.body.phone, longitude: req.body.longitude, latitude: req.body.latitude };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    //  bcrypt.hash( data.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.

    client.query('INSERT INTO users(username, password,phone,longitude,latitude) values($1,$2,$3,$4,$5)',
      [data.username, data.password, data.phone, data.longitude, data.latitude]);

    // SQL Query > Select Data
    const query = client.query('SELECT * FROM users ');
    // Stream results back one row at a time
    query.on('row', (row) => {
      // if(data.username.length === 0 ){
      //   console.log("empty ------------")
      // }
      // else{
      //   console.log('have -----------')
      // }
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {

      return res.json(results);
    });
  });
});
// });
///////////////////////////////////////////////////////////////////////////
app.post('/loginn', (req, res, next) => {
  const results = [];

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
    console.log(data.username);
    // SQL Query > Delete Data
    client.query('SELECT * FROM users WHERE username=($1) AND password=($2)', [data.username, data.password]);
    // SQL Query > Select Data

    var query = client.query('SELECT * FROM users WHERE username=($1) AND password=($2)', [data.username, data.password]);
    //console.log(query);
    // Stream results back one row at a time
    //console.log("my result--------",results)
    query.on('row', (row) => {

      results.push(row);
      // console.log("console.log(results);",results);
      //console.log('results.length ----',results.length);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
/////
/***************************************POST ITEM IN DATABASE***************************************************/
app.post('/item', urlencodedParser, (req, res, next) => {
  //console.log("----------------------------",req.file)
  const results = [];
  // Grab data from http request
  const data = { itemname: req.body.itemname, itemtype: req.body.itemtype, info: req.body.info, price: req.body.price };

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

    client.query('INSERT INTO items(itemname, itemtype,info,price) values($1,$2,$3,$4)',
      [data.itemname, data.itemtype, data.info, data.price]);
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

/***************************************UPLOUDE IMAGE IN DATABASE***************************************************/

app.post('/upload', function (req, res, next) {
  const results = [];
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err, "ljfddddksdlksadlkasdsa");
      //return res.status(422).send("an Error occured")
    }
    // No error occured.
    path = req.file.path;
    console.log(req.file.path)
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err, "------------------------rtete");
        //return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Insert Data
      client.query('INSERT INTO items(picture) values($1)',
        [path]);

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
    //return res.send("Upload Completed for "+path); 

  });


  // const results = [];
  // // Grab data from http request
  // const data = {picture: path};
  // console.log("paaaaaaaaaaath" , data.picture)
  // // Get a Postgres client from the connection pool
  // pg.connect(connectionString, (err, client, done) => {
  //   // Handle connection errors
  //   if(err) {
  //     done();
  //     console.log(err , "------------------------rtete");
  //     return res.status(500).json({success: false, data: err});
  //   }
  //   // SQL Query > Insert Data
  //   client.query('INSERT INTO items(picture) values($1)',
  //   [data.picture ]);
  //   // SQL Query > Select Data
  //   const query = client.query('SELECT * FROM items ');
  //   // Stream results back one row at a time
  //   query.on('row', (row) => {
  //     results.push(row);
  //   });
  //   // After all data is returned, close connection and return results
  //   query.on('end', () => {

  //     return res.json(results);
  //   });
  // }); 
})

/***************************************GET USERS FROM DATABASE***************************************************/
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
    const query = client.query('SELECT * FROM users ');
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

/***************************************GET TOOLS FROM DATABASE***************************************************/
app.get('/tools', (req, res, next) => {
  //console.log(req.files)
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
    const query = client.query('SELECT * FROM items where itemtype=($1)', ['Tools']);
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
/***************************************GET CLOTHES FROM DATABASE***************************************************/



app.post('/item', urlencodedParser, (req, res, next) => {
  console.log(req.body)
  const results = [];
  // Grab data from http request
  const data = { itemname: req.body.itemname, itemtype: req.body.itemtype, massege: req.body.massege, price: req.body.price };

app.get('/clothes', (req, res, next) => {
  //console.log(req.files)
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

    // SQL Query > Insert Data
    client.query('INSERT INTO items(itemname, itemtype,massege,price) values($1, $2,$3,$4)',
      [data.itemname, data.itemtype, data.massege, data.price]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ');

    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items where itemtype=($1)', ['Clothes']);

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

/***************************************GET FURNUTURE FROM DATABASE***************************************************/


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

app.get('/fernuture', (req, res, next) => {
  //console.log(req.files)

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

    const query = client.query('SELECT * FROM items where itemtype=($1)', ['Fernuture']);
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

/***************************************GET MAINTAINANCE FROM DATABASE***************************************************/

app.get('/maintenance', (req, res, next) => {
  //console.log(req.files)
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
    const query = client.query('SELECT * FROM items where itemtype=($1)', ['Maintenance']);

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


/***************************************GET OTHERS FROM DATABASE***************************************************/

app.get('/others', (req, res, next) => {
  //console.log(req.files)
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
    const query = client.query('SELECT * FROM items where itemtype=($1)', ['Others']);
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


/***************************************DELETE FROM DATABASE***************************************************/


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


/***************************************UPDATE DATABASE***************************************************/

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


/***************************************LISTENER***************************************************/

app.listen(4500, function () {
  console.log('server started on port 4500');
});

module.exports = app


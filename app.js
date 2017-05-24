const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var methodOverride = require('method-override')
const nodemailer = require('nodemailer');
// var twilio = require('twilio');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
//
// var client = twilio('', '');
// // var $phone = $('#phone');
// // let clientNum = $Phone.val()
// client.sendMessage({
//   to: '',
//   from: '',
//   body: 'Hello! Thanks for ordering',
// });


app.use(session({
  secret: 'SHOEBILLZ',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
// let db = pgp('postgres://Lukepate@localhost:5432/db');
let db = pgp('postgres://snsjmqbeiwopcf:fdbc6c743f0a1e45bd4ce7d484f3425201e75acdd18fab94363cee87e1c6aa69@ec2-54-197-232-155.compute-1.amazonaws.com:5432/dapn97q4qo8n25');

app.get('/signup', function(req, res){
  res.render('signup/index')
});


app.get('/', function(req, res){
  if(req.session.user){
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    };
    res.render('index', data);
  } else {
    res.render('index');
  }
});

app.post("/", upload.single('img_url'), function(req, res){
  let file = req.file.filename;
  contact_name = req.body.contact_name;
  phone = req.body.phone;
  due_date = req.body.due_date
  ship = req.body.ship
  address = req.body.address
  style = req.body.style
  shirt_name = req.body.shirt_name
  front_color = req.body.front_color
  back_color = req.body.back_color
  sleeve_color = req.body.back_color
  app_color = req.body.app_color
  quantity = req.body.quantity
  sm = req.body.sm
  md = req.body.md
  lg = req.body.lg
  xl = req.body.xl
  twoxl = req.body.twoxl
  img_url = req.body.img_url
  email = req.session.user.email
  if(req.session.user){
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    };
       db.one("insert into orders(contact_name, phone, due_date, ship, address, style, shirt_name, front_color, back_color, sleeve_color, app_color, quantity, sm, md, lg, xl, twoxl, img_url, email) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) returning id", [contact_name, phone, due_date, ship, address, style, shirt_name, front_color, back_color, sleeve_color, app_color, quantity, sm, md, lg, xl, twoxl, img_url, email])
  .then(function(data){
    console.log("data below")
    console.log(data)
    console.log(file)
      let view_data = {
        id: data.id,
        contact_name:contact_name.data,
        phone:phone.data,
        due_date:due_date.data,
        address:address.data,
        shirt_name:shirt_name.data,
        app_color:app_color.data,
      }
      res.redirect("/"+data.id)
   })
 }
})

app.get("/update/:id", function(req, res){

  if(req.session.user){
    let id = req.session.user.id

   db
    .any("SELECT * FROM users WHERE id = $1", id)
    .then(function(data){
      console.log(data)
      let view_data = {
        users:data
      }
      res.render('confirm/index', view_data);
      })
    } else {
    res.redirect('/');
    }

  });

app.put("/users/update/:id", function (req, res) {
  console.log(req.body.email)
   db
   .none("UPDATE users SET name = $1, email = $2 WHERE id = $3 ", [req.body.name, req.body.email, req.session.user.id])
   .then(function() {
      res.redirect("/update/"+req.session.user.id)

    })
 })

app.delete("/users/delete/:id", function (req, res) {
  id = req.params.id
  console.log(req.body.style)
   db
   .none("DELETE FROM users WHERE id = $1", [id])
   .then(function() {
      res.redirect("/")
    })
 })
app.post('/login', function(req, res){
  let data = req.body;
  db
    .one("SELECT * FROM users WHERE email = $1", [data.email])
    .catch(function(){
      res.send("Authorization Failed: Invalid email/password");
    })
    .then(function(user){
      bcrypt.compare(data.password, user.password_digest, function(err, cmp){
        if(cmp){
          req.session.user = user;
          res.redirect("/");
        } else {
          res.send("Auth failed: Invalid email/password");
        }
      });
    });
});




app.post('/signup', function(req, res){
  let data = req.body;
  bcrypt
    .hash(data.password, 10, function(err, hash){
      db.none(
        "INSERT INTO users (email, name, password_digest) VALUES ($1, $2, $3)",
        [data.email, data.name, hash]
      ).then(function(){
        res.redirect("/");
      })
    })
});



app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/")
});

app.get('/confirm', function(req, res){
  res.render('home/indegx')
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is listening")
});

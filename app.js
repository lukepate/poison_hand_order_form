const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var methodOverride = require('method-override')

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.use(session({
  secret: 'SHOEBILLZ',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

let db = pgp('postgres://Lukepate@localhost:5432/db');

app.listen(3000, function(){
  console.log("server is listening")
})


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
  if(req.session.user){
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    };
       db.one("insert into orders(contact_name, phone, due_date, ship, address, style, shirt_name, front_color, back_color, sleeve_color, app_color, quantity, sm, md, lg, xl, twoxl, img_url) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) returning id", [contact_name, phone, due_date, ship, address, style, shirt_name, front_color, back_color, sleeve_color, app_color, quantity, sm, md, lg, xl, twoxl, img_url])
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

app.put("/post/:id", function (req, res) {
  console.log(req.body.style)
   db
   .none("UPDATE orders SET contact_name = $1, phone =$2, due_date = $3, ship =$4, address = $5, style = $6, shirt_name = $7, front_color = $8, back_color = $9, sleeve_color = $10, app_color = $11, quantity = $12, sm = $13, md = $14, lg =$15, xl = $16,  twoxl=$17, img_url=$18  WHERE id = $19", [req.body.contact_name, req.body.phone, req.body.due_date, req.body.ship, req.body.address, req.body.style, req.body.shirt_name, req.body.front_color, req.body.back_color, req.body.sleeve_color, req.body.app_color, req.body.quantity, req.body.sm, req.body.md, req.body.lg, req.body.xl, req.body.twoxl, req.body.img_url, req.params.id])
   .then(function() {
      res.redirect("/"+req.params.id)

    })
 })
app.delete("/post/:id", function (req, res) {
  id = req.params.id
  console.log(req.body.style)
   db
   .none("DELETE FROM orders WHERE id = $1", [id])
   .then(function() {
      res.redirect("/"+req.params.id)

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
        "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
        [data.email, hash]
      ).then(function(){
        res.send('User created!');
      })
    })
});

app.get('/signup', function(req, res){
  res.render('signup/index')
});

app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/")
});


app.get("/:id", function(req, res){
   let id = req.params.id
   db
    .any("SELECT * FROM orders WHERE id = $1", id)
    .then(function(data){
      console.log(data)
      let view_data = {
        orders:data
      };
      res.render("confirm/index", view_data);
    })
  });




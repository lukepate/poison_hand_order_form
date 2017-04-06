const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let db = pgp('postgres://Lukepate@localhost:5432/db');

app.use(session({
  secret: 'SHOEBILLZ',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.listen(3000, function(){
  console.log("server is listening")
})
app.get("/", function(req, res){
   db
    .any("SELECT * FROM prices")
    .then(function(data){
      let view_data = {
        prices:data
      };
      res.render("home/index", view_data);
    })
  });

app.post("/", function(req, res){
  contact_name = req.body.contact_name;
  phone = req.body.phone;
  due_date = req.body.due_date
  address = req.body.address
  shirt_name = req.body.shirt_name
  front_color = req.body.front_color
  back_color = req.body.back_color
  style = req.body.style
  app_color = req.body.app_color
  quantity = req.body.quantity
  img_url = req.body.img_url
   db.one("insert into orders(contact_name, phone, due_date, address, shirt_name, front_color, back_color, style, app_color, quantity, img_url) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id", [contact_name, phone, due_date, address, shirt_name, front_color, back_color, style, app_color, quantity, img_url])
   .then(data => {
console.log(data.id);
    })
    res.render("home/index");
 })



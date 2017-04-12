DROP TABLE IF EXISTS prices;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS houses;
DROP TABLE IF EXISTS users;



CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  style_name VARCHAR(255),
  shirt_style VARCHAR(255),
  color VARCHAR(255),
  quantity VARCHAR(255),
  price VARCHAR(255)
);

CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  due_date VARCHAR(255),
  address VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE orders(
  id serial PRIMARY KEY,
  contact_name varchar(255),
  phone varchar(250),
  due_date varchar(250),
  ship varchar(250),
  address varchar(250),
  style varchar(250),
  shirt_name varchar(250),
  front_color varchar(250),
  back_color varchar(250),
  sleeve_color varchar(250),
  app_color varchar(250),
  quantity varchar(250),
  sm varchar(250),
  md varchar(250),
  lg varchar(250),
  xl varchar(250),
  twoxl varchar(250),
  img_url varchar(250)
  );
CREATE TABLE houses(
  id serial PRIMARY KEY,
  name varchar(50),
  img_url varchar(250)
  );



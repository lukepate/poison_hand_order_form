# u02_Project_Two

Project #2: Poison Hand - My First Full-stack Application

Overview

For my second project I wanted to build an online t-shirt ordering system for artist I worked with. My first approach was to create a database to store the orders and the users sign-up info and then email myself the orders placed from their profile. 
The technologies I used and and instructions: 

    "bcrypt": "^1.0.2",
    "body-parser": "^1.17.1",
    "express": "^4.15.2",
    "express-session": "^1.15.2",
    "materialize-css": "^0.98.1",
    "method-override": "^2.3.8",
    "multer": "^1.3.0",
    "mustache-express": "^1.2.4",
    "nodemailer": "^4.0.0",
    "pg-promise": "^5.6.4",
    "twilio": "^2.11.1"

Express, pg-promise and Mustache to with body Parser to populate the page. Bcrypt to secure the sessions and passwords. Materilize for stylin. Method-override to store orders. Multer to save files to the database.  Twilio to send text message verifications and Formspree.io to verify and email orders. 

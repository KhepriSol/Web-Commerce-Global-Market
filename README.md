# Express.js API with Sequelize ORM and MySQL Database

## Description
This project is a fully functional Express.js API that uses Sequelize ORM to connect to a MySQL database. 

## Getting Started
Clone the repository to your local machine.
Navigate to the project directory.
Run npm install to install all the necessary dependencies.
Create a .env file in the root directory of the project and add the following environment variables with your own MySQL database information:

DB_NAME=your_database_name // DB_USER=your_mysql_username // DB_PASSWORD=your_mysql_password

1. Run the following command to create the development database and seed it with test data:
npm run seed

2. Run the following command to start the server and sync the Sequelize models to the MySQL database:
npm start

## Usage
To test the API, open Insomnia Core or any other similar tool and enter the following endpoints:

GET /categories,
GET /products,
GET /tags,
POST /categories,
POST /products,
POST /tags,
PUT /categories/:id,
PUT /products/:id,
PUT /tags/:id,
DELETE /categories/:id,
DELETE /products/:id,
DELETE /tags/:id,
The GET routes will display the data for each category, product, or tag in a formatted JSON. The POST, PUT, and DELETE routes will allow you to create, update, and delete data in the database.
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
var bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var app = express();

// 
app.use(
    cors({
        origin: ['http://localhost:3000'],
        method: ["GET", "POST"],
        credentials: true
    })
);
app.use(cookieParser())
app.use(express.json());
app.use("/",AuthRoutes);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react'
});
db.connect((error => {
    if (error) {
        return console.log('error: ' + error.message);
    } else {
        console.log("Successfully connected to database!");
    }
}))

app.listen(4000, '0.0.0.0', () => {
    console.log('Server is running on http://localhost:4000');
})
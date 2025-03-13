
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oruganti@39112', // Set your MySQL password
    database: 'voting_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// SQL Script to create database and table
/*
CREATE DATABASE voting_db;
USE voting_db;

CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    votes INT DEFAULT 0
);

INSERT INTO candidates (name) VALUES ('Candidate A'), ('Candidate B'), ('Candidate C');
*/

// Endpoint to vote
app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    const query = 'UPDATE candidates SET votes = votes + 1 WHERE name = ?';
    db.query(query, [candidate], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Vote recorded' });
    });
});

// Endpoint to fetch results
app.get('/results', (req, res) => {
    db.query('SELECT * FROM candidates', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

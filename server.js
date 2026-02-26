const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Serve your HTML, CSS, JS files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ===== DATABASE CONNECTION =====
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password', // change this
  database: 'portfolio_db'
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database!');
  }
});

// ===== ROUTES =====

// Home route - serves your portfolio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example: Save a contact message to database
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to save message' });
    } else {
      res.json({ success: 'Message sent successfully!' });
    }
  });
});

// Example: Get all messages
app.get('/messages', (req, res) => {
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    } else {
      res.json(results);
    }
  });
});

// ===== START SERVER =====
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
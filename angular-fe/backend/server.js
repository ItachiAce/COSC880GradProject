const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
    connectionString: process.env.RAILWAY_PG_CONNECTION_STRING,
});
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.use(async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM doctor');
      console.log('Connection to the database established');
      next();
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.get('/api/doctors', async (req, res) => { 
    try {
      const result = await pool.query('SELECT * FROM doctor');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
// API endpoint for adding a doctor 
app.post('/api/doctors', async (req, res) => {
    try {
      const doctor = req.body;
      const queryString = 'INSERT INTO doctor (first_name, last_name, address, email, username, password) VALUES ($1, $2, $3, $4, $5, $6)';
const queryParams = [
  doctor.first_name,
  doctor.last_name,
  doctor.address,
  doctor.email,
  doctor.username,
  doctor.password,
];
console.log('SQL Query:', queryString);
console.log('Query Parameters:', queryParams);
const result = await pool.query(queryString, queryParams);
      res.json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
// API endpoint for getting vitalsigns
app.get('/api/vitalsigns', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vitalsigns');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// API endpoint for getting admin
app.get('/api/admin', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
//Add admin
app.post('/api/admin', async (req, res) => {
    try {
      const admin = req.body;
      const queryString = 'INSERT INTO admin (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4,$5)';
      const queryParams = [
        admin.first_name,
        admin.last_name,
        admin.email,
        admin.username,
        admin.password,
      ];
  
      console.log('SQL Query:', queryString);
      console.log('Query Parameters:', queryParams);
  
      const result = await pool.query(queryString, queryParams);
      res.json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
// API endpoint for getting patient
app.get('/api/patients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM new_patient');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// API endpoint for adding a patient 
app.post('/api/patients', async (req, res) => {
    try {
      const patient = req.body;
      const queryString = 'INSERT INTO new_patient (first_name, last_name, address, email, username, password, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const queryParams = [
  patient.first_name,
  patient.last_name,
  patient.address,
  patient.email,
  patient.username,
  patient.password,
  patient.birthdate,
];
console.log('SQL Query:', queryString);
console.log('Query Parameters:', queryParams);
const result = await pool.query(queryString, queryParams);
      res.json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  // User Authentication
app.post('/api/auth/login', async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      let tableName;
      switch (role) {
        case 'admin':
          tableName = 'admin';
          break;
        case 'doctor':
          tableName = 'doctor';
          break;
        case 'patient':
          tableName = 'new_patient';
          break;
        default:
          return res.status(401).json({ error: 'Invalid role' });
      }
  
      const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE username = $1 AND password = $2`,
        [username, password]
      );
  
      if (result.rows.length > 0) {
        // Valid credentials, generate a JWT token
        const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        // Invalid credentials
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

   // Assign Doctor to Patient
app.post('/api/patient/assign-doctor', async (req, res) => {
    // Implement patient assigning doctor logic here
    // Allow patients to assign a doctor to themselves
  });

  // Send Notifications
app.post('/api/notifications/send', async (req, res) => {
    // Implement sending notifications logic here
    // Send notifications to doctors when vital signs are above a certain range
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

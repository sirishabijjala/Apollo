const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'M@kesql#55',
  database: 'doctor_db'
});

// POST /add-doctor
app.post('/add-doctor', (req, res) => {
  const { name, specialty, experience, gender, fee, modeofconsult, languages, location } = req.body;

  const sql = `
    INSERT INTO doctors (name, specialty, experience, gender, fee, modeofconsult, languages, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [name, specialty, experience, gender, fee, modeofconsult, languages, location];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Doctor added' });
  });
});

// GET /list-doctor-with-filter
app.get('/list-doctor-with-filter', (req, res) => {
  const { page = 1, gender, specialty, experience, fee, modeofconsult, language, location } = req.query;
  const limit = 5;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM doctors WHERE 1=1';
  const params = [];

  if (gender) sql += ' AND gender = ?', params.push(gender);
  if (specialty) sql += ' AND specialty = ?', params.push(specialty);
  if (experience) {
    const [minExp, maxExp] = experience.split('-').map(Number);
    sql += ' AND experience BETWEEN ? AND ?';
    params.push(minExp, maxExp);
  }
  if (fee) sql += ' AND fee <= ?', params.push(Number(fee));
  if (modeofconsult) sql += ' AND modeofconsult = ?', params.push(modeofconsult);
  if (language) sql += ' AND FIND_IN_SET(?, languages)', params.push(language);
  if (location) sql += ' AND location = ?', params.push(location);

  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));

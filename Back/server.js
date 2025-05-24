const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const DB_PATH = __dirname + '/bd.json';

app.use(cors());
app.use(bodyParser.json());

// Funciones utilitarias
function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Rutas de usuarios
app.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.get('/users/:id', (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'Usuario no encontrado' });
});

app.get('/users/:id/debts', (req, res) => {
  const db = readDB();
  const debts = db.debts.filter(d => d.userId == req.params.id);
  res.json(debts);
});

app.get('/users/:id/loans', (req, res) => {
  const db = readDB();
  const loans = db.loans.filter(l => l.userId == req.params.id);
  res.json(loans);
});

// Rutas de deudas
app.post('/debts', (req, res) => {
  const db = readDB();
  const newDebt = { id: db.debts.length + 1, ...req.body };
  db.debts.push(newDebt);
  writeDB(db);
  res.status(201).json(newDebt);
});

app.put('/debts/:id', (req, res) => {
  const db = readDB();
  const index = db.debts.findIndex(d => d.id == req.params.id);
  if (index !== -1) {
    db.debts[index] = { ...db.debts[index], ...req.body };
    writeDB(db);
    res.json(db.debts[index]);
  } else {
    res.status(404).json({ error: 'Deuda no encontrada' });
  }
});

app.delete('/debts/:id', (req, res) => {
  const db = readDB();
  const index = db.debts.findIndex(d => d.id == req.params.id);
  if (index !== -1) {
    const deleted = db.debts.splice(index, 1);
    writeDB(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Deuda no encontrada' });
  }
});

// Obtener una deuda individual
app.get('/debts/:id', (req, res) => {
  const db = readDB();
  const debt = db.debts.find(d => d.id == req.params.id);
  debt ? res.json(debt) : res.status(404).json({ error: 'Deuda no encontrada' });
});


// Rutas de préstamos
app.post('/loans', (req, res) => {
  const db = readDB();
  const newLoan = { id: db.loans.length + 1, ...req.body };
  db.loans.push(newLoan);
  writeDB(db);
  res.status(201).json(newLoan);
});

app.put('/loans/:id', (req, res) => {
  const db = readDB();
  const index = db.loans.findIndex(l => l.id == req.params.id);
  if (index !== -1) {
    db.loans[index] = { ...db.loans[index], ...req.body };
    writeDB(db);
    res.json(db.loans[index]);
  } else {
    res.status(404).json({ error: 'Préstamo no encontrado' });
  }
});

app.delete('/loans/:id', (req, res) => {
  const db = readDB();
  const index = db.loans.findIndex(l => l.id == req.params.id);
  if (index !== -1) {
    const deleted = db.loans.splice(index, 1);
    writeDB(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Préstamo no encontrado' });
  }
});

// Obtener un préstamo individual
app.get('/loans/:id', (req, res) => {
  const db = readDB();
  const loan = db.loans.find(l => l.id == req.params.id);
  loan ? res.json(loan) : res.status(404).json({ error: 'Préstamo no encontrado' });
});

//login and resgister
// Registro de usuario
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const db = readDB();
  const existingUser = db.users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }

  const newUser = {
    id: db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
    name,
    email,
    password
  };

  db.users.push(newUser);
  writeDB(db);
  res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
});

// Inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos' });
  }

  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.status(200).json({ message: 'Inicio de sesión exitoso', user });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const Gasto = require('../models/gasto');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello World'));

router.post('/gasto', verifyToken, async (req, res) => {
  try {
    const newGasto = new Gasto({
      tipo: req.body.tipo,
      ruc: req.body.ruc,
      valor: req.body.valor,
      userId: req.userId
    });

    await newGasto.save();
    res.status(201).json(newGasto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/gastos', verifyToken, async (req, res) => {
  try {
    const gastos = await Gasto.find({ userId: req.userId });
    res.json(gastos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, 'secretKey');
  res.status(200).json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFind = await User.findOne({ email });
    if (!userFind) return res.status(401).send("El correo no existe");
    if (userFind.password !== password) return res.status(401).send("La contraseña es incorrecta");

    const token = jwt.sign({ _id: userFind._id }, 'secretKey');
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/task', (req, res) => {
  res.redirect('http://localhost:4200/task');
});

router.get('/private-task', (req, res) => {
  res.redirect('http://localhost:4200/private-task');
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Unauthorized request');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized request');

  try {
    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized request');
  }
}


module.exports = router;

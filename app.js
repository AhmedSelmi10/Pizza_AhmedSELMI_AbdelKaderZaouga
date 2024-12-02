const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const userRouter = require('./routers/UserRouters');
const authRouter = require('./routers/authRouter');
const jwt = require('jsonwebtoken');

const app = express();
const httpServer = http.createServer(app);

// Middleware pour éviter la mise en cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Assurez-vous que CORS est bien configuré avant toute autre logique de route
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Utilisation des routers pour les différentes routes
app.use('/users', userRouter);
app.use('/auth', authRouter);

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gadour')
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1);
  });

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

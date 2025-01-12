const express = require('express');
const multer = require('multer');
const path = require('path');
const pizzaController = require('../controllers/pizzaController');

const router = express.Router();

// Configuration de Multer pour l'upload des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non autorisé. Utilisez une image JPEG ou PNG."));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB
});

// Middleware pour gérer les erreurs de multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

// Routes
router.post('/pizzas', upload.single('image'), handleMulterError, pizzaController.createPizza);
router.get('/pizzas', pizzaController.getAllPizzas);
router.get('/pizzas/:id', pizzaController.getPizzaById);
router.put('/pizzas/:id', upload.single('image'), handleMulterError, pizzaController.updatePizza);
router.delete('/pizzas/:id', pizzaController.deletePizza);

module.exports = router;

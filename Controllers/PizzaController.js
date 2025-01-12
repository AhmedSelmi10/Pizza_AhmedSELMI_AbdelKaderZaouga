const PizzaModel = require('../models/Pizza');
const fs = require('fs');
const path = require('path');

// Créer une nouvelle pizza
const createPizza = async (req, res) => {
  const { label, description, prix } = req.body;

  if (!label || !description || !prix) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "L'image est requise." });
  }

  try {
    const imageUrl = `/uploads/${req.file.filename}`;

    const pizza = new PizzaModel({
      label,
      description,
      prix,
      image: imageUrl,
    });

    await pizza.save();
    res.status(201).json(pizza);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création de la pizza", error: err.message });
  }
};

// Récupérer toutes les pizzas
const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await PizzaModel.find();
    res.status(200).json(pizzas);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des pizzas", error: err.message });
  }
};

// Récupérer une pizza par ID
const getPizzaById = async (req, res) => {
  try {
    const pizza = await PizzaModel.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza introuvable" });
    }
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de la pizza", error: err.message });
  }
};

// Mettre à jour une pizza par ID
// Mettre à jour une pizza par ID
const updatePizza = async (req, res) => {
    const { label, description, prix } = req.body;
  
    // Vérification des champs obligatoires
    if (!label || !description || !prix) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }
  
    try {
      // Recherche de la pizza existante
      const pizza = await PizzaModel.findById(req.params.id);
  
      if (!pizza) {
        return res.status(404).json({ message: "Pizza introuvable" });
      }
  
      // Si une nouvelle image est téléchargée, mettre à jour l'image
      let imageUrl = pizza.image; // Garder l'ancienne image par défaut
      if (req.file) {
        // Si une nouvelle image est téléchargée, générer une nouvelle URL
        imageUrl = `/uploads/${req.file.filename}`;
  
        // Supprimer l'ancienne image du dossier 'uploads'
        const imagePath = path.join(__dirname, `../uploads/${path.basename(pizza.image)}`);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Erreur lors de la suppression de l'image :", err);
          }
        });
      }
  
      // Mise à jour des informations de la pizza
      const updatedPizza = await PizzaModel.findByIdAndUpdate(
        req.params.id,
        { label, description, prix, image: imageUrl },
        { new: true }  // Pour renvoyer l'objet mis à jour
      );
  
      res.status(200).json(updatedPizza);
    } catch (err) {
      res.status(400).json({ message: "Erreur lors de la mise à jour de la pizza", error: err.message });
    }
  };
  
// Supprimer une pizza par ID
const deletePizza = async (req, res) => {
  try {
    const pizza = await PizzaModel.findByIdAndDelete(req.params.id);

    if (!pizza) {
      return res.status(404).json({ message: "Pizza introuvable" });
    }

    // Supprimer le fichier image associé
    const imagePath = path.join(__dirname, `../uploads/${path.basename(pizza.image)}`);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Erreur lors de la suppression de l'image :", err);
      }
    });

    res.status(200).json({ message: "Pizza supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression de la pizza", error: err.message });
  }
};

module.exports = {
  createPizza,
  getAllPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
};

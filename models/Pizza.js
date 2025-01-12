// server/models/Pizza.js
const mongoose = require('mongoose');

// Définition du schéma de la pizza
const pizzaSchema = new mongoose.Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const PizzaModel = mongoose.model('Pizza', pizzaSchema);

module.exports = PizzaModel;

import React from 'react';
import './visite.css';
const Cart = ({ cart, removeFromCart, totalPrice }) => {
  return (
    <div className="cart">
      <h2>Mon Panier</h2>
      <ul>
        {cart.map(item => (
          <li key={item._id}>
            <span>{item.label} - {item.prix} TND</span>
            <button onClick={() => removeFromCart(item._id)}>Retirer</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total : {totalPrice} TND</strong>
      </div>
      <button onClick={() => alert('Commande passée!')}>Passer la commande</button>
    </div>
  );
};

export default Cart;

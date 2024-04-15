import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  // Object desctructuring
  const { title, image, description, price } = item;
  return (
    <Link to={`/reactjs-e-commerce/products/${item.id}`}>
      <div className="card">
        <div className="card-body">
          <img src={image} alt={item.description} className="img-fluid" />
          <h5 className="card-title">{item.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">$ {item.price}</h6>
        </div>
      </div>
    </Link>
  );
};

export default Card;

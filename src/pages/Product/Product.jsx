import React from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useCart } from "../../context/CartContext";

const Product = () => {
  const { id } = useParams();

  const url = `https://fakestoreapi.com/products/${id}`;
  const { data, error, loading } = useFetch(url);
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { item: data, quantity: 1 } });
  };

  return (
    <div className="container p-5">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something is wrong!!</p>
      ) : (
        <div className="row">
          <div className="4">
            <img
              src={data?.image}
              alt={data?.description}
              className="img-fluid"
            />
          </div>
          <div className="8">
            <h2>{data?.title}</h2>
            <h4>{data?.category}</h4>
            <h5>$ {data?.price}</h5>
            <p>{data?.description}</p>
            <button className="btn btn-primary" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

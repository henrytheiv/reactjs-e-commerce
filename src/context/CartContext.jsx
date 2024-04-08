import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // State inside the provider
  const initialState = {
    cart: [],
  };

  // Actions on the provider
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        const existingItemIndexAdded = state.cart.findIndex(
          (cartItem) => cartItem.item.id === action.payload.item.id
        );
        // -1 means item exists in cart
        if (existingItemIndexAdded !== -1) {
          // Copy current cart to a new variable
          const updatedCart = [...state.cart];
          updatedCart[existingItemIndexAdded].quantity += 1;
          return {
            ...state,
            updatedCart,
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, action.payload],
          };
        }

      case "REMOVE_ITEM":
        // Look for the item id and retrieve the position
        const existingItemIndexDeleted = state.cart.findIndex(
          (cartItem) => cartItem.item.id === action.payload.item.id
        );

        const updatedCart = [...state.cart]; // retrieve a copy of the cart

        // If quantity is more than 1, decrease the value by 1

        if (updatedCart[existingItemIndexDeleted].quantity > 1) {
          updatedCart[existingItemIndexDeleted].quantity -= 1;

          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          // If quantity is just 1, remove the item

          return {
            ...state,
            cart: state.cart.filter(
              (val) => val.item.id !== action.payload.item.id
            ),
          };
        }

      case "EMPTY_CART":
        return {
          ...state,
          cart: [],
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const totalItemsInCart = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = state.cart.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{ state, dispatch, totalItemsInCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a Cart Provider");
  }

  return context;
};

export { CartProvider, useCart };

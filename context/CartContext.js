import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial del carrito
const initialState = {
  items: [],
  total: 0,
};

// Tipos de acciones
const CartActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Reducer del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Si el producto ya existe, incrementar la cantidad
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Si es un producto nuevo, agregarlo
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      }
    }

    case CartActionTypes.REMOVE_ITEM: {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case CartActionTypes.UPDATE_QUANTITY: {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case CartActionTypes.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

// Función para calcular el total
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.precio * item.quantity, 0);
};

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => {
    dispatch({ type: CartActionTypes.ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: { id: productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CartActionTypes.UPDATE_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    total: state.total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

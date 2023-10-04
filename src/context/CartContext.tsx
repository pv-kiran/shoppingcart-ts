import { createContext, useState, useContext, ReactNode } from "react";
import Cart from "../components/Cart";

type CartItem = {
  id: number;
  quantity: number;
};

type CartContext = {
  getItemQty: (id: number) => number;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQty: number;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
};

const cartContext = createContext({} as CartContext);

// custom hooks - for geting the cart informations
export function useCart() {
  return useContext(cartContext);
}

type PropsType = {
  children: ReactNode;
};

export default function CartProvider({ children }: PropsType) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isOpen, setisOpen] = useState<boolean>(false);

  const getItemQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseQty = (id: number) => {
    setCartItems((items) => {
      if (items.find((item) => item.id === id) === undefined) {
        return [...items, { id: id, quantity: 1 }];
      } else {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cartItems);
  };

  const decreaseQty = (id: number) => {
    setCartItems((items) => {
      if (items.find((item) => item.id === id)?.quantity === 1) {
        return items.filter((item) => item.id != id);
      } else {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + -1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((items) => {
      return items.filter((item) => item.id != id);
    });
  };

  const openCart = () => {
    setisOpen(true);
  };
  const closeCart = () => {
    setisOpen(false);
  };

  const cartQty = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <cartContext.Provider
      value={{
        getItemQty,
        increaseQty,
        decreaseQty,
        removeFromCart,
        cartItems,
        cartQty,
        openCart,
        closeCart,
      }}>
      {children}
      <Cart isOpen={isOpen}></Cart>
    </cartContext.Provider>
  );
}

import { createContext, useState, useContext, ReactNode } from "react";
import Cart from "../components/Cart";
import useLocalStorage from "../hooks/useLocalStorage";

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

type PropsType = {
  children: ReactNode;
};

const cartContext = createContext({} as CartContext);

// custom hooks - for geting the cart informations
export function useCart() {
  return useContext(cartContext);
}

export default function CartProvider({ children }: PropsType) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);

  const [isOpen, setisOpen] = useState<boolean>(false);

  // to get the number of items
  const getItemQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // to increase / add item  to the cart
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

  // to decrease / remove item  to the cart
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

  // remove the item from the cart
  const removeFromCart = (id: number) => {
    setCartItems((items) => {
      return items.filter((item) => item.id != id);
    });
  };

  // to display the cart items - sidebar
  const openCart = () => {
    setisOpen(true);
  };

  // to hide the the cart items -
  const closeCart = () => {
    setisOpen(false);
  };

  // to get the total items in the cart
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

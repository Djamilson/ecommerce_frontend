import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import { Product, ProductItemProps } from '../pages/Dashboard/ProductItem';

interface CartContextData {
  cart: ProductAmount[];
  addProduct(itemProduct: ProductItemProps): Promise<void>;
  removeProduct(index: number): Promise<void>;

  incrementAmount(index: number): Promise<void>;
  decrementAmount(index: number, amount: number): Promise<void>;
}

export interface ProductAmount {
  amount: number;
  product: Product;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProduct: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ProductAmount[]>(() => {
    const productList = localStorage.getItem('@list:product');

    if (productList) {
      return JSON.parse(productList);
    }

    return [] as ProductAmount[];
  });

  const addProduct = useCallback(async ({ product }) => {
    const item = { amount: 1, product };

    const newCart = cart;

    const productIndex = newCart.findIndex((p) => p.product.id === product.id);

    if (productIndex >= 0) {
      newCart[productIndex].amount += 1;
    } else {
      newCart.push({
        ...item,
        amount: 1,
      });
    }

    localStorage.setItem('@list:product', JSON.stringify(newCart));

    setCart([...newCart]);
  }, []);

  const removeProduct = useCallback(async (id) => {
    const removeCart = cart;

    const productIndex = removeCart.findIndex((p) => p.product.id === id);

    if (productIndex >= 0) {
      removeCart.splice(productIndex, 1);
      setCart([...removeCart]);
      localStorage.setItem('@list:product', JSON.stringify(removeCart));
    }
  }, []);

  const incrementAmount = useCallback(async (id) => {
    const newCart = cart;

    const productIndex = newCart.findIndex((p) => p.product.id === id);

    newCart[productIndex].amount += 1;

    localStorage.setItem('@list:product', JSON.stringify(newCart));

    setCart([...newCart]);
  }, []);

  const decrementAmount = useCallback(async (id, amount) => {
    if (amount <= 1) {
      return;
    }

    const newCart = cart;

    const productIndex = newCart.findIndex((p) => p.product.id === id);

    newCart[productIndex].amount -= 1;

    localStorage.setItem('@list:product', JSON.stringify(newCart));

    setCart([...newCart]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,

        incrementAmount,
        decrementAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCartProduct(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useProduct mus be used within an CartProduct');
  }

  return context;
}

export { CartProduct, useCartProduct };

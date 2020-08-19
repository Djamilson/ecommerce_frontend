import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../_services/api';
import { Product } from '../pages/Dashboard/ProductItem';
import { useToast } from './toast';

interface CartContextData {
  cart: ProductAmount[];
  addProduct(id: number): Promise<void>;
  removeProduct(index: number): Promise<void>;

  incrementAmount(index: number, amount: number): Promise<void>;
  decrementAmount(index: number, amount: number): Promise<void>;
}

export interface ProductAmount {
  amount: number;
  product: Product;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProduct: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState<ProductAmount[]>(() => {
    const productList = localStorage.getItem('@list:product');

    if (productList) {
      return JSON.parse(productList);
    }

    return [] as ProductAmount[];
  });

  const updateAmount = useCallback(async (id) => {
    const newCart = cart;

    const productIndex = newCart.findIndex((p) => p.product.id === id);

    newCart[productIndex].amount += 1;

    localStorage.setItem('@list:product', JSON.stringify(newCart));

    setCart([...newCart]);
  }, []);

  const addProduct = useCallback(async (id) => {
    const newCart = cart;

    const productExists = newCart.find(
      (p: ProductAmount) => p.product.id === id,
    );

    const stock = await api.get(`/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.amount : 0;

    const amount = currentAmount + 1;

    if (amount > stockAmount) {
      console.log('Erro: não tem mais produtos');

      addToast({
        type: 'error',
        title: 'Falha!',
        description: 'Só temos essa quantidade de produtos!',
      });

      return;
    }

    if (productExists) {
      updateAmount(id);
    } else {
      const res = await api.get(`/products/${id}`);

      const { data } = res;

      const item = { amount: 1, product: data };
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

  const incrementAmount = useCallback(async (id, amount) => {
    if (amount <= 1) {
      return;
    }

    const newCart = cart;

    const stock = await api.get(`/stock/${id}`);

    const stockAmount = stock.data.amount;

    if (amount > stockAmount) {
      console.log('Erro: não tem mais produtos');

      addToast({
        type: 'error',
        title: 'Falha!',
        description: 'Fora de estoque Só temos essa quantidade de produtos!',
      });

      return;
    }

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

    const stock = await api.get(`/stock/${id}`);

    const stockAmount = stock.data.amount;

    if (amount < stockAmount) {
      console.log('Erro: não tem mais produtos');

      addToast({
        type: 'error',
        title: 'Falha!',
        description: 'Só temos essa quantidade de produtos!',
      });

      return;
    }

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

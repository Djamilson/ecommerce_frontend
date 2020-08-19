import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../_services/api';
import { Product } from '../pages/Dashboard/ProductItem';
import { useToast } from './toast';

interface CartContextData {
  cart: ProductAmount[];
  addToCart(id: number): Promise<void>;
  removeProduct(index: number): Promise<void>;
  updateAmount(index: number, amount: number): Promise<void>;
}

export interface ProductAmount {
  itemProduct: {
    amount: number;
    product: Product;
  };
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

  const updateSuccess = useCallback(async (id, amount) => {
    const newCart = cart;

    const productIndex = newCart.findIndex(
      (p) => p.itemProduct.product.id === id,
    );

    if (productIndex >= 0) {
      newCart[productIndex].itemProduct.amount = Number(amount);

      setCart([...newCart]);
      localStorage.setItem('@list:product', JSON.stringify(newCart));
    }
  }, []);

  const updateAmount = useCallback(async (id, amount) => {
    if (amount <= 0) return;

    const stock = await api.get(`/stock/${id}`);
    const stockAmount = stock.data.amount;

    if (amount > stockAmount) {
      console.log('Erro: não tem mais produtos');

      addToast({
        type: 'error',
        title: 'Falha!',
        description: 'Não temos mais produto para adicionar!',
      });
      return;
    }

    updateSuccess(id, amount);
  }, []);

  const addToCart = useCallback(async (id) => {
    const newCart = cart;

    const productExists = newCart.find(
      (p: ProductAmount) => p.itemProduct.product.id === id,
    );

    const stock = await api.get(`/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.itemProduct.amount : 0;

    const amount = currentAmount + 1;

    if (amount > stockAmount) {
      console.log('Erro: não tem mais produtos');

      addToast({
        type: 'error',
        title: 'Falha!',
        description: 'Não temos mais produto para adicionar!',
      });

      return;
    }

    if (productExists) {
      updateSuccess(id, amount);
    } else {
      const res = await api.get(`/products/${id}`);

      const { data } = res;

      const item = { amount: 1, product: data };

      newCart.push({
        itemProduct: {
          ...item,
          amount: 1,
        },
      });

      localStorage.setItem('@list:product', JSON.stringify(newCart));

      setCart([...newCart]);
    }
  }, []);

  const removeProduct = useCallback(async (id) => {
    const removeCart = cart;

    const productIndex = removeCart.findIndex(
      (p) => p.itemProduct.product.id === id,
    );

    if (productIndex >= 0) {
      removeCart.splice(productIndex, 1);
      setCart([...removeCart]);
      localStorage.setItem('@list:product', JSON.stringify(removeCart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateAmount,
        removeProduct,
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

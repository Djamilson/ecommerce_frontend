import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../_services/api';
import { Product } from '../pages/Dashboard/ProductItem';
import { useToast } from './toast';

interface CartContextData {
  cart: ProductStock[];
  addToCart(id: number): Promise<void>;
  removeProduct(index: number): Promise<void>;
  updateAmount(index: number, stock: number): Promise<void>;
}

export interface ProductStock {
  itemProduct: {
    stock: number;
    product: Product;
  };
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProduct: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState<ProductStock[]>(() => {
    const productList = localStorage.getItem('@list:product');

    if (productList) {
      return JSON.parse(productList);
    }

    return [] as ProductStock[];
  });

  const updateSuccess = useCallback(
    async (id, stock) => {
      const newCart = cart;

      const productIndex = newCart.findIndex(
        (p) => p.itemProduct.product.id === id,
      );

      if (productIndex >= 0) {
        newCart[productIndex].itemProduct.stock = Number(stock);

        setCart([...newCart]);
        localStorage.setItem('@list:product', JSON.stringify(newCart));
      }
    },
    [cart],
  );

  const updateAmount = useCallback(
    async (id, stock) => {
      if (stock <= 0) return;

      const searchStock = await api.get(`/products/${id}`);
      const stockAmount = searchStock.data.stock;

      if (stock > stockAmount) {
        console.log('Erro: não tem mais produtos');

        addToast({
          type: 'error',
          title: 'Falha!',
          description: 'Não temos mais produto para adicionar!',
        });
        return;
      }

      updateSuccess(id, stock);
    },
    [addToast, updateSuccess],
  );

  const addToCart = useCallback(
    async (id) => {
      const newCart = cart;

      const productExists = newCart.find(
        (p: ProductStock) => p.itemProduct.product.id === id,
      );

      const stock = await api.get(`/products/${id}`);

      const stockAmount = stock.data.stock;
      const currentAmount = productExists ? productExists.itemProduct.stock : 0;

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

        const item = { stock: 1, product: data };

        newCart.push({
          itemProduct: {
            ...item,
            stock: 1,
          },
        });

        localStorage.setItem('@list:product', JSON.stringify(newCart));

        setCart([...newCart]);
      }
    },
    [cart],
  );

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

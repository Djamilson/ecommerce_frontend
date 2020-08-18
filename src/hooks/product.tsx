import React, { createContext, useCallback, useState, useContext } from 'react';

import { Product, ProductItemProps } from '../pages/Dashboard/ProductItem';

interface ProductState {
  token: string;
  product: Product;
}

interface ProductContextData {
  product: Product;
  addProduct(dataProduct: ProductItemProps): Promise<void>;
  removeProduct(dataProduct: ProductItemProps): Promise<void>;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);

const CartProduct: React.FC = ({ children }) => {
  const [data, setData] = useState<ProductState>(() => {
    return {} as ProductState;
  });

  const addProduct = useCallback(async ({ product }) => {
    console.log('Estou no hook', product);
  }, []);

  const removeProduct = useCallback(async ({ product }) => {
    console.log('Estou no hook Removendo product', product);
  }, []);

  return (
    <ProductContext.Provider
      value={{ product: data.product, addProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContextData {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useAuth mus be used within an AuthProduct');
  }

  return context;
}

export { CartProduct, useProduct };

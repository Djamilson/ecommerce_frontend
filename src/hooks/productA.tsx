import React, { createContext, useCallback, useState, useContext } from 'react';

import { Product, ProductItemProps } from '../pages/Dashboard/ProductItem';

interface ProductState {
  product: ProductItemProps;
}

interface SignInCredentials {
  email: string;
}

interface ProductContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  addProduct(product: Product): Promise<void>;
  removeProduct(product: Product): Promise<void>;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);

const ServicProduct: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ProductState>(() => {
    return {} as ProductState;
  });

  const signIn = useCallback(async ({ email }) => {
    console.log('Passou: ', email);
  }, []);

  const addProduct = useCallback(async ({ product }) => {
    console.log('Estou na função hooks: ', product);
    setProducts({ ...products, product });
  }, []);

  const removeProduct = useCallback(async ({ product }) => {
    setProducts({ ...products, product });
  }, []);

  return (
    <ProductContext.Provider value={{ signIn, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContextData {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProduct mus be used within an AuthProvider');
  }

  return context;
}

export { ServicProduct, useProduct };

import React, { createContext, useCallback, useState, useContext } from 'react';

import { Product, ProductItemProps } from '../pages/Dashboard/ProductItem';

interface ProductState {
  product: Product;
}

interface ProductStateList {
  product?: Product[];
}

interface ProductContextData {
  product: Product;
  list: Product[];
  addProduct(dataProduct: ProductItemProps): Promise<void>;
  removeProduct(dataProduct: ProductItemProps): Promise<void>;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);

const CartProduct: React.FC = ({ children }) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [item, setItem] = useState<Product>({} as Product);

  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = useCallback(async ({ product }) => {
    console.log('Estou no hook add:', product);
    setItem(product);

    setCount(count + 1);

    setProducts(product);
    setData(product);
  }, []);

  const removeProduct = useCallback(async ({ product }) => {
    console.log('Estou no hook Removendo product', product);
    console.log('Lista de product: ', products);
    console.log('Lista de product: ', data);
    console.log('count: ', count);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product: item,
        list: products,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContextData {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useCart mus be used within an CartProduct');
  }

  return context;
}

export { CartProduct, useProduct };

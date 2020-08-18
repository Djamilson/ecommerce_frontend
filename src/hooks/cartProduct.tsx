/* import React, { createContext, useCallback, useState, useContext } from 'react';

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
*/

import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import { Product, ProductItemProps } from '../pages/Dashboard/ProductItem';

interface CartContextData {
  product: Product;
  addProduct(itemProduct: ProductItemProps): Promise<void>;
  removeProduct(itemProduct: ProductItemProps): Promise<void>;
  updateUser(product: Product): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProduct: React.FC = ({ children }) => {
  const [data, setData] = useState<Product>(() => {
    return {} as Product;
  });

  const [cart, setCart] = useState<Product[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let value = 0;
    cart.map((item) => {
      value += item.price;
    });

    setTotalValue(value);
  }, []);

  const addProduct = useCallback(async ({ product }) => {
    console.log('Hook vou add esse this:', product);

    const newCart = cart;
    newCart.push(product);

    setCart([...newCart]);

    // setCart([...cart, product]);

    // setProducts((oldProduct) => [...oldProduct, product]);
  }, []);

  const removeProduct = useCallback(async ({ product }) => {
    console.log('=======');

    console.log('Meu Carrinho>> ', cart);
    console.log('=======');

    // console.log('Mostrando dados: data product: ', data);
    // console.log('=>> Lista de products: ', products);
  }, []);

  const updateUser = useCallback(
    (product: Product) => {
      setData(product);
    },
    [setData],
  );

  return (
    <CartContext.Provider
      value={{
        product: data,
        addProduct,
        removeProduct,
        updateUser,
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

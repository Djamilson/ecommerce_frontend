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
  totalItens: number;
  totalValue: number;
  addProduct(itemProduct: ProductItemProps): Promise<void>;
  removeProduct(index: number): Promise<void>;
}

interface ProductAmount {
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

  const [totalValue, setTotalValue] = useState(0);
  const [totalItens, setTotalItens] = useState(0);

  useEffect(() => {
    const value = 0;
    // cart.map((item: ProductAmount) => (value.product += item.price));

    setTotalValue(value);
    setTotalItens(cart.length);
  }, [cart]);

  const addProduct = useCallback(async ({ product }) => {
    const item = { amount: 1, product };

    const newCart = cart;

    newCart.push(item);

    localStorage.setItem('@list:product', JSON.stringify(newCart));

    setCart([...newCart]);
  }, []);

  const removeProduct = useCallback(async (index) => {
    console.log('Vou começar a remover:', index);

    const newCart = cart.filter((item, i) => i !== index);

    localStorage.setItem('@list:product', JSON.stringify(newCart));

    setCart([...newCart]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalValue,
        totalItens,
        addProduct,
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

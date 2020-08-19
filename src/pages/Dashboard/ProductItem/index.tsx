import React, { useCallback, useMemo, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductAmount, useCartProduct } from '../../../hooks/cartProduct';
import { Container } from './styles';

export interface Product {
  id: number;
  title: string;
  price: number;
  priceFormatted: number;
  image: string;
}

export interface ProductItemProps {
  product: Product;
}
interface ProductProps {
  amount: number;
  product: Product;
}

const ProductItem: React.FC<ProductAmount> = (itemProduct: ProductAmount) => {
  const { addProduct, cart } = useCartProduct();
  /*
  const total = cart.reduce((total[]: number, item: ProductProps) => {
    return total[item.product.id] + item.amount;
  }, 0); */

  const amount = useMemo(
    () =>
      cart.reduce((sumAmount: any, item: ProductAmount) => {
        console.log('==>>', cart);
        console.log('==>>', item);
         

        sumAmount[item.itemProduct.product.id] = item.itemProduct.amount;

        return sumAmount;
      }, {}),
    [cart],
  );

  useEffect(() => {
    console.log('minhs:: ', cart);
  }, []);

  const addItem = useCallback(
    async (idProduct: number) => {
      await addProduct(idProduct);
    },
    [addProduct],
  );

  return (
    <Container>
      <img
        src={itemProduct.itemProduct.product.image}
        alt={itemProduct.itemProduct.product.title}
      />
      <strong>{itemProduct.itemProduct.product.title}</strong>
      <span>{itemProduct.itemProduct.product.priceFormatted}</span>

      <button
        type="button"
        onClick={() => addItem(itemProduct.itemProduct.product.id)}
      >
        <div>
          <MdAddShoppingCart size={16} color="#fff" />

          {amount[itemProduct.itemProduct.product.id] || 0}
        </div>
        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </Container>
  );
};

export default ProductItem;

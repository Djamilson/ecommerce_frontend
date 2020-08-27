import React, { useCallback, useMemo } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductStock, useCartProduct } from '../../../hooks/cartProduct';
import { Container } from './styles';

export interface Product {
  id: number;
  name: string;
  price: number;
  priceFormatted: number;
  image: string;
}

export interface ProductItemProps {
  product: Product;
}
interface ProductProps {
  stock: number;
  product: Product;
}

const ProductItem: React.FC<ProductStock> = (itemProduct: ProductStock) => {
  const { addToCart, cart } = useCartProduct();
  /*
  const total = cart.reduce((total[]: number, item: ProductProps) => {
    return total[item.product.id] + item.amount;
  }, 0); */

  const amount = useMemo(
    () =>
      cart.reduce((sumAmount: any, item: ProductStock) => {
        console.log('==>>', cart);
        console.log('==>>', item);

        sumAmount[item.itemProduct.product.id] = item.itemProduct.stock;

        return sumAmount;
      }, {}),
    [cart],
  );

  const addItem = useCallback(
    async (idProduct: number) => {
      await addToCart(idProduct);
    },
    [addToCart],
  );

  return (
    <Container>
      <img
        src={itemProduct.itemProduct.product.image}
        alt={itemProduct.itemProduct.product.name}
      />
      <strong>{itemProduct.itemProduct.product.name}</strong>
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

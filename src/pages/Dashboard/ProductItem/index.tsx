import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { number } from 'yup';

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

const ProductItem: React.FC<ProductAmount> = ({ product }) => {
  const { addProduct, cart } = useCartProduct();

  const amount = useMemo(
    () =>
      cart.reduce((sumAmount: any, item: ProductAmount) => {
        sumAmount[item.product.id] = item.amount;

        return sumAmount;
      }, {}),
    [cart],
  );

  const addItem = useCallback(
    async (idProduct: number) => {
      await addProduct(idProduct);
    },
    [addProduct],
  );

  return (
    <Container>
      <img src={product.product.image} alt={product.product.title} />
      <strong>{product.product.title}</strong>
      <span>{product.product.priceFormatted}</span>

      <button type="button" onClick={() => addItem(product.product.id, product.amount)}>
        <div>
          <MdAddShoppingCart size={16} color="#fff" />
          {amount[product.product.id] || 0}
        </div>
        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </Container>
  );
};

export default ProductItem;

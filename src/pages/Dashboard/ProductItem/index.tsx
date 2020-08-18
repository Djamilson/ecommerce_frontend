import React, { useEffect, useState, useCallback } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useProduct } from '../../../hooks/product';
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

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addProduct } = useProduct();

  const addItemA = useCallback(
    async (productItem: Product) => {
      console.log('Product:', productItem);

      await addProduct({
        product: productItem,
      });
    },
    [addProduct],
  );

  const addItem = useCallback(async (productItem: Product) => {
    console.log('Product:', productItem);

    // await addProduct(productItem);
  }, []);
  // addItem(product)
  /* const handleSelected = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []); */
  return (
    <Container>
      <img src={product.image} alt={product.title} />
      <strong>{product.title}</strong>
      <span>{product.priceFormatted}</span>

      <button type="button" onClick={() => addItemA(product)}>
        <div>
          <MdAddShoppingCart size={16} color="#fff" />
        </div>
        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </Container>
  );
};

export default ProductItem;

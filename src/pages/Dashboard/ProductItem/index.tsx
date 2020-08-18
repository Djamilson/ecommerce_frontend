import React, { useEffect, useState, useCallback } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useCartProduct } from '../../../hooks/cartProduct';
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
  const {
    addProduct,
    product: item,
    removeProduct,
    updateUser,
  } = useCartProduct();

  const addItemA = useCallback(
    async (productItem: Product) => {
      await addProduct({
        product: productItem,
      });

      await updateUser(productItem);

      await removeProduct({
        product: productItem,
      });
    },
    [addProduct, updateUser, removeProduct],
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

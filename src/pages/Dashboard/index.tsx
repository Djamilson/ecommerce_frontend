import React, { useEffect, useMemo, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../_services/api';
import Header from '../../components/Header';
import { ProductAmount } from '../../hooks/cartProduct';
import { formatPrice } from '../../utils/format';
import ProductItem, { Product } from './ProductItem';
import { Container, ProductList } from './styles';

const DashBoard: React.FC = () => {
  const [products, setProducts] = useState<ProductAmount[]>(() => {
    return [] as ProductAmount[];
  });

  useEffect(() => {
    api.get('products').then((res) => {
      const productFormatted = res.data.map((product: Product) => {
        return {
          ...product,
          priceFormatted: formatPrice(product.price),
        };
      });
      setProducts(productFormatted);
    });
  }, []);

  return (
    <Container>
      <Header />
      <ProductList>
        {products.map((product: ProductAmount) => {
          return <ProductItem key={product.product.id} product={product} />;
        })}
      </ProductList>
    </Container>
  );
};

export default DashBoard;

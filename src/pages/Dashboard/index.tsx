import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../_services/api';
import Header from '../../components/Header';
import { formatPrice } from '../../utils/format';
import ProductItem, { Product } from './ProductItem';
import { Container, ProductList } from './styles';

const DashBoard: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products').then((res) => {
      const productFormatted = res.data.map((product: Product) => {
        return {
          ...product,
          priceFormatted: formatPrice(product.price),
        };
      });

      console.log('-->>', productFormatted);

      setProducts(productFormatted);
    });
  }, []);

  return (
    <Container>
      <Header />
      <ProductList>
        {products.map((product: Product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </ProductList>
    </Container>
  );
};

export default DashBoard;

import React, { useEffect, useMemo, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../_services/api';
import Header from '../../components/Header';
import { ProductStock } from '../../hooks/cartProduct';
import { formatPrice } from '../../utils/format';
import ProductItem, { Product } from './ProductItem';
import { Container, ProductList } from './styles';

const DashBoard: React.FC = () => {
  const [products, setProducts] = useState<ProductStock[]>(() => {
    return [] as ProductStock[];
  });

  useEffect(() => {
    api.get('products').then((res) => {
      const productFormatted = res.data.data.map((product: Product) => {
        return {
          itemProduct: {
            product: {
              ...product,
              priceFormatted: formatPrice(product.price),
            },
          },
        };
      });

      setProducts(productFormatted);
    });
  }, []);

  return (
    <Container>
      <Header />
      <ProductList>
        {products.map((product: ProductStock) => {
          return (
            <ProductItem
              key={product.itemProduct.product.id}
              itemProduct={product.itemProduct}
            />
          );
        })}
      </ProductList>
    </Container>
  );
};

export default DashBoard;

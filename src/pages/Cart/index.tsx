import React, { useCallback } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import Header from '../../components/Header';
import { useCartProduct } from '../../hooks/cartProduct';
import { Product } from '../Dashboard/ProductItem';
import { Container, Content, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
  const {
    cart,
    totalValue,
    addProduct,

    removeProduct,
  } = useCartProduct();

  const removeItem = useCallback(
    async (index: number) => {
      await removeProduct(index);
    },
    [removeProduct],
  );

  return (
    <Container>
      <Header />
      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.product.id}>
                <td>
                  <img src={item.product.image} alt={item.product.title} />
                </td>
                <td>
                  <strong>{item.product.title}</strong>
                  <span>{item.product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button">
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>

                    <input type="number" readOnly value={item.amount} />

                    <button type="button">
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>R$ 258,00</strong>
                </td>
                <td>
                  <button type="button" onClick={() => removeItem(index)}>
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <button type="button">Finalizar pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>R$ 1.920,28</strong>
          </Total>
        </footer>
      </Content>
    </Container>
  );
};

export default Cart;

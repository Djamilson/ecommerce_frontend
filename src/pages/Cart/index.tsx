import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import Header from '../../components/Header';
import { useCartProduct } from '../../hooks/cartProduct';
import { Container, Content, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
  const {
    cart,
    totalValue,
    addProduct,

    removeProduct,
  } = useCartProduct();

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
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <span>{item.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button">
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>

                    <input type="number" readOnly value={1} />

                    <button type="button">
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>R$ 258,00</strong>
                </td>
                <td>
                  <button type="button">
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

import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import Header from '../../components/Header';
import { Container, Content, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
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
            <tr>
              <td>
                <img
                  src="https://static.netshoes.com.br/produtos/tenis-adidas-sensebounce-street-masculino/42/COL-6968-742/COL-6968-742_zoom2.jpg?ts=1584624351&ims=326x"
                  alt="Tenis"
                />
              </td>
              <td>
                <strong>Tênis muito massa</strong>
                <span>R$ 129,90</span>
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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useParams, useHistory } from 'react-router-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../../_services/api';
import Header from '../../../components/Headers/Header';
import { useAuth } from '../../../hooks/auth';
import { formatPrice } from '../../../utils/format';
import {
  Container,
  Content,
  ProductTable,
  Total,
  TransactionsTable,
} from './styles';

interface Product {
  id: string;
  name: string;
  price: number;
  section_id: string;
  stock: string;
  image: string;
  image_url: string;
}

interface OrderProducts {
  id: string;
  price: number;
  product_id: string;
  product: Product;
  subtotal: number;
  order_id: string;
  quantity: number;
}

interface Order {
  id: string;
  total: number;
  fee: number;
  created_at: Date;
  order_products: OrderProducts[];
  subtotal: number;
}

interface ParamTypes {
  order_id: string;
}

const OrderProducts: React.FC = () => {
  const { user } = useAuth();
  const [order, setOrder] = useState({} as Order);

  const { order_id } = useParams<ParamTypes>();

  useEffect(() => {
    console.log('meu id: ', order_id);
    async function load() {
      try {
        const { data } = await api.get(`orders/${order_id}`);
        console.log(' busca::::>', data);

        setOrder(data);
      } catch (err) {
        console.log(err);
      } finally {
        console.log('Finalizou');
      }
    }

    load();
  }, [user.id]);

  const renderItems = useMemo(
    () =>
      order.order_products.map((item: OrderProducts) => (
        <tr key={item.id}>
          <td>kkk</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.subtotal}</td>
          <td>
            <button type="button" onClick={() => {}} disabled={false}>
              Lista itens
            </button>
          </td>
        </tr>
      )),

    [order],
  );

  return (
    <Container>
      <Header />

      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th>Data compra</th>
              <th>Frete</th>
              <th>SubTotal</th>
              <th>Total+SubTotal</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>{renderItems}</tbody>
        </ProductTable>

        <TransactionsTable>
          <thead>
            <tr>
              <th />
              <th>band</th>
              <th>N da autorização</th>
              <th>N transação</th>
              <th>Valor autorizado</th>
            </tr>
          </thead>
          <tbody>
            <td />
            <td>kkk</td>
            <td>kk</td>
            <td>nnnmm</td>
          </tbody>
        </TransactionsTable>

        <footer>
          <button type="button" onClick={() => {}} disabled={false}>
            Cancelar pedido
          </button>

          <Total>
            <span>TOTAL</span>
            <strong>R$ 456,50</strong>
          </Total>
        </footer>
      </Content>
    </Container>
  );
};

export default OrderProducts;

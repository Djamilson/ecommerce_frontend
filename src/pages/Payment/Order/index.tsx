import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../../_services/api';
import Header from '../../../components/Headers/Header';
import { useAuth } from '../../../hooks/auth';
import { formatPrice } from '../../../utils/format';
import { Container, Content, ProductTable } from './styles';

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

const Order: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get(`orders`);
        console.log(' llllll>', data);

        const formatData = data.map((item: Order) => {
          return {
            id: item.id,
            subtotal: formatPrice(Number(item.total - item.fee)),
            total: formatPrice(Number(item.total)),
            fee: formatPrice(Number(item.fee)),
            created_at: format(new Date(item.created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
          };
        });

        setOrders(formatData);
      } catch (err) {
        console.log(err);
      } finally {
        console.log('Finalizou');
      }
    }

    load();
  }, [user.id]);

  const handleListProduct = useCallback(
    (order_id: string) => {
      history.push(`/orders/products/${order_id}`);
    },
    [history],
  );

  const renderItems = useMemo(
    () =>
      orders.map((order) => (
        <tr key={order.id}>
          <td>{order.created_at}</td>
          <td>{order.fee}</td>
          <td>{order.subtotal}</td>
          <td>{order.total}</td>
          <td>
            <button
              type="button"
              onClick={() => handleListProduct(order.id)}
              disabled={false}
            >
              Lista itens
            </button>
          </td>
        </tr>
      )),

    [orders],
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
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>{renderItems}</tbody>
        </ProductTable>
      </Content>
    </Container>
  );
};

export default Order;

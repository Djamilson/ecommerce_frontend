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
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
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
  total: string;
  fee: string;
  created_at: Date;
  subtotal: string;
}

interface ParamTypes {
  order_id: string;
}
interface PropsTransaction {
  id: string;
  transaction_id: string;
  order_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  tid: string;
  authorized_amount: string;
  installments: number;
  created_at: string;
}

const OrderProducts: React.FC = () => {
  const { order_id } = useParams<ParamTypes>();
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();

  const [order, setOrder] = useState<Order>({} as Order);
  const [transaction, setTransaction] = useState<PropsTransaction>(
    {} as PropsTransaction,
  );

  const [orderProducts, setOrderProducts] = useState<OrderProducts[]>([]);

  useEffect(() => {
    console.log('meu id: ', order_id);
    async function load() {
      try {
        const { data } = await api.get(`orders/${order_id}`);
        console.log(' busca::::>', data);

        const t = {
          id: String(data.id),
          subtotal: formatPrice(Number(data.total)),
          total: formatPrice(Number(data.total) + Number(data.fee)),
          fee: formatPrice(Number(data.fee)),
          created_at: new Date(
            format(new Date(data.created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
          ),
        };

        setOrder(t);

        const formatProduct = data.order_products.map((item: OrderProducts) => {
          return {
            id: item.id,
            product_id: item.product_id,
            order_id: item.order_id,
            quantity: item.quantity,
            price: formatPrice(Number(item.price)),
            product: {
              ...item.product,
              price: formatPrice(Number(item.product.price)),
            },
            subtotal: formatPrice(Number(item.subtotal)),
          };
        });

        setOrderProducts(formatProduct);
      } catch (err) {
        console.log(err);
      } finally {
        console.log('Finalizou');
        console.log('OrderProducts', orderProducts);
      }
    }

    load();
  }, [order_id]);

  useEffect(() => {
    console.log('meu id da order: ', order_id);
    async function loadTransaction() {
      try {
        const { data } = await api.get(`/transactions/orders/${order_id}`);
        console.log('My transaction:', data);
        setTransaction({
          ...data,
          authorized_amount: formatPrice(Number(data.authorized_amount)),
          created_at: new Date(
            format(new Date(data.created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
          ),
        });
      } catch (err) {
        console.log(err);
      } finally {
        console.log('Finalizou');
        console.log('OrderProducts', orderProducts);
      }
    }

    loadTransaction();
  }, [order_id]);

  /*
  const renderItems = useMemo(() => {
    if (!order) {
      console.log('==>>', order);
    }
    return (
      order &&
      order.order_products.map((item) => {
        return (
          <tr key={item.id}>
            <td>kkk</td>
            <td>kk</td>
            <td>pp</td>
            <td>ppp</td>
            <td>
              <button type="button" onClick={() => {}} disabled={false}>
                Lista itens
              </button>
            </td>
          </tr>
        );
      })
    );
  }, [order_id]); */

  const handlerCanceledTransaction = useCallback(
    async (id: string) => {
      try {
        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        console.log('Meus dados: para salvar', id);
        await api.delete(`/transactions/${id}`);
        // history.push('/');

        addToast({
          type: 'success',
          title: 'Informações cadastrada!',
          description: 'Dados inseridos com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Falha no cadastro!',
          description:
            'Ocorreu uma falha ao tentar fazer o cadastro, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, addLoading, removeLoading],
  );

  return (
    <Container>
      <Header />

      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {!order
              ? `${(
                  <tr>
                    <td colSpan={3}>Carregando...</td>
                  </tr>
                )}`
              : orderProducts.map((item: OrderProducts) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img src={item.product.image} alt={item.product.name} />
                      </td>
                      <td>
                        <strong>{item.product.name}</strong>
                        <span>{item.price}</span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.subtotal}</td>
                    </tr>
                  );
                })}
          </tbody>
        </ProductTable>

        <TransactionsTable>
          <thead>
            <tr>
              <th />
              <th>Bandeira do cartão</th>
              <th>Status</th>
              <th>N transação</th>
              <th>N de parcelas</th>
              <th>Valor autorizado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>
                <div>{transaction.brand}</div>
              </td>
              <td>{transaction.status}</td>
              <td>{transaction.authorization_code}</td>
              <td>{transaction.installments}</td>
              <td>{transaction.authorized_amount}</td>
            </tr>
          </tbody>
        </TransactionsTable>

        <footer>
          <button
            type="button"
            onClick={() => handlerCanceledTransaction(transaction.id)}
          >
            Cancelar pedido
          </button>

          <Total>
            <div>
              <div>
                <span>Frete</span>
                <strong>{order.fee}</strong>
              </div>
              <div>
                <span>SubTotal</span>
                <strong>{order.subtotal}</strong>
              </div>
            </div>

            <section>
              <span>TOTAL</span>
              <strong>{order.total}</strong>
            </section>
          </Total>
        </footer>
      </Content>
    </Container>
  );
};

export default OrderProducts;

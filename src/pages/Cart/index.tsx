import React, { useCallback, useMemo } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Headers/Header';
import { useCartProduct } from '../../hooks/cartProduct';
import { ProductStock } from '../../hooks/cartProduct';
import { formatPrice } from '../../utils/format';
import { Container, Content, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
  const { cart, removeProduct, updateAmount } = useCartProduct();
  const history = useHistory();

  const total = useMemo(
    () =>
      formatPrice(
        cart.reduce((totalsum, item) => {
          return (
            totalsum + item.itemProduct.product.price * item.itemProduct.stock
          );
        }, 0),
      ),
    [cart],
  );

  const products = useMemo(
    () =>
      cart.map((item: ProductStock) => {
        return {
          subtotal: formatPrice(
            Number(item.itemProduct.product.price) *
              Number(item.itemProduct.stock),
          ),
          amount: item.itemProduct.stock,
          product: {
            ...item.itemProduct.product,
            priceFormatted: formatPrice(item.itemProduct.product.price),
          },
        };
      }),
    [cart],
  );

  const removeItem = useCallback(
    async (index: number) => {
      await removeProduct(index);
    },
    [removeProduct],
  );

  const increment = useCallback(
    async (id: number, stock: number) => {
      await updateAmount(id, stock + 1);
    },
    [updateAmount],
  );

  const decrement = useCallback(
    async (id: number, stock: number) => {
      await updateAmount(id, stock - 1);
    },
    [updateAmount],
  );

  const handlePayment = useCallback(() => {
    history.push('/card');
  }, [history]);

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
            {products.map((item) => (
              <tr key={item.product.id}>
                <td>
                  <img src={item.product.image} alt={item.product.name} />
                </td>
                <td>
                  <strong>{item.product.name}</strong>
                  <span>{item.product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() => decrement(item.product.id, item.amount)}
                    >
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>

                    <input type="number" readOnly value={item.amount} />

                    <button
                      type="button"
                      onClick={() => increment(item.product.id, item.amount)}
                    >
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{item.subtotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <button type="button" onClick={handlePayment}>
            Fechar pedido
          </button>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Content>
    </Container>
  );
};

export default Cart;

import React, { useCallback, useMemo } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import Header from '../../components/Header';
import { useCartProduct } from '../../hooks/cartProduct';
import { ProductAmount } from '../../hooks/cartProduct';
import { formatPrice } from '../../utils/format';
import { Container, Content, ProductTable, Total } from './styles';

const Cart: React.FC = () => {
  const { cart, removeProduct, updateAmount } = useCartProduct();

  const total = useMemo(
    () =>
      formatPrice(
        cart.reduce((totalsum, item) => {
          return (
            totalsum + item.itemProduct.product.price * item.itemProduct.amount
          );
        }, 0),
      ),
    [cart],
  );

  const products = useMemo(
    () =>
      cart.map((item: ProductAmount) => {
        return {
          subtotal: formatPrice(
            Number(item.itemProduct.product.price) *
              Number(item.itemProduct.amount),
          ),
          amount: item.itemProduct.amount,
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
    async (id: number, amount: number) => {
      await updateAmount(id, amount + 1);
    },
    [updateAmount],
  );

  const decrement = useCallback(
    async (id: number, amount: number) => {
      await updateAmount(id, amount - 1);
    },
    [updateAmount],
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
            {products.map((item) => (
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
          <button type="button">Finalizar pedido</button>

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

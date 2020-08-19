import React, { useCallback, useMemo, useState, useEffect } from 'react';
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

interface PropsItem {
  subtotal: string;
  productAmount: ProductAmount;
}

const Cart: React.FC = () => {
  const {
    cart,

    removeProduct,
    incrementAmount,
    decrementAmount,
  } = useCartProduct();

  const [newCart, setNewCart] = useState<PropsItem[]>(() => {
    return [] as PropsItem[];
  });

  const total = useMemo(
    () =>
      formatPrice(
        cart.reduce((totalsum, item) => {
          return totalsum + item.product.price * item.amount;
        }, 0),
      ),
    [cart],
  );

  useEffect(() => {
    let list = [] as PropsItem[];

    list = cart.map((item) => {
      return {
        productAmount: item,
        subtotal: formatPrice(Number(item.product.price) * Number(item.amount)),
      };
    });

    setNewCart(list);
  }, [cart]);

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
            {newCart.map((item) => (
              <tr key={item.productAmount.product.id}>
                <td>
                  <img
                    src={item.productAmount.product.image}
                    alt={item.productAmount.product.title}
                  />
                </td>
                <td>
                  <strong>{item.productAmount.product.title}</strong>
                  <span>{item.productAmount.product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        decrementAmount(
                          item.productAmount.product.id,
                          item.productAmount.amount,
                        )
                      }
                    >
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>

                    <input
                      type="number"
                      readOnly
                      value={item.productAmount.amount}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        incrementAmount(
                          item.productAmount.product.id,
                          item.productAmount.amount,
                        )
                      }
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
                    onClick={() => removeItem(item.productAmount.product.id)}
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

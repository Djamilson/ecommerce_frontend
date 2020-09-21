import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useEffect,
  useMemo,
} from 'react';
import Cards from 'react-credit-cards';
import { FiPlusCircle, FiCheck, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import pagarme from 'pagarme';
import * as Yup from 'yup';

import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import Input from '../../../components/Form/Input';
import InputMask from '../../../components/Form/InputMask';
import Header from '../../../components/Headers/Header';
import { useCartProduct } from '../../../hooks/cartProduct';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import { formatPrice } from '../../../utils/format';
import getValidationErros from '../../../utils/getValidationErros';
import Select from './Select';
/* import {
  Container,
  ContainerForm,
  Content,
  PaymentTitle,
  Payment,
  CheckoutButton,
  ScheduleItem,
  AddressItem,
} from './styles'; */

import {
  Container,
  Box,
  Content,
  AnimationContainer,
  Background,
  CardItem,
  ScheduleItem,
  InstallmentItem,
  CardFee,
} from './styles';

interface SignUpFormData {
  name: string;
  card_number: string;
}

interface ICard {
  id: string;
  holder_name: string;
  number: string;
  expiration_date: string;
}

interface IFee {
  sedex: string;
  pac: string;
}

const Card: React.FC = () => {
  const { cart, clearCart } = useCartProduct();
  const [installments, setInstallments] = useState(1);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();

  const [card, setCard] = useState({
    holder_name: '',
    number: '',
    expiration_date: '',
    cvv: '',
    id: '',
  });

  const totalProducts = useMemo(
    () =>
      cart.reduce((totalsum, item) => {
        return (
          totalsum + item.itemProduct.product.price * item.itemProduct.stock
        );
      }, 0),
    [cart],
  );

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          card_holder_name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log('Meus dados: para salvar', data);

        let cardData;

        const newCard_number = data.card_number.replace(/([^0-9])/g, '');
        const newData = { ...data, card_number: newCard_number };

        const client_retur = await pagarme.client
          .connect({
            encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
          })
          .then((client_: any) => {
            return client_;
          });

        const card_hash = await client_retur.security.encrypt(newData);

        const amount = totalProducts * 100;
        const fee = 234.23;

        console.log('Aqui vai ::', card_hash);
        await api.post('/orders', {
          ...newData,
          card_hash,
          fee,
          installments,
          products: cart,
          amount,
        });

        history.push('/payment');
        clearCart();

        addToast({
          type: 'success',
          title: 'Informações cadastrada!',
          description:
            'Compra efetuada com sucesso, aguarde alguns momento para aprovação!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha na compra!',
          description:
            'Ocorreu uma falha ao tentar finalizar a compra, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [
      pagarme,
      cart,
      addToast,
      installments,
      removeLoading,
      addLoading,
      history,
      clearCart,
    ],
  );

  const handleSelectCard = useCallback(
    async (data: ICard) => {
      /* setData({
      ...data,
      card: {
        card_holder_name: holder_name,
        card_number: number,
        card_expiration_date: expiration_date,
        card_cvv: '',
      },
    }); */
      console.log('Passou:: ', data);
      setCard({
        holder_name: data.holder_name,
        number: data.number,
        expiration_date: data.expiration_date,
        cvv: '',
        id: data.id,
      });
    },
    [setCard],
  );

  const [renderInstallments, setRenderInstallments] = useState([
    { label: '', value: '' },
  ]);

  useEffect(() => {
    setRenderInstallments(
      [...new Array(4)].map((item, idx) => {
        const installment = idx + 1;
        return {
          label: `${installment} x  ${formatPrice(
            Number(totalProducts) / installment,
          )}`,
          value: `${installment}`,
        };
      }),
    );
  }, []);

  const [fee, setFee] = useState<IFee>({ pac: '', sedex: '' } as IFee);

  useEffect(() => {
    async function load() {
      const res = await api.get(`/fees/77018452`);
      console.log('resp::: fee', res.data);
      setFee(res.data);
    }
    load();
  }, []);

  function handleSelectInstallments(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    console.log('Selecionou o numero de parcelas ', value);
    setInstallments(Number(value));
  }

  const handleFeePac = useMemo(
    () => fee.pac !== '' && formatPrice(Number(fee.pac)),
    [fee],
  );
  const handleFeeSedex = useMemo(
    () => fee.sedex !== '' && formatPrice(Number(fee.sedex)),
    [fee],
  );

  return (
    <Container>
      <Header />
      <Box>
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <header>
                <p>
                  <img src={warningIcon} alt="Aviso importante" />
                  Importante! <br />
                  Preencha todos os dados
                </p>
                <button type="submit">
                  <span>
                    <FiCheck />
                  </span>
                  <strong>Finalizar compra</strong>
                </button>
              </header>

              <fieldset>
                <legend>Calcular o fretejjj</legend>
                <CardFee>
                  <InputMask
                    id="idfee"
                    mask="99.999-999"
                    placeholder="CEP"
                    name="fee"
                    icon={FiLock}
                    label="Entre com o CEP"
                  />
                  <section>
                    <button type="button">
                      <span>Sedex</span>
                      <strong>{handleFeeSedex}</strong>
                    </button>
                    <button type="button">
                      <span>Pac</span>
                      <strong>{handleFeePac}</strong>
                    </button>
                  </section>
                </CardFee>
              </fieldset>

              <fieldset>
                <legend>Dados do cartão de crédito</legend>

                <InstallmentItem>
                  <Select
                    name="installment"
                    label="Número de parcelas"
                    id="idInstallment"
                    onChange={handleSelectInstallments}
                    options={renderInstallments}
                  />
                </InstallmentItem>
                <CardItem>
                  <Input
                    placeholder="Nome como está no cartão"
                    name="card_holder_name"
                    icon={FiLock}
                    label="Nome"
                  />

                  <InputMask
                    id="idCardNumber"
                    mask="9999 9999 9999 9999"
                    icon={FiLock}
                    placeholder="Número do cartão"
                    name="card_number"
                    label="Número do cartão"
                  />
                </CardItem>

                <ScheduleItem>
                  <InputMask
                    id="idCardExpirationDate"
                    mask="99/99"
                    name="card_expiration_date"
                    label="Data de expiração"
                    placeholder="Data de expiração"
                    icon={FiLock}
                  />

                  <InputMask
                    id="idCardCvv"
                    name="card_cvv"
                    mask="999"
                    label="Código de segurança"
                    placeholder="CVV"
                    icon={FiLock}
                  />
                </ScheduleItem>
              </fieldset>
              <footer>
                <p>
                  <img src={warningIcon} alt="Aviso importante" />
                  Importante! <br />
                  Preencha todos os dados
                </p>
              </footer>
            </Form>
          </AnimationContainer>
        </Content>
        <Background>
          <Cards
            number={card.number}
            name={card.holder_name}
            expiry={card.expiration_date}
            cvc={card.cvv}
            focused="number"
          />
        </Background>
      </Box>
    </Container>
  );
};

export default Card;

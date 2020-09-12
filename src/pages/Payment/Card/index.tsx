import React, { useState, useRef, useCallback } from 'react';
import Cards from 'react-credit-cards';
import { FiPlusCircle, FiCheck, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Scope } from '@unform/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import pagarme from 'pagarme';
import * as Yup from 'yup';

import api from '../../../_services/api';
import Input from '../../../components/Form/Input';
import InputMask from '../../../components/Form/InputMask';
import Header from '../../../components/Headers/Header';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
import {
  Container,
  Content,
  PaymentTitle,
  Payment,
  CheckoutButton,
  Loading,
} from './styles';

interface SignUpFormData {
  name: string;
}

interface ICard {
  id: string;
  holder_name: string;
  number: string;
  expiration_date: string;
}

const Card: React.FC = () => {
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

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      /*
       addLoading({
         loading: true,
         description: 'Aguarde ...',
       });
*/
      const schema = Yup.object().shape({
        card_holder_name: Yup.string().required('Nome obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('Meus dados: para salvar', data);

      let cardData;

      /* const client = await pagarme.client
        .connect({
          encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
        })
        .then((client_retur: any) => {
          return client_retur.security.encrypt(data);
        })
        .then((card_hash) => console.log(card_hash)); */

      const client_retur = await pagarme.client
        .connect({
          encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
        })
        .then((client_: any) => {
          return client_;
        });

      const card_hash = await client_retur.security.encrypt(data);

      const amount = 222;
      const items = [
        {
          id: 'e020d56f-d52d-419f-b6e8-e0856b0b4ad9',
          title: 'Book',
          description: 'Rocket',
          quantity: 2,
          unit_price: 12500,
        },
        {
          id: '7d89c145-6d56-4c21-9c10-58e2efb7cead',
          title: 'Mug',
          description: 'Rocket',
          quantity: 1,
          unit_price: 2500,
        },
      ];

      console.log('Aqui vai ::', card_hash);
      await api.post('/checkouts', {
        ...data,
        card_hash,
        installments,
        items,
        amount,
      });
      // history.push('/');
      /*
        addToast({
          type: 'success',
          title: 'Informações cadastrada!',
          description: 'Dados inseridos com sucesso!',
        }); */
    } catch (err) {
      /* if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha no cadastro!',
          description:
            'Ocorreu uma falha ao tentar fazer o cadastro, tente novamente!',
        }); */
    } finally {
      // removeLoading();
    }
  }, []);

  const handleSelectCard = useCallback(async (data: ICard) => {
    /* setData({
      ...data,
      card: {
        card_holder_name: holder_name,
        card_number: number,
        card_expiration_date: expiration_date,
        card_cvv: '',
      },
    }); */
    setCard({
      holder_name: data.holder_name,
      number: data.number,
      expiration_date: data.expiration_date,
      cvv: '',
      id: data.id,
    });
  }, []);

  const renderInstallments = useCallback(async () => {
    return [...new Array(4)].map((item, idx) => {
      const installment = idx + 1;
      return (
        <option value={installment}>
          {`${installment} x ${1100 / installment}`}
        </option>
      );
    });
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <PaymentTitle>Dados bancários</PaymentTitle>
          <Payment>
            <div className="form-area">
              <Input
                placeholder="Nome como está no cartão"
                icon={FiLock}
                name="card_holder_name"
                label="Nome no cartão"
              />

              <Input
                placeholder="Número do cartão"
                icon={FiLock}
                name="card_number"
                label="Número do cartão"
              />
              <div className="group">
                <div>
                  <Input
                    name="card_expiration_date"
                    label="Data de expiração"
                    placeholder="Data de expiração"
                    icon={FiLock}
                  />
                </div>
                <div>
                  <Input
                    name="card_cvv"
                    label="Código de segurança"
                    placeholder="CVV"
                    icon={FiLock}
                  />
                </div>
              </div>
            </div>
            <div className="credit-card">
              <Cards
                number={card.number}
                name={card.holder_name}
                expiry={card.expiration_date}
                cvc={card.cvv}
                focused="number"
              />
            </div>
          </Payment>
          <CheckoutButton>
            <button type="submit" className="checkout-button">
              Finalizar pagamento
            </button>
          </CheckoutButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Card;

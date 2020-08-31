import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiUser, FiMail, FiCheck } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import Button from '../../../components/Button';
import Select from '../../../components/Form/Select';
import Input from '../../../components/Input';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
import { AnimationContainer, Container, Content } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  pessword: string;
}

const AddressForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Você já pode fazer seu logon no Gobarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Falha no cadastro!',
          description:
            'Ocorreu uma falha ao tentar fazer o cagastro, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, addLoading, removeLoading, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <header>
              <p>
                <img src={warningIcon} alt="Aviso importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <Button type="submit">
                <span>
                  <FiCheck />
                </span>
                <strong>Salvar</strong>
              </Button>
            </header>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" label="Rua" />
            <Input
              label="Complemento"
              name="complement"
              icon={FiMail}
              placeholder="Complemento"
            />
            <Input
              label="Número Lote/Casa"
              name="password"
              icon={FiLock}
              placeholder="Número"
            />

            <fieldset>
              <legend>Seus dados</legend>

              <Input
                label="Número Lote/Casa"
                name="password"
                icon={FiLock}
                placeholder="Número"
              />
              <Input
                label="Número Lote/Casa"
                name="password"
                icon={FiLock}
                placeholder="Número"
              />
              <Input
                placeholder="Número"
                name="whatsapp"
                icon={FiLock}
                label="whatsApp"
              />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>

              <Select
                name="subject"
                label="Matéria"
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Artes', label: 'Artes' },
                ]}
              />

              <Input
                label="Complemento"
                name="complement"
                icon={FiMail}
                placeholder="Complemento"
              />
            </fieldset>
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default AddressForm;

import React, {
  useCallback,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  useMemo,
} from 'react';
import { FiPlusCircle, FiCheck, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import Header from '../../../components/Headers/Header';
import HeaderButton from '../../../components/Headers/HeaderButtonForm';
import SubHeader from '../../../components/Headers/SubHeader';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
// import { AnimationContainer, Container, Content, ScheduleItem } from './styles';
import { Container, Content, ContainerForm, ScheduleItem } from './styles';

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

  const INITIAL_STATE = {
    value: 0,
    label: 'Selecione o estado',
  };

  const INITIAL_CITY = {
    value: 0,
    label: 'Selecione a cidade',
  };

  const [selectedUf, setSelectedUf] = useState(INITIAL_STATE);
  const [selectedCity, setSelectedCity] = useState(INITIAL_CITY);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

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

  async function loadStates() {
    const response = await api.get(`states/select`);
    setUfs(response.data);
  }

  useMemo(() => loadStates(), []);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    //  setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    // setSelectedCity(city);
  }

  const loadCities = useCallback(async (state_id: string) => {
    try {
      if (Object.getPrototypeOf(state_id)) {
        const response = await api.get(`cities/${state_id}/select`, {
          params: {
            q: ``,
          },
        });

        setCities(response.data.itens);
      }
    } catch (err) {
    } finally {
    }
  }, []);

  return (
    <Container>
      <Content>
        <Header />
        <ContainerForm>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <header>
              <p>
                <img src={warningIcon} alt="Aviso importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <Button type="submit">Confirmar mudanças</Button>
            </header>

            <fieldset>
              <legend>
                Seu endereço
                <button type="submit">
                  <span>
                    <FiCheck />
                  </span>
                  <strong>Salvar</strong>
                </button>
              </legend>
              <Input
                placeholder="Rua/quadra"
                name="street"
                icon={FiLock}
                label="Rua/quadra"
              />
              <Input
                label="Número Lote/Casa"
                name="number"
                icon={FiLock}
                placeholder="Número"
              />

              <Input
                placeholder="Complemento"
                name="complement"
                icon={FiLock}
                label="Complemento"
              />

              <Input
                placeholder="Bairro"
                name="neighborhood"
                icon={FiLock}
                label="Bairro"
              />

              <Input
                placeholder="CEP"
                name="zip_code"
                icon={FiLock}
                label="CEP"
              />
            </fieldset>

            <fieldset>
              <legend>Localidade</legend>
              <ScheduleItem>
                <Select
                  name="subject"
                  label="Estado"
                  options={[
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                  ]}
                />

                <Select
                  name="subject"
                  label="Cidade"
                  options={[
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                    { value: 'Artes', label: 'Artes' },
                  ]}
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
        </ContainerForm>
      </Content>
    </Container>
  );
};

export default AddressForm;

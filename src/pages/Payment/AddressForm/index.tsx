import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useMemo,
} from 'react';
import { FiPlusCircle, FiCheck, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { ValueType } from 'react-select/src/types';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import Header from '../../../components/Headers/Header';
import SelectCity from '../../../components/SelectCity';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
// import { AnimationContainer, Container, Content, ScheduleItem } from './styles';
import { Container, Content, ContainerForm, ScheduleItem } from './styles';

type OptionType = { label: string; value: number };

interface SignUpFormData {
  name: string;
  email: string;
  pessword: string;
}

interface UF {
  value: string;
  label: string;
}

interface CITY {
  value: string;
  label: string;
}

const AddressForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();

  const INITIAL_CITY = {
    value: 0,
    label: 'Selecione a cidade',
  };

  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');

  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<CITY[]>([]);

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
    const response = await api.get(`states`);
    setUfs(response.data);
  }

  useMemo(() => loadStates(), []);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    console.log('Meu estado selecionado: ', uf);
    setSelectedUf(uf);
  }

  async function onChangeSelectState(e: ChangeEvent<HTMLSelectElement>) {
    console.log('e.target.value: ', e.target.value);
    // setSelectedUf(e.target.value);
    // setSelectedCity(INITIAL_CITY);
    // loadCities(e.target.value);
  }

  async function listCities() {
    if (selectedUf === '0') {
      return;
    }

    const response = await api.get(`cities/${selectedUf}/select`, {
      params: {
        q: ``,
      },
    });
    console.log('Cidades:', response.data);
    setCities(response.data);
  }

  useEffect(() => {
    listCities();
  }, [selectedUf]);

  const [limit] = useState(2);
  const [page] = useState(1);

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

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
                  name="state"
                  label="Estado"
                  id="uf"
                  onChange={handleSelectUf}
                  options={ufs}
                />
                <Select
                  name="city"
                  label="Cidade"
                  id="city"
                  onChange={handleSelectCity}
                  options={cities}
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

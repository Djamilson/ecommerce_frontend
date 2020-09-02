import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  useMemo,
} from 'react';
import { FiPlusCircle, FiCheck, FiLock } from 'react-icons/fi';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { Scope } from '@unform/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import Input from '../../../components/Form/Input';
import InputMask from '../../../components/Form/InputMask';
import Select from '../../../components/Form/Select';
import Header from '../../../components/Headers/Header';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';

// import { AnimationContainer, Container, Content, ScheduleItem } from './styles';
import {
  Container,
  Content,
  ContainerForm,
  ScheduleItem,
  PhoneItem,
  PhoneTable,
} from './styles';

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

interface Phone {
  prefix: string;
  number: string;
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
          cpf: Yup.string().required('CPF obrigatório'),
          rg: Yup.string().required('RG obrigatório'),
          number: Yup.string().required('Número obrigatório'),
          street: Yup.string().required('Quadra/Rua obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        console.log('Meus dados:', data);
        // await api.post('/users', data);
        // history.push('/');

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

  const [phoneItems, setPhoneItems] = useState<Phone[]>([]);

  useEffect(() => {
    console.log('==', phoneItems);
  }, [phoneItems]);

  const addNewPhoneItem = useCallback(() => {
    const prefix = formRef.current?.getFieldValue('phone.prefix');
    const newNumber = formRef.current?.getFieldValue('phone.number');

    const index = { prefix, number: newNumber };

    setPhoneItems([
      ...phoneItems.filter(
        (phone: Phone) =>
          phone.prefix !== index.prefix && phone.number !== index.number,
      ),
      index,
    ]);
    // setPhoneItems([...phoneItems, { prefix, number: newNumber }]);

    // Set single field value
    formRef.current?.setFieldValue('phone.prefix', '');
    formRef.current?.setFieldValue('phone.number', '');
  }, [phoneItems]);

  const removeItem = useCallback(
    (index: Phone) => {
      setPhoneItems(
        phoneItems.filter(
          (phone: Phone) =>
            phone.prefix !== index.prefix && phone.number !== index.number,
        ),
      );
    },
    [phoneItems],
  );

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
                Documentos
                <button type="submit">
                  <span>
                    <FiCheck />
                  </span>
                  <strong>Salvar</strong>
                </button>
              </legend>

              <InputMask
                id="idCEP"
                mask="999.999.999-99"
                name="cpf"
                placeholder="000.000.000-00"
                icon={FiLock}
                label="CPF"
              />

              <Input placeholder="RG" name="rg" icon={FiLock} label="RG" />
            </fieldset>

            <fieldset>
              <legend>Seu endereço</legend>
              <Input
                placeholder="Rua/quadra"
                name="street"
                icon={FiLock}
                label="Rua/quadra"
              />

              <InputMask
                id="idNumberHouse"
                mask="999999"
                name="number"
                placeholder="Número"
                icon={FiLock}
                label="Número Lote/Casa"
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

              <InputMask
                id="idZipCode"
                mask="999999"
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

            <fieldset>
              <legend>
                Seu(s) Telefone(s)
                <button type="button" onClick={addNewPhoneItem}>
                  <span>
                    <FiPlusCircle />
                  </span>
                  <strong>Adicionar mais fone</strong>
                </button>
              </legend>
              <Scope path="phone">
                <PhoneItem>
                  <InputMask
                    id="idPrefix"
                    mask="(99)"
                    placeholder="Prefixo"
                    name="prefix"
                    icon={FiLock}
                    label="Prefixo"
                  />
                  <InputMask
                    id="idNumber"
                    mask="9 9999-9999"
                    placeholder="Número"
                    name="number"
                    icon={FiLock}
                    label="Número"
                  />
                </PhoneItem>
              </Scope>
              <PhoneTable>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>FONE</th>
                    <th>AÇAO</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneItems.map((item, index) => (
                    <tr key={Number(index)}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>
                        <div>
                          <span>{item.prefix}</span>
                          <strong>{item.number}</strong>
                        </div>
                      </td>
                      <td>
                        <button type="button" onClick={() => removeItem(item)}>
                          <MdDelete size={20} color="#7159c1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </PhoneTable>
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

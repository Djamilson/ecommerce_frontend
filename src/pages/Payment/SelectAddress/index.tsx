import React, { useCallback, useEffect, useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import api from '../../../_services/api';
import { useAuth } from '../../../hooks/auth';
import { Container } from './styles';
import { Address, Section } from './styles';

interface Address {
  id: string;
  number: number;
  street: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  person_id: string;
  city_id: string;

  city: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
      acronym: string;
    };
  };
}

const SelectAddress: React.FC = () => {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    api.get(`/addresses/${user.person.id}`).then((res) => {
      setAddresses(res.data);
    });
  }, [user.person.id]);

  return (
    <Container>
      <h1>Select Address</h1>

      <Section>
        <strong>Endereços cadastrados</strong>

        {addresses.length === 0 && <p>Nenhum endereço cadastrado!</p>}

        {addresses.map((address) => (
          <Address key={address.id}>
            <span>
              <FiClock />
              {address.street}
            </span>
            <div>
              <strong>{address.complement}</strong>
              <strong>{address.neighborhood}</strong>
              <strong>{address.zip_code}</strong>
              <strong>{address.city.name}</strong>
              <strong>{address.city.state.name}</strong>
            </div>
          </Address>
        ))}
      </Section>
    </Container>
  );
};

export default SelectAddress;

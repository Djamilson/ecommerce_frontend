import React from 'react';

import Header from '../../components/Header';
import { Content } from '../Cart/styles';
import { Container } from './styles';

const Payment: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <h1>Modelo</h1>
      </Content>
    </Container>
  );
};

export default Payment;

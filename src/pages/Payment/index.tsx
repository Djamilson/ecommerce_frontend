import React, { useCallback } from 'react';
import { FiPlusCircle, FiLock, FiMail, FiUser, FiCamera } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Headers/Header';
import HeaderButton from '../../components/Headers/HeaderButtonForm';
import SubHeader from '../../components/Headers/SubHeader';
import { Content } from '../Cart/styles';
import { Container, Section } from './styles';

const Payment: React.FC = () => {
  return (
    <Container>
      <Header />

      <SubHeader />

      <Content>
        <Section>
          <strong>Manhã</strong>
        </Section>
      </Content>
    </Container>
  );
};

export default Payment;

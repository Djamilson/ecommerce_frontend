import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface IHeaderProps {
  openModal?: () => void;
}

const SubHeader: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <p>Importante! Preencha todos os dados</p>

      <Link to="/address/new">
        <span>
          <FiPlusCircle />
        </span>
        <strong>Cadastrar novo endereço</strong>
      </Link>
    </header>
  </Container>
);

export default SubHeader;

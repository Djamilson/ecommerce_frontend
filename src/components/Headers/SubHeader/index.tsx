import React from 'react';
import {
  FiPlusSquare,
  FiPlusCircle,
  FiLock,
  FiMail,
  FiUser,
  FiCamera,
} from 'react-icons/fi';
import { FiPower } from 'react-icons/fi';
import { MdShoppingBasket } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

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

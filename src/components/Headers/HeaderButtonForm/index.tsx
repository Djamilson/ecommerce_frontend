import React from 'react';
import { IoIosArrowBack, IoMdCheckmark } from 'react-icons/io';

import { colors, fonts } from '../../../styles';
import { Container, Title, ContentButton, GobackLink, Button } from './styles';

interface Request {
  loading: boolean;
  title: string;
  goback: string;
  titleAction: string;
  hadleAction: () => void;
}

const HeaderButton: React.FC<Request> = ({
  title,
  hadleAction,
  titleAction,
  goback,
  loading,
}) => {
  const path = `/${goback}`;

  return (
    <Container>
      <Title>{title}</Title>
      <ContentButton>
        <GobackLink to={path}>
          <span>
            <IoIosArrowBack color="#fff" size={18} />
          </span>
          <strong>Voltar</strong>
        </GobackLink>
        <Button onClick={() => hadleAction}>
          <span>
            <IoMdCheckmark color="#fff" size={18} />
          </span>
          <strong>{loading ? 'Carregando ...' : `${titleAction}`}</strong>
        </Button>
      </ContentButton>
    </Container>
  );
};

export default HeaderButton;

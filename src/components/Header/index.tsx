import React, { useEffect, useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { useCartProduct } from '../../hooks/cartProduct';
import { Container, HeaderContainer, Cart, Profile } from './styles';

interface Props {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Header: React.FC = () => {
  const { totalItens, cart } = useCartProduct();
  const [qtdade] = useState(cart.length);

  useEffect(() => {
    console.log('Quantidade: ', cart.length);
    console.log('Hook vou add esse this:');
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <img src={logoImg} alt="Gobarber" />
        </Link>

        <Profile>
          <img src={logoImg} alt="Nome" />
          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">Nova page</Link>
          </div>
        </Profile>

        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span> {qtdade} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>

        <button type="button" onClick={() => {}}>
          <FiPower />
        </button>
      </HeaderContainer>
    </Container>
  );
};

export default Header;

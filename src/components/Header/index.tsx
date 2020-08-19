import React, { useEffect, useMemo, useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { useCartProduct } from '../../hooks/cartProduct';
import { Container, HeaderContainer, Cart, Profile } from './styles';

const Header: React.FC = () => {
  const { cart } = useCartProduct();

  const qtdade = useMemo(() => cart.length, [cart]);

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

import React, { useMemo } from 'react';
import { FiPower, FiLogIn } from 'react-icons/fi';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useCartProduct } from '../../hooks/cartProduct';
import {
  Container,
  HeaderContainer,
  Cart,
  BoxLogin,
  ButtonLogout,
  BoxLogado,
} from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  const { cart } = useCartProduct();
  const nameUser = user?.person.name;

  const qtdade = useMemo(() => cart.length, [cart]);

  return (
    <Container>
      <HeaderContainer>
        {!user ? (
          <Link to="/">
            <img src={logoImg} alt="Ecommecer" />
          </Link>
        ) : (
          <Link to="/dashboard">
            <img src={logoImg} alt="Ecommecer" />
          </Link>
        )}

        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span> {qtdade} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>

        {!user ? (
          <BoxLogin>
            <div>
              <Link to="/address/new">
                <strong>Logar</strong>
                <span>
                  <FiLogIn />
                </span>
              </Link>
            </div>
          </BoxLogin>
        ) : (
          <BoxLogado>
            <ButtonLogout type="button" onClick={signOut}>
              <div>
                <strong>Bem-vindo,</strong>
                <span> {nameUser}</span>
              </div>
              <FiPower size={26} color="#FFF" />
            </ButtonLogout>
          </BoxLogado>
        )}
      </HeaderContainer>
    </Container>
  );
};

export default Header;

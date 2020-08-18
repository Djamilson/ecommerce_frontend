import React, { createContext, useCallback, useState, useContext } from 'react';

import { uuid } from 'uuidv4';

interface User {
  email: string;
}

interface AuthState {
  user: User;
}

export interface ToastMessage {
  id: string;
}

interface SignInCredentials {
  email: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const CartProductContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

const CartProduct: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    return {} as AuthState;
  });

  const [products, setProducts] = useState<ToastMessage[]>([]);

  const signIn = useCallback(async ({ email }) => {
    console.log('Vou gera um código: ', email);

    // setData({ user: email });

    const id = uuid();
    const toast = {
      id,
    };

    setProducts([...products, toast]);
  }, []);

  const signOut = useCallback(() => {
    // setData({} as AuthState);
    console.log('valor guardado:: products ', products);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        user,
      });
    },
    [setData],
  );

  const [messages, setMessages] = useState<ToastMessage[]>([]);
  /*
  const addToast = useCallback(({}) => {
    const id = uuid();
    const toast = {
      id,
    };

    setMessages((oldMessage) => [...oldMessage, toast]);
  }, []); */
  /*
  const removeToast = useCallback((id: string) => {
    // setMessages((state) => state.filter((message) => message.id !== id));
  }, []); */

  return (
    <CartProductContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </CartProductContext.Provider>
  );
};

function useCartProduct(): AuthContextData {
  const context = useContext(CartProductContext);

  if (!context) {
    throw new Error('useAuth mus be used within an AuthProvider');
  }

  return context;
}

export { CartProduct, useCartProduct };

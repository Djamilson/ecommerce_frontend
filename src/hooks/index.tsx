import React from 'react';

import { CartProduct } from './cartProduct';
import { LoadingProvider } from './loading';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CartProduct>
      <LoadingProvider>
        <ToastProvider>{children}</ToastProvider>
      </LoadingProvider>
    </CartProduct>
  );
};
export default AppProvider;

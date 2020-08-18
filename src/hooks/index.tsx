import React from 'react';

import { LoadingProvider } from './loading';
import { CartProduct } from './product';
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

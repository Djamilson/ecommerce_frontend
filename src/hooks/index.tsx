import React from 'react';

import { CartProduct } from './cartProduct';
import { LoadingProvider } from './loading';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <LoadingProvider>
      <ToastProvider>
        <CartProduct>{children}</CartProduct>
      </ToastProvider>
    </LoadingProvider>
  );
};
export default AppProvider;

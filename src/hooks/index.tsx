import React from 'react';

import { AuthProvider } from './auth';
import { CartProduct } from './cartProduct';
import { LoadingProvider } from './loading';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <ToastProvider>
          <CartProduct>{children}</CartProduct>
        </ToastProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};
export default AppProvider;

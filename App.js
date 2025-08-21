import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importar el proveedor del carrito y el navegador
import { CartProvider } from './context/CartContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <AppNavigator />
        <StatusBar style="dark" />
      </CartProvider>
    </SafeAreaProvider>
  );
}

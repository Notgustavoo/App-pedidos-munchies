import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';

// Importar contexto del carrito
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Configuración de iconos para las pestañas
const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  if (route.name === 'Products') {
    iconName = focused ? 'restaurant' : 'restaurant-outline';
  } else if (route.name === 'Cart') {
    iconName = focused ? 'cart' : 'cart-outline';
  } else if (route.name === 'Orders') {
    iconName = focused ? 'receipt' : 'receipt-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

// Componente para mostrar el badge del carrito
const CartTabIcon = ({ focused, color, size }) => {
  const { itemCount } = useCart();

  return (
    <View style={{ position: 'relative' }}>
      <Ionicons
        name={focused ? 'cart' : 'cart-outline'}
        size={size}
        color={color}
      />
      {itemCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: '#FF6B6B',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );
};

// Stack Navigator para manejar navegación dentro de las pestañas
const ProductsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductsList" component={ProductsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersList" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

// Tab Navigator principal
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Cart') {
            return <CartTabIcon focused={focused} color={color} size={size} />;
          }
          return getTabBarIcon(route, focused, color, size);
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E1E1E1',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarLabel: 'Productos',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Carrito',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Pedidos',
        }}
      />
    </Tab.Navigator>
  );
};

// Navegador principal de la aplicación
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

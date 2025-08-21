import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { orderService } from '../services/firestore';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await orderService.getOrders();
      setOrders(ordersData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los pedidos');
      console.error('Error cargando pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      await loadOrders(); // Recargar la lista
      Alert.alert('Éxito', 'Estado del pedido actualizado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado del pedido');
      console.error('Error actualizando estado:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return '#FFA500';
      case 'en_preparacion':
        return '#2196F3';
      case 'completado':
        return '#4CAF50';
      case 'cancelado':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pendiente':
        return 'Pendiente';
      case 'en_preparacion':
        return 'En Preparación';
      case 'completado':
        return 'Completado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const showStatusOptions = (order) => {
    const statusOptions = [
      { label: 'Pendiente', value: 'pendiente' },
      { label: 'En Preparación', value: 'en_preparacion' },
      { label: 'Completado', value: 'completado' },
      { label: 'Cancelado', value: 'cancelado' },
    ];

    const buttons = statusOptions
      .filter((option) => option.value !== order.estado)
      .map((option) => ({
        text: option.label,
        onPress: () => updateOrderStatus(order.id, option.value),
      }));

    buttons.push({ text: 'Cancelar', style: 'cancel' });

    Alert.alert(
      'Cambiar Estado',
      `Estado actual: ${getStatusText(order.estado)}`,
      buttons
    );
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Pedido #{item.id.slice(-6)}</Text>
          <Text style={styles.orderDate}>{formatDate(item.fecha)}</Text>
          <Text style={styles.customerName}>Cliente: {item.cliente}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.estado) },
          ]}
          onPress={() => showStatusOptions(item)}
        >
          <Text style={styles.statusText}>{getStatusText(item.estado)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.productsTitle}>Productos:</Text>
        {item.productos.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <Text style={styles.productName}>
              {product.nombre} x{product.cantidad}
            </Text>
            <Text style={styles.productPrice}>
              ${product.subtotal.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderEmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={100} color="#ccc" />
      <Text style={styles.emptyTitle}>No hay pedidos</Text>
      <Text style={styles.emptySubtitle}>
        Los pedidos aparecerán aquí una vez realizados
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.shopButtonText}>Hacer un pedido</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Cargando pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de Pedidos</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Ionicons name="refresh-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {orders.length === 0 ? (
        renderEmptyOrders()
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    padding: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productsContainer: {
    marginBottom: 12,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  productName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;

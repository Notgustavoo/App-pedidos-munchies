import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { productService, initializeExampleData } from '../services/firestore';
import { useCart } from '../context/CartContext';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { addItem, getItemQuantity } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      // Inicializar datos de ejemplo si es la primera vez
      await initializeExampleData();

      const productsData = await productService.getProducts();
      setProducts(productsData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los productos');
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      Alert.alert('Sin stock', 'Este producto no está disponible');
      return;
    }

    addItem(product);
    Alert.alert(
      'Producto agregado',
      `${product.nombre} ha sido agregado al carrito`,
      [{ text: 'OK' }]
    );
  };

  const renderProduct = ({ item }) => {
    const quantityInCart = getItemQuantity(item.id);

    return (
      <View style={styles.productCard}>
        <View style={styles.productImageContainer}>
          <Ionicons name="restaurant-outline" size={60} color="#FF6B6B" />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.nombre}</Text>
          <Text style={styles.productDescription}>{item.descripcion}</Text>

          <View style={styles.productDetails}>
            <Text style={styles.productPrice}>${item.precio.toFixed(2)}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
          </View>

          {quantityInCart > 0 && (
            <Text style={styles.cartQuantity}>
              En carrito: {quantityInCart}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            item.stock <= 0 && styles.addButtonDisabled,
          ]}
          onPress={() => handleAddToCart(item)}
          disabled={item.stock <= 0}
        >
          <Ionicons
            name="add"
            size={24}
            color={item.stock <= 0 ? '#ccc' : 'white'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    padding: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  productStock: {
    fontSize: 12,
    color: '#888',
  },
  cartQuantity: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  addButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});

export default ProductsScreen;

import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Servicios para Productos
export const productService = {
  // Obtener todos los productos
  async getProducts() {
    try {
      const q = query(collection(db, 'productos'), orderBy('nombre'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },

  // Agregar un producto
  async addProduct(product) {
    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        ...product,
        fechaCreacion: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error agregando producto:', error);
      throw error;
    }
  },

  // Actualizar un producto
  async updateProduct(productId, updates) {
    try {
      const productRef = doc(db, 'productos', productId);
      await updateDoc(productRef, {
        ...updates,
        fechaModificacion: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  },

  // Eliminar un producto
  async deleteProduct(productId) {
    try {
      await deleteDoc(doc(db, 'productos', productId));
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  },
};

// Servicios para Pedidos
export const orderService = {
  // Obtener todos los pedidos
  async getOrders() {
    try {
      const q = query(collection(db, 'pedidos'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha.toDate(), // Convertir Timestamp a Date
      }));
    } catch (error) {
      console.error('Error obteniendo pedidos:', error);
      throw error;
    }
  },

  // Crear un pedido
  async createOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, 'pedidos'), {
        productos: orderData.productos,
        total: orderData.total,
        estado: 'pendiente',
        fecha: Timestamp.now(),
        cliente: orderData.cliente || 'Cliente Anónimo',
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creando pedido:', error);
      throw error;
    }
  },

  // Actualizar estado de un pedido
  async updateOrderStatus(orderId, newStatus) {
    try {
      const orderRef = doc(db, 'pedidos', orderId);
      await updateDoc(orderRef, {
        estado: newStatus,
        fechaModificacion: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error actualizando estado del pedido:', error);
      throw error;
    }
  },

  // Obtener pedidos por estado
  async getOrdersByStatus(status) {
    try {
      const q = query(
        collection(db, 'pedidos'),
        where('estado', '==', status),
        orderBy('fecha', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha.toDate(),
      }));
    } catch (error) {
      console.error('Error obteniendo pedidos por estado:', error);
      throw error;
    }
  },
};

// Función para inicializar datos de ejemplo (solo para desarrollo)
export const initializeExampleData = async () => {
  try {
    // Productos de ejemplo
    const exampleProducts = [
      {
        nombre: 'Pizza Margherita',
        descripcion: 'Pizza clásica con tomate, mozzarella y albahaca fresca',
        precio: 12.99,
        stock: 50,
      },
      {
        nombre: 'Hamburguesa Clásica',
        descripcion: 'Hamburguesa de carne con lechuga, tomate y cebolla',
        precio: 8.99,
        stock: 30,
      },
      {
        nombre: 'Ensalada César',
        descripcion: 'Ensalada fresca con pollo, crutones y aderezo césar',
        precio: 7.5,
        stock: 25,
      },
      {
        nombre: 'Pasta Carbonara',
        descripcion: 'Pasta con salsa carbonara, bacon y queso parmesano',
        precio: 11.5,
        stock: 40,
      },
      {
        nombre: 'Tacos Mexicanos',
        descripcion: 'Tres tacos con carne, verduras frescas y salsa picante',
        precio: 9.99,
        stock: 35,
      },
    ];

    // Agregar productos si no existen
    const existingProducts = await productService.getProducts();
    if (existingProducts.length === 0) {
      for (const product of exampleProducts) {
        await productService.addProduct(product);
      }
      console.log('Productos de ejemplo agregados exitosamente');
    }
  } catch (error) {
    console.error('Error inicializando datos de ejemplo:', error);
  }
};

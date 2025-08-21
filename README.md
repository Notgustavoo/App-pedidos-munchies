# App de Gestión de Pedidos Online

Una aplicación móvil híbrida desarrollada con React Native y Expo que permite gestionar pedidos online con conexión a Firebase Firestore.

## 🚀 Características

- **Catálogo de productos**: Visualización de productos con nombre, descripción, precio y stock
- **Carrito de compras**: Manejo de estado local para productos seleccionados
- **Gestión de pedidos**: Creación y seguimiento de pedidos en tiempo real
- **Base de datos remota**: Integración con Firebase Firestore
- **Multiplataforma**: Funciona en Android y iOS
- **Interfaz moderna**: Diseño responsivo y fácil de usar

## 📱 Pantallas

1. **Productos**: Lista de productos disponibles con opción de agregar al carrito
2. **Carrito**: Vista del carrito con gestión de cantidades y realización de pedidos
3. **Historial**: Lista de pedidos realizados con estados actualizables

## 🛠️ Tecnologías Utilizadas

- **React Native** con Expo
- **Firebase Firestore** (Base de datos NoSQL)
- **React Navigation** (Navegación)
- **Context API** (Manejo de estado global)
- **Expo Vector Icons** (Iconografía)

## 📦 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd AppPedidos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### 3.1 Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto
3. Habilita Firestore Database

#### 3.2 Obtener configuración

1. En Project Settings > General > Your apps
2. Selecciona "Web app" y registra tu aplicación
3. Copia la configuración de Firebase

#### 3.3 Configurar la aplicación

Edita el archivo `config/firebase.js` y reemplaza la configuración:

```javascript
const firebaseConfig = {
  apiKey: 'tu-api-key',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto-id',
  storageBucket: 'tu-proyecto.appspot.com',
  messagingSenderId: '123456789',
  appId: 'tu-app-id',
};
```

#### 3.4 Configurar reglas de Firestore

En la consola de Firebase, ve a Firestore > Rules y usa estas reglas para desarrollo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Importante**: Estas reglas son solo para desarrollo. Para producción, implementa reglas de seguridad apropiadas.

## 🚀 Ejecutar la aplicación

### Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# Para Android
npm run android

# Para iOS (requiere macOS)
npm run ios

# Para web
npm run web
```

### Usando Expo Go

1. Instala Expo Go en tu dispositivo móvil
2. Escanea el código QR que aparece en la terminal
3. La aplicación se abrirá en tu dispositivo

## 📊 Estructura de Base de Datos

### Colección: `productos`

```javascript
{
  nombre: "string",           // Nombre del producto
  descripcion: "string",      // Descripción del producto
  precio: number,             // Precio del producto
  stock: number,              // Cantidad disponible
  fechaCreacion: timestamp,   // Fecha de creación
  fechaModificacion: timestamp // Fecha de última modificación
}
```

### Colección: `pedidos`

```javascript
{
  productos: [                // Array de productos del pedido
    {
      id: "string",           // ID del producto
      nombre: "string",       // Nombre del producto
      precio: number,         // Precio del producto
      cantidad: number,       // Cantidad pedida
      subtotal: number        // Precio × cantidad
    }
  ],
  total: number,              // Total del pedido
  estado: "string",           // pendiente | en_preparacion | completado | cancelado
  fecha: timestamp,           // Fecha del pedido
  cliente: "string",          // Nombre del cliente
  fechaModificacion: timestamp // Fecha de última modificación
}
```

## 🔧 Funcionalidades Implementadas

### ✅ CRUD de Productos

- ✅ Listar productos
- ✅ Agregar productos (automático con datos de ejemplo)
- ✅ Actualizar productos
- ✅ Eliminar productos

### ✅ Gestión de Carrito

- ✅ Agregar productos al carrito
- ✅ Modificar cantidades
- ✅ Eliminar productos del carrito
- ✅ Calcular total automáticamente
- ✅ Persistencia local del estado

### ✅ Gestión de Pedidos

- ✅ Crear pedidos desde el carrito
- ✅ Listar historial de pedidos
- ✅ Actualizar estado de pedidos
- ✅ Filtrar pedidos por estado

### ✅ Características Adicionales

- ✅ Navegación por pestañas
- ✅ Badges en el carrito
- ✅ Pull-to-refresh
- ✅ Estados de carga
- ✅ Manejo de errores
- ✅ Interfaz responsiva

## 📱 Compatibilidad

- ✅ **Android**: Totalmente compatible
- ✅ **iOS**: Totalmente compatible
- ✅ **Web**: Compatible (a través de Expo Web)

## 🎯 Requisitos de la Tarea Cumplidos

- ✅ **Aplicación móvil híbrida**: React Native con Expo
- ✅ **Base de datos remota**: Firebase Firestore
- ✅ **Dos colecciones/tablas**: Productos y Pedidos
- ✅ **Visualizar productos**: Lista completa con detalles
- ✅ **Carrito temporal**: Estado local con Context API
- ✅ **Realizar pedidos**: Guardado en Firestore
- ✅ **Historial de pedidos**: Vista completa con estados
- ✅ **Multiplataforma**: Android y iOS
- ✅ **Sincronización**: Datos en tiempo real con Firestore
- ✅ **CRUD complejo**: Operaciones completas
- ✅ **Datos relacionales**: Productos dentro de pedidos

## 🔄 Estados de Pedidos

- **Pendiente**: Pedido recién creado
- **En Preparación**: Pedido siendo procesado
- **Completado**: Pedido finalizado
- **Cancelado**: Pedido cancelado

## 🎨 Diseño

La aplicación utiliza un diseño moderno con:

- Color principal: #FF6B6B (coral)
- Tipografía clara y legible
- Iconos de Expo Vector Icons
- Sombras y bordes redondeados
- Feedback visual en todas las acciones

## 📝 Notas de Desarrollo

- La aplicación inicializa automáticamente con productos de ejemplo
- Los datos se sincronizan en tiempo real con Firestore
- El carrito mantiene el estado durante la sesión
- La navegación es fluida entre todas las pantallas
- Se incluye manejo de errores y estados de carga

## 🚀 Próximas Mejoras

- Autenticación de usuarios
- Notificaciones push
- Búsqueda y filtros de productos
- Múltiples métodos de pago
- Geolocalización para entregas
- Chat en tiempo real

---

**Desarrollado por**: [Tu Nombre]  
**Tecnología**: React Native + Expo + Firebase  
**Fecha**: Agosto 2025

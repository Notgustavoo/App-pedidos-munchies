# App de Gestión de Pedidos - Munchies

Una app móvil para gestionar pedidos online. Hecha con React Native, Expo y Firebase.

## ¿Qué hace la app?

- **Ver productos** disponibles en el menú
- **Agregar al carrito** los productos que quieras
- **Hacer pedidos** y guardarlos en la base de datos
- **Ver historial** de todos los pedidos realizados

## ¿Cómo ejecutar la app?

### 1. Clona este repositorio

```bash
git clone https://github.com/Notgustavoo/App-pedidos-munchies.git
cd App-pedidos-munchies
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura Firebase (IMPORTANTE)

- Ve a [Firebase Console](https://console.firebase.google.com)
- Crea un nuevo proyecto
- Habilita **Firestore Database** (elige "test mode")
- En Project Settings > Agrega una app web
- Copia la configuración y pégala en `config/firebase.js`

### 4. Ejecuta la app

```bash
npm start
```

### 5. Pruébala en tu celular

- Descarga **Expo Go** en tu celular
- Escanea el código QR que aparece en la terminal

## Tecnologías usadas

- React Native + Expo
- Firebase Firestore
- React Navigation

## Notas

- La app carga productos de ejemplo automáticamente
- Funciona en Android y iOS
- Los pedidos se guardan en tiempo real en Firebase

---

**Desarrollado por**: Notgustavoo alias gosha 
**Fecha**: Agosto 2025

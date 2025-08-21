// Ejemplo de configuración de Firebase
// Copia este archivo y renómbralo a firebase.js después de configurar tu proyecto

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// INSTRUCCIONES PARA OBTENER ESTA CONFIGURACIÓN:
// 1. Ve a https://console.firebase.google.com
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Ve a Project Settings (ícono de engranaje)
// 4. En la pestaña "General", busca "Your apps"
// 5. Haz clic en "Add app" y selecciona "Web" (</>)
// 6. Registra tu app con un nombre
// 7. Copia la configuración que aparece en "Firebase SDK snippet"

const firebaseConfig = {
  apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto-id',
  storageBucket: 'tu-proyecto.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef123456789012345',
};

// CONFIGURACIÓN DE FIRESTORE:
// 1. En la consola de Firebase, ve a "Firestore Database"
// 2. Haz clic en "Create database"
// 3. Selecciona "Start in test mode" (para desarrollo)
// 4. Elige una ubicación para tu base de datos
// 5. Haz clic en "Done"

// REGLAS DE FIRESTORE PARA DESARROLLO:
// Ve a Firestore > Rules y usa estas reglas:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
*/

// ⚠️ IMPORTANTE:
// Las reglas anteriores permiten acceso completo a cualquier usuario.
// Solo úsalas para desarrollo. Para producción, implementa reglas de seguridad apropiadas.

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;

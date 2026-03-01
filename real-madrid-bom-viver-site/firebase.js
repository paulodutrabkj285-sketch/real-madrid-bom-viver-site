// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// SUA CONFIG (cole a sua aqui)
const firebaseConfig = {
  apiKey: "SUA_API",
  authDomain: "SEU_DOMINIO",
  projectId: "real-madrid-bom-viver",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

// inicia
const app = initializeApp(firebaseConfig);

// 🔥 AQUI ESTÁ O QUE FALTAVA
export const db = getFirestore(app);
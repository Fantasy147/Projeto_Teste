import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

import { iniciarGaleria } from "./CardsCode.js";


const firebaseConfig = {
  apiKey: "AIzaSyCJtxLNn3Robtjc7sA4Ct7cN_rEKm04Pzc",
  authDomain: "myself-8570b.firebaseapp.com",
  databaseURL: "https://myself-8570b-default-rtdb.firebaseio.com",
  projectId: "myself-8570b",
  storageBucket: "myself-8570b.firebasestorage.app",
  messagingSenderId: "94857101172",
  appId: "1:94857101172:web:23a6fe6ca4ec5f3fe97621",
  measurementId: "G-SXM91QHL1E"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

onValue(ref(db, "tables/0/data"), snap => {
  const doramas = Object.values(snap.val() || {});
  iniciarGaleria(doramas);
});


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCufUxrbFKpIW7y-Q5eFIG6806uX58woLU",
  authDomain: "asset-management-b021d.firebaseapp.com",
  projectId: "asset-management-b021d",
  storageBucket: "asset-management-b021d.firebasestorage.app",
  messagingSenderId: "540481691274",
  appId: "1:540481691274:web:241c94ec1625b483129773"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
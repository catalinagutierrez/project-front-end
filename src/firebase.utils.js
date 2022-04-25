import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3dvEGnwzURwtwiF07700dbw9ONSIBtgY",
  authDomain: "cat-animal-rescue-db.firebaseapp.com",
  databaseURL: "https://cat-animal-rescue-db.firebaseio.com",
  projectId: "cat-animal-rescue-db",
  storageBucket: "cat-animal-rescue-db.appspot.com",
  messagingSenderId: "379330288160",
  appId: "1:379330288160:web:b28938c6703fbe65cd3a45",
  measurementId: "G-KCPWF17ZKQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

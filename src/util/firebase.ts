import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAKyDWqvueNd6cHxC-SDcxvwjpV2jchNco",
    authDomain: "learnfi-tutor.firebaseapp.com",
    projectId: "learnfi-tutor",
    storageBucket: "learnfi-tutor.firebasestorage.app",
    messagingSenderId: "351316806252",
    appId: "1:351316806252:web:077777784e34b9f24fe649",
    measurementId: "G-MMSJE26801"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDQUtuYTmdwQ0Tm3WczLs7WHI8RODkBpY4",
    authDomain: "cashapp-auth-dev.firebaseapp.com",
    projectId: "cashapp-auth-dev",
    storageBucket: "cashapp-auth-dev.appspot.com",
    messagingSenderId: "598410240944",
    appId: "1:598410240944:web:8639e3b7a432ba1c796c75"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
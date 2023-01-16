// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAp1hicLFa0vBV255BBUWN7v0TSUU0gTxs',
	authDomain: 'devlog-871b6.firebaseapp.com',
	projectId: 'devlog-871b6',
	storageBucket: 'devlog-871b6.appspot.com',
	messagingSenderId: '562256318738',
	appId: '1:562256318738:web:e13750d1cf2b42241f63cb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
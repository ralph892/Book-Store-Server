import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBQzdp_4aBH9VuUZnQoArddFrEJrZSqu80',
  authDomain: 'bookstore-3ca82.firebaseapp.com',
  projectId: 'bookstore-3ca82',
  storageBucket: 'bookstore-3ca82.appspot.com',
  messagingSenderId: '466713713941',
  appId: '1:466713713941:web:568222b84b7d5138651d1c',
  measurementId: 'G-XCX7FT13MY',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default firebaseConfig;

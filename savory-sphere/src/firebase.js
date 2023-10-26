import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIfXTmPe0-FwbG0fHAzy2-M3SvABdbERw",
  authDomain: "cal-hacks-10.firebaseapp.com",
  projectId: "cal-hacks-10",
  storageBucket: "cal-hacks-10.appspot.com",
  messagingSenderId: "1062331412035",
  appId: "1:1062331412035:web:bf884707b1466d85942ef6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
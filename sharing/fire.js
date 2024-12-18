import { initializeApp } from 'firebase/app'; 
import {getAuth, onAuthStateChanged} from 'firebase/auth'; 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'

const config = {
    apiKey: "AIzaSyAS4H7FtujedKBfRe0E2uC8E1XmRzY4hIM",
    authDomain: "nice-headers.firebaseapp.com",
    projectId: "nice-headers",
    storageBucket: "nice-headers.firebasestorage.app",
    messagingSenderId: "98325489030",
    appId: "1:98325489030:web:f98b4dc310f2a635baf807",
    measurementId: "G-HPBT19EB42"
}
const app = initializeApp(config); 

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6LcRH58qAAAAAFKRfb2cn-Jab9swQ38IHvYLuq9Q"), 
    isTokenAutoRefreshEnabled: true
})
const auth = getAuth(app)
auth.useDeviceLanguage(); 

onAuthStateChanged(auth, (user) => {
    if(user == null){
        console.log("user not found"); 
    }else{
        console.log(user.uid)
    }
})
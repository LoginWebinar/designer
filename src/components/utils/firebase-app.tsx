// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";
import { getAuth,
  GoogleAuthProvider,
  getMultiFactorResolver,
  MultiFactorSession,
  MultiFactorInfo,
  MultiFactorResolver,
  PhoneInfoOptions,
  RecaptchaVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
 } from "firebase/auth";
 

/**
 * Created by: Rob Helmstetter
 * Date: 4/02/23
 * 
 * this service will setup the firebase services
 * 
 * Updates:
 * 
 * 
 */


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = isSupported().then(yes=> yes ? getAnalytics(app) :null);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const storage = getStorage(app);


// mfa supported services
let verificationId: string | null = null;
let multiFactorResolver: MultiFactorResolver | null = null;

export const getMfaResolver = (error: any) => {
  multiFactorResolver = getMultiFactorResolver(auth, error)
  return multiFactorResolver
}

export const startMfaSignin = async ( multiFactorHint: MultiFactorInfo,session: MultiFactorSession, recaptchaVerifier:RecaptchaVerifier) => {
  if (multiFactorHint.factorId !== PhoneMultiFactorGenerator.FACTOR_ID) {
    throw console.error("Hints are invalid");
  }
  const phoneInfoOptions:PhoneInfoOptions = {
    multiFactorHint: multiFactorHint,
    session: session
  };
  const phoneAuthProvider = new PhoneAuthProvider(auth);
  
  // Send SMS verification code
  verificationId = await phoneAuthProvider
    .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
    .catch(function (error) {
      console.error(`Error verifying phone number.`);
      console.log(error.code)
      throw error;
    });
}


export const finishMfaSignIn = async (verificationCode:string) => {
  // Get the SMS verification code sent to the user.
  if (verificationId && multiFactorResolver) {
    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    
    // Complete sign-in.
    await multiFactorResolver
      .resolveSignIn(multiFactorAssertion)
      .then(function (userCredential) {
        return userCredential;
      })
      .catch(function (error:any) {
        throw error;
      });
  }

  multiFactorResolver = null;
  verificationId = null;
}


export const initFirebase = () =>{
  return app;
}

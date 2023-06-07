
"use client";
import React, { useEffect,useState } from "react";
import LargeDarkLogo from "../../components/logo/darklargelogo";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../components/contexts/user-global-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/utils/firebase-app";
import { useFormik } from "formik";
import * as yup from "yup";
import SpinnerForButton from "../../components/spinners/spinner-for-button";

const inValidPassword = "Invalid Email/Password Combination";

type AuthData = {
    email:string;
    password: string;
}


export default function Home() {
  const [errorMessage,setErrorMessage]=useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginCounter, setLoginCounter] = useState(0)
  const { user,uid,userData } = useGlobalContext();
  const router = useRouter();
  const [errDisplayMessage,setErrDisplayMessage] = useState(false);
  const [loginDisplay,setLoginDisplay] = useState(true);
  const [attemptsDisplay,setAttemptsDisplay] = useState(false);
  const [signinDisplay,setSigninDisplay] = useState(true);
  const [buttonSpinnerVisible,setButtonSpinnerVisible] = useState(false);

  useEffect(() => {
    /**
     * this will listen to if the user becomes online via another tab
     * then allow this user to enter to the dashboard.
     */
    if (user){ 
      router.push("/dashboard");
      return;
    }
  },[user]);

  useEffect(() => {
    /**
     * This is the workaround method that allows this useEffect to run once
     * at page load and after the document is ready. This will confirm that a
     * user has been logged in, if not the person will be sent to the login page
     * This is NOT an approved method of doing things, but it does work. This 
     * method allows the global context to get the auth information and userData
     * information from the firebase services.
     * 
     */
    const onPageLoad = () => {
      if (user){
        router.push("/dashboard");
        return;
      }
      
      setErrDisplayMessage((currentState)=>{return false});
      setAttemptsDisplay((currentState)=>{return false});
      setLoginDisplay((currentState)=>{return true});
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);


  useEffect(() => {
    /**
     * this will deactivate the login fields after 6 attempts
     * and hide them and display the txtAttempts area to show
     * that they are out of login attempts.
     */
    if (loginCounter>5){
      setLoginDisplay((currentState)=>{return false});
      setAttemptsDisplay((currentState)=>{return true});
    }
  },[loginCounter]);


  const handleFormSubmitForPassword = async (values: AuthData) => {
    /**
     * This method is used to handle a email address and password
     * if the user already logged into the system with a different provider
     * they will have to return to that method of login and then set a
     * password in the profile settings
     */
    const email=values.email;
    const password=values.password;
    setIsSubmitted((currentState)=>{return true});
    setButtonSpinnerVisible((currentState)=>{return true});


    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials)=>{
        /**
         * user has been successful at logging in but will use the UseEffect[user]
         * to move the user to the dashboard
         */
      })
      .catch(async(error) =>{
        setButtonSpinnerVisible((currentState)=>{return false});
        switch (error.code){
          case "auth/wrong-password":
            setErrDisplayMessage(()=>true);
            setErrorMessage(inValidPassword);
            break;
          default:
            setErrDisplayMessage((currentState)=>{return true});
            setErrorMessage(inValidPassword);
            break;
        }
        setLoginCounter((prevState)=>{ return prevState+1});
        setIsSubmitted((currentState)=>{return false});
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: AuthData)=>{
      await handleFormSubmitForPassword(values);
    },
    validationSchema:
      yup.object().shape({
        email: yup
          .string()
          .email("invalid email address")
          .required("is required"),
        password: yup
        .string()
        .required("invalid password")
        .min(6,"Your password is too short"),
      }),
  });

  return (  
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <LargeDarkLogo />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {attemptsDisplay &&
        <>
          <h3 className="mt-4 text-danger text-center">To many attempts to login</h3>
        </>
      }
      {loginDisplay &&

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
         {errDisplayMessage &&
            <>
              <div>
                <h3 className="mt-4 text-red-500">{errorMessage}</h3>
              </div>
            </>
          }
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your authorized Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            {formik.touched.email && formik.errors.email ? (<div className="text-red-500">{formik.errors.email}</div>) : null }
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            {formik.touched.password && formik.errors.password ? (<div className="text-red-500">{formik.errors.password}</div>) : null }
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitted}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <SpinnerForButton show={buttonSpinnerVisible}/>Sign in
          </button>
        </div>
      </form>
      }
    </div>
  </div>
  
  );
}
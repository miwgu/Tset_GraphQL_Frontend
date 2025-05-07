import React, { useEffect } from "react";
import { useState } from "react";
import styles from './Login.module.css';
import EmailAtom from "./EmailAtom";
import PasswordAtom from "./PasswordAtom";
import LoginButtonAtom from "./LoginButtonAtom";
//import CompanyRegLinkAtom from "./CompanyRegLinkAtom";
//import StudentRegLinkAtom from "./StudentRegLinkAtom";
import { useLocalHostLogin } from "./LocalHostLoginProvider"; // Import the hook
//import ReCaptcha from "../reCaptcha";
//import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const {login, error} =useLocalHostLogin();// use login function

  useEffect(() => {
    console.log("Error state in Login component:", error);  //Confirmation for error display.
  }, [error]);

/*   useEffect (() =>{
         setSubmitEnabled (!!token) // if token is present it becomes true. if token is null it becomes false
   }, [token]) */
  
   // user clear quiz(I am not a robot) and get token 
  const handleRecaptchaChange =(token) =>{
    setToken(token);
    console.log("Recaptcha: " ,token)
  }

  const handleLogin = async() =>{
    /* if (!token) {
      console.error("Please complete the reCAPTCHA.");
      return;
    } */
    //console.log("Initial error:", error); // Log before setting the error
    //setError("Testing error display");     // This is for testing visibility
    //console.log("Updated error:", error);   // Log after setting the error
    if(login) {
      try {
      await login(email, password);
  
     } catch (error){
        console.error("Login error:", error.message);
     }

    }else {
      console.error ('NO login function')
      console.error('Email:', email );
      console.error('Password:', password);
    }
  };

/*   const handleToken = () =>{
    setToken(token)
  } */

  return (
   <>
   <div className={styles.mainContainer}>
    <div className={styles.loginText}>
        <h1>Login</h1>
    </div>
    
    <div className={styles.loginContainer}>
    
    <EmailAtom  onEmailChange={setEmail}/>
    <PasswordAtom onPasswordChange={setPassword}/>

    {error && (
      <div className={styles.errorMessage}>
        <p>{error}</p>
      </div>
    )

    }
    <div>
      {/* <ReCaptcha siteKey={'6Ldd0XgqAAAAAOyJ2g-pnxchXHv-sTbP1SHSWyZ1'} callback={handleToken}/> */}
      {/* <ReCAPTCHA
        //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //test sitekey
        sitekey="6Ldd0XgqAAAAAOyJ2g-pnxchXHv-sTbP1SHSWyZ1" // my own site key
        onChange={handleRecaptchaChange}
     /> */}

    </div>
    <LoginButtonAtom disabled={!submitEnabled} onClick={handleLogin}/>
{/*     <ul className={styles.noBullet}>
        <li><StudentRegLinkAtom navigation={navToPage}/></li>
        <li><CompanyRegLinkAtom navigation={navToPage}/></li>
    </ul> */}
    
    </div>
    </div>
    </>

  )
}

export default Login
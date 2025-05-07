import styles from './Login.module.css';
import { useState } from 'react';
import React from "react";

const PasswordAtom = ({label="Password", onPasswordChange}) =>{
   const [error, setError] = useState('');
      if(!onPasswordChange) {
        return(
          <>
            <b>OnChange function require to login</b>
          </>
        )
    }
  
    const handleChange = (e) =>{
      const passwordValue = e.target.value;
     /*  const password_Valid = /^.*(?=.{5,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(passwordValue);//123a!
      
      if(!password_Valid) {
        setError("Invalid password it shoud include letter, number, symbol and length 5")
         console.log("Invalid password it shoud include letter, number, symbol and length 5")
      } else {
        setError("");
      } */
      onPasswordChange(passwordValue)
    }

  return(
      <div>
      <div className={styles.labelLink}>
          <label htmlFor= "password">{label}:</label>
      </div>

      <input  
      className={styles.labelLogin} 
      type= "password"
      placeholder={`Enter your ${label}`} 
      id="passwordl"
      onChange={handleChange}
      />
      {error && <p style={{ color: '#ff0066' }}>{error}</p>}
    </div> 
    )

}

export default PasswordAtom
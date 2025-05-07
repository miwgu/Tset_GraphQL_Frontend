import styles from './Login.module.css';
import { useState } from 'react';
import React from "react";

const EmailAtom = ({label="Email", onEmailChange}) =>{
  const [error, setError] = useState('');

    if(!onEmailChange) {
        return(
          <>
            <b>OnChange function require to login</b>
          </>
        )
    }

    const handleChange = (e) =>{

      const emailValue = e.target.value;
/*       const email_Valid = /\S+@\S+\.\S+/.test(emailValue);// xx@XX.XX

      if(!email_Valid) {
        setError("Invalid email format")
       console.log("Invalid email format")
      } else {
        setError("");
      } */

      onEmailChange(emailValue);
    };

    return(
        <div>
          <div className={styles.labelLink}>
              <label htmlFor= "email">{label}:</label>
          </div>

          <input  
          className={styles.labelLogin} 
          type= "email"
          placeholder={`Enter your ${label}`} 
          id="email"
          onChange={handleChange}
          />
          {error && <p style={{ color: '#ff0066' }}>{error}</p>}
        </div> 
    )

}

export default EmailAtom
import styles from './Login.module.css';
import React from "react";

const LoginButtonAtom = ({onClick,title="Login"}) =>{

    if(!title){
        return(
            <div>You need to Add title for this button</div>
        )
    }
    return(       
        <button className={styles.loginButton} onClick={onClick}>{title}</button>
    )
}

export default LoginButtonAtom
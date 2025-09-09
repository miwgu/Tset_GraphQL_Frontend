import React, { createContext, useContext, useState } from 'react';
import { login, logout, refresh, secureCall } from './authServiceLocalHost';
import { useNavigate } from 'react-router-dom';

const LocalLoginContext = createContext();
const localConfig = { apiUrl: "http://localhost:4000/graphql" };  // Configuration for local development

export const LocalHostLoginProvider = ({ children }) => {
    

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async (email, password) => {

        if (!email) {
            setError("Please enter your email.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }
       /*  if (!token) {
            setError("Please complete the reCAPTCHA.");
            return;
        } */

        setLoading(true);
        setError(null); //When user login error should be reset        
        try {
            const result = await authService.login(localConfig, email, password);
            console.log('Login Response:', result);
            setIsLoggedIn(result.isLoggedIn);
            setError(null); // when user login suscess reset error
            navigate("/booklist");
        } catch (err) {
            console.error('Login catch error:', err);
        
            if (err.code === "UNAUTHENTICATED") {
                setError("Login failed. Please try again."); // message for login failed
            } else if (err.message === "Failed to fetch") {
                setError("Please check your network connection.");
            } else {
                setError(err.message || "An error occurred during login.");
            }
        
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };


    const handleLogout = async() =>{

     try{
        await authService.logout(localConfig, children);
        
        // Reset Apollo cache
        if (window.__APOLLO_CLIENT__) {
        await window.__APOLLO_CLIENT__.clearStore();
    }
        //Update state
        setIsLoggedIn(false);
        navigate("/login", {})
    
    } catch (err) {
        console.error('Logout catch error:', err);
            setError(
             err.extemsions?.code === "UNAUTHENTICATED"
               ? "You are already logged out."
               :err.message || "An error occurred during logout."
            );

    } finally {
        setIsLoggedIn(false);
        // Redirect to login (replace history so back button won't return to protected page)
        navigate("/login", { replace: true });
    }
    };

    const authService = {
        login,
        logout,
        refresh,
        secureCall,
    };

    const contextValue = { 
        isLoggedIn, 
        loading, 
        error, 
        login: handleLogin, 
        logout: handleLogout, //authService.logout
        secureCall: authService.secureCall 
    };

    return (
        <LocalLoginContext.Provider value={contextValue}>
            {children}
        </LocalLoginContext.Provider>
    );
};

export const useLocalHostLogin = () => useContext(LocalLoginContext);
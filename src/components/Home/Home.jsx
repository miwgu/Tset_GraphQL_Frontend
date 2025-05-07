import React from 'react'

const Home = () => {
    return (
      <div style={styles.container}>
        <div style={styles.text}>Home</div>
      </div>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    text: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
  };

export default Home
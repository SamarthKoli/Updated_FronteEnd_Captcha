import React from 'react';
import govLogo from './gov.png'; // Adjust the path according to the location of the image

const Header = () => {
  return (
    <header style={styles.header}>
      <img 
        src={govLogo} 
        alt='Aadhaar Logo' 
        style={styles.headerLogo} 
      />
      <h1 style={styles.headerText}>Unique Identification Authority of India</h1>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'fixed', // Stick header to the top
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure the header stays on top
  },
  headerLogo: {
    width: '300px',
    height: '70px',
  },
  headerText: {
    color: '#000',
    fontSize: '18px',
    margin: '10px 0',
  },
};

export default Header;
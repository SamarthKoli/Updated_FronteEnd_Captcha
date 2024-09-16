import React from 'react';
import govLogo from './gov.png'; // Adjust the path according to the location of the image in your project

const Success = () => {
  return (
    <div style={styles.successPage}>
      <header style={styles.header}>
        <img 
          src={govLogo} 
          alt='Aadhaar Logo' 
          style={styles.headerLogo} 
        />
        <h1 style={styles.headerText}>Unique Identification Authority of India</h1>
      </header>

      <div style={styles.mainContent}>
        <img 
          src='aadhar_logo.png' 
          alt='Aadhaar Logo' 
          style={styles.mainLogo} 
        />
        <h2 style={styles.title}>Welcome to Aadhaar Services</h2>
      </div>

      <footer style={styles.footer}>
        <p>© Unique Identification Authority of India. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  successPage: {
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    paddingTop: '100px', // To avoid content being hidden under the header
    paddingBottom: '50px', // To avoid content being hidden under the footer
  },
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
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
  },
  mainLogo: {
    width: '250px',
    height: 'auto',
    marginBottom: '20px', // Reduced margin so the title appears just below the logo
  },
  title: {
    fontSize: '24px',
    color: '#004080', // Blue color for the title text
    marginBottom: '20px',
  },
  footer: {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#004080',
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center',
    position: 'fixed', // Stick footer to the bottom
    bottom: 0,
    left: 0,
  },
};

export default Success;

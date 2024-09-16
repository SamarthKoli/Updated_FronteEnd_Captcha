import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© Unique Identification Authority of India. All rights reserved.</p>
    </footer>
  );
};

const styles = {
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

export default Footer;
import React from 'react';

const styles = {
  width: '100vw',
  boxSizing: 'border-box',
  backgroundColor: '#dc2326',
  textAlign: 'center',
  color: 'white',
  display: 'block',
  padding: '3px',
  '@media (maxWidth: 400px)': {
    fontSize: '10.8rem',
  },
};

const Error = (props) => {
  return <div style={styles}>{props.name}</div>;
};

export default Error;

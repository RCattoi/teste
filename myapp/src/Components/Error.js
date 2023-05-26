import React from 'react';

// const styles = {
//   width: '100vw',
//   boxSizing: 'border-box',
//   backgroundColor: '#dc2326',
//   textAlign: 'center',
//   color: 'white',
//   display: 'block',
//   padding: '3px',
//   '@media (maxWidth: 400px)': {
//     fontSize: '10.8rem',
//   },
// };

// const Error = (props) => {
//   return <div style={styles}>{props.name}</div>;
// };

// export default Error;

import styled from 'styled-components';

const ErrorContainer = styled.div`
  width: 100vw;
  box-sizing: border-box;
  background-color: #dc2326;
  text-align: center;
  color: white;
  display: block;
  padding: 3px;

  @media (max-width: 400px) {
    font-size: 0.8rem;
  }
  //galaxy fold solution
  @media (max-width: 280px) {
    font-size: 0.6rem;
  }
`;

const Error = (props) => {
  return <ErrorContainer>{props.name}</ErrorContainer>;
};

export default Error;

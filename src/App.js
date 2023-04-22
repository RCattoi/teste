import React, { useEffect, useState } from 'react';
import Background from './Background.js';
import Search from './Search.js';
import globalStyle from './style/globalStyle.css';

function App() {
  return (
    <>
      <div className="content-div">
        <Search />
      </div>
      <Background />
    </>
  );
}

export default App;

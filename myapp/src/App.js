import React, { useEffect, useState } from 'react';
import Background from './Components/Background.js';
import Search from './Components/Search.js';
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

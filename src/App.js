import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import Search from '../src/components/Search';
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

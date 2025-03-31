// import React from 'react';
import './App.css';
import ProductTab from "./ProductTab.jsx";
import MsgBox from "./msgBox.jsx";// Only WORK IF START WORD WITH CAPITAL ONLY!!


function App() {
  return (
    <>
      <MsgBox username="Blockbuster Deal | Shop Now" textColor="black" />
      <ProductTab />
    </>
  );
};


export default App;

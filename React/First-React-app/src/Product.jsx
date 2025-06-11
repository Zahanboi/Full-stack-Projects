// import React from 'react';
import Price from "./price.jsx";

function Product({idxs,idx2}) {
  let Description = [
    ["8000 DPI","5 Programmable buttons"],
    ["Intuitive Surface","Designed for iPad Pro"],
    ["Designed for Ipad Pro","Intuitive surface"],
    ["Wireless","Optical orientation"],
  ];
  let title = ["Logitech MX Master", "Apple Pencil", "Zebronics Zeb-transformer", "Petronics Toad 23"];
  return (
    <div className="product">
      <h3>{title[idxs]}</h3>
      <p>{Description[idxs][idx2]}</p>
      <p>{Description[idxs][idx2+ 1]}</p>
      <Price idx= {idxs} />
    </div>
  );
};

export default Product;
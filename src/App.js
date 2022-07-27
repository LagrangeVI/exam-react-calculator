import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [screenValue, setscreenValue] = useState("sdfsdf");

  const Key = ({ label = "0" }) => {
    return (
      <button type="ghost" size="large" className="button">
        {label}
      </button>
    );
  };

  const Display = ({}) => {
    return <div className="display">{screenValue}</div>;
  };

  return (
    <div className="App">
      <div className="gridContainer">
        <Display />
        <div className="top-operators">
          <Key label="C" />
          <Key label="±" />
          <Key label="%" />
        </div>
        <div className="digits">
          <Key label="9" />
          <Key label="8" />
          <Key label="7" />
          <Key label="6" />
          <Key label="5" />
          <Key label="4" />
          <Key label="3" />
          <Key label="2" />
          <Key label="1" />
          <Key label="." />
          <Key label="0" />
        </div>
        
        <div className="side-operators">
          <Key label="÷" />
          <Key label="×" />
          <Key label="-" />
          <Key label="+" />
          <Key label="=" />
        </div>
      </div>
    </div>
  );
};

export default App;

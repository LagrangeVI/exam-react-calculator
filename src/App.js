import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import "./App.css";

const App = () => {
  const { state, actions } = useContext(AppContext);

  const CalculatorOperations = ["/", "*", "+", "-", "="];

  const CalculatorDisplay = ({ value }) => {
    let formattedValue = parseFloat(value ?? 0);

    return (
      <div className="calculator-display">
        {formattedValue && formattedValue}
      </div>
    );
  };
  const CalculatorKey = ({ onPress, className, ...props }) => {
    let onClick = () => {
      onPress();
    };
    return (
      <button
        onClick={() => onClick()}
        className={`calculator-key ${className}`}
        {...props}
      />
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      let { key } = e;

      if (key === "Enter") key = "=";

      if (/\d/.test(key)) {
        e.preventDefault();
        actions.inputDigit(parseInt(key, 10));
      } else if (key in CalculatorOperations) {
        e.preventDefault();
        actions.performOperation(key);
      } else if (key === ".") {
        e.preventDefault();
        actions.inputDot();
      } else if (key === "%") {
        e.preventDefault();
        actions.inputPercent();
      } else if (key === "Backspace") {
        e.preventDefault();
        actions.clearLastChar();
      } else if (key === "Clear") {
        e.preventDefault();
        if (state.displayValue !== "0") {
          actions.clearDisplay();
        } else {
          actions.clearAll();
        }
      } else return;
    };
    window.addEventListener("keyup", handleKeyDown);
    return () => window.removeEventListener("keyup", handleKeyDown);
  });
  let displayValue = state.displayValue ?? 0;

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey
              className="key-clear"
              onPress={() =>
                state.displayValue !== "0"
                  ? actions.clearDisplay()
                  : actions.clearAll()
              }
            >
              {state.displayValue !== "0" ? "C" : "AC"}
            </CalculatorKey>
            <CalculatorKey
              className="key-sign"
              onPress={() => actions.toggleSign()}
            >
              ±
            </CalculatorKey>
            <CalculatorKey
              className="key-percent"
              onPress={() => actions.inputPercent()}
            >
              %
            </CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey
              className="key-0"
              onPress={() => actions.inputDigit(0)}
            >
              0
            </CalculatorKey>
            <CalculatorKey
              className="key-dot"
              onPress={() => actions.inputDot()}
            >
              ●
            </CalculatorKey>
            <CalculatorKey
              className="key-1"
              onPress={() => actions.inputDigit(1)}
            >
              1
            </CalculatorKey>
            <CalculatorKey
              className="key-2"
              onPress={() => actions.inputDigit(2)}
            >
              2
            </CalculatorKey>
            <CalculatorKey
              className="key-3"
              onPress={() => actions.inputDigit(3)}
            >
              3
            </CalculatorKey>
            <CalculatorKey
              className="key-4"
              onPress={() => actions.inputDigit(4)}
            >
              4
            </CalculatorKey>
            <CalculatorKey
              className="key-5"
              onPress={() => actions.inputDigit(5)}
            >
              5
            </CalculatorKey>
            <CalculatorKey
              className="key-6"
              onPress={() => actions.inputDigit(6)}
            >
              6
            </CalculatorKey>
            <CalculatorKey
              className="key-7"
              onPress={() => actions.inputDigit(7)}
            >
              7
            </CalculatorKey>
            <CalculatorKey
              className="key-8"
              onPress={() => actions.inputDigit(8)}
            >
              8
            </CalculatorKey>
            <CalculatorKey
              className="key-9"
              onPress={() => actions.inputDigit(9)}
            >
              9
            </CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-divide"
            onPress={() => actions.performOperation("/")}
          >
            ÷
          </CalculatorKey>
          <CalculatorKey
            className="key-multiply"
            onPress={() => actions.performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className="key-subtract"
            onPress={() => actions.performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className="key-add"
            onPress={() => actions.performOperation("+")}
          >
            +
          </CalculatorKey>
          <CalculatorKey
            className="key-equals"
            onPress={() => actions.performOperation("=")}
          >
            =
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
};

export default App;

import React, {
  useState,
  createContext,
} from "react";

let initialState = {
  value: null,
  displayValue: "0",
  operator: "",
  waitingForOperand: false,
  scale: 1,
};


export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const actions = {
    clearAll: () => {
      setState({
        ...state,
        value: null,
        displayValue: "0",
        operator: null,
        waitingForOperand: false,
      });
    },
    clearDisplay: () => {
      setState({
        ...state,
        displayValue: "0",
      });
    },
    clearLastChar: () => {
      let displayValue = state.displayValue;
      setState({
        ...state,
        displayValue: displayValue.substring(0, displayValue.length - 1) || "0",
      });
    },
    toggleSign: () => {
      let displayValue = state.displayValue;

      let newValue = parseFloat(displayValue) * -1;
      setState({
        ...state,
        displayValue: String(newValue),
      });
    },
    inputPercent: () => {
      let displayValue = state.displayValue;

      const currentValue = parseFloat(displayValue);

      if (currentValue === 0) return;

      let fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
      let newValue = parseFloat(displayValue) / 100;

      setState({
        ...state,
        displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
      });
    },
    inputDot: () => {
      let displayValue = state.displayValue;

      if (!/\./.test(displayValue)) {
        setState({
          ...state,
          displayValue: displayValue + ".",
          waitingForOperand: false,
        });
      }
    },

    inputDigit: (digit) => {
      let waitingForOperand = state.waitingForOperand;
      let displayValue = state.displayValue;

      if (waitingForOperand) {
        setState({
          ...state,
          displayValue: String(digit),
          waitingForOperand: false,
        });
      } else {
        setState({
          ...state,
          displayValue:
            displayValue === "0" ? String(digit) : displayValue + digit,
        });
      }
    },

    performOperation: (nextOperator) => {
      let value = state.value;
      let displayValue = state.displayValue;
      let operator = state.operator;

      let inputValue = parseFloat(displayValue);

      if (value == null) {
        setState({
          ...state,
          value: inputValue,
          waitingForOperand: true,
          operator: `${nextOperator}`,
        });
      } else if (operator) {
        let currentValue = value ?? 0;
        let newValue;

        switch (operator) {
          case "/":
            newValue = currentValue / inputValue;
            break;
          case "*":
            newValue = currentValue * inputValue;
            break;

          case "+":
            newValue = currentValue + inputValue;
            break;

          case "-":
            newValue = currentValue - inputValue;
            break;

          case "=":
            newValue = inputValue;
            break;
        }

        setState({
          ...state,
          value: newValue,
          displayValue: String(newValue),
          waitingForOperand: true,
          operator: `${nextOperator}`,
        });
      }
    },

    setScale: (scale) => {
      setState({
        ...state,
        scale: scale,
      });
    },
  };

  return (
    <AppContext.Provider
      value={{
        state: state,
        actions: actions,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

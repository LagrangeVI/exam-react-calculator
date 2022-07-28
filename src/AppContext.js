import React, {
  useState,
  useEffect,
  useContext,
  PointTarget,
  createContext,
} from "react";

let initialState = {
  value: null,
  displayValue: "0",
  operator: null,
  waitingForOperand: false,
  scale: 1,
};

const CalculatorOperations = {
  "/": (prevValue, nextValue) => {
    return prevValue / nextValue;
  },
  "*": (prevValue, nextValue) => {
    return prevValue * nextValue;
  },
  "+": (prevValue, nextValue) => {
    return prevValue + nextValue;
  },
  "-": (prevValue, nextValue) => {
    return prevValue - nextValue;
  },
  "=": (prevValue, nextValue) => {
    return nextValue;
  },
};

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const actions = {
    clearAll: () => {
      setState({
        ...state,
        value: 0,
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

      const newValue = parseFloat(displayValue) * -1;
      setState({
        ...state,
        displayValue: String(newValue),
      });
    },
    inputPercent: () => {
      let displayValue = state.displayValue;

      const currentValue = parseFloat(displayValue);

      if (currentValue === 0) return;

      const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
      const newValue = parseFloat(displayValue) / 100;

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
      let displayValue = state.displayValue;
      let value = state.value;
      let operator = state.operator;

      console.log("displayValue, value, nextOperator");
      console.log(displayValue, value, nextOperator);

      const inputValue = parseFloat(displayValue);

      if (value == null) {
        setState({
          ...state,
          value: inputValue,
        });
      } else if (operator) {
        const currentValue = value || 0;
        const newValue = CalculatorOperations[operator](
          currentValue,
          inputValue
        );
        console.log("currentValue, operator, inputValue, newValue");
        console.log(currentValue, operator, inputValue, newValue);

        setState({
          ...state,
          value: newValue,
          displayValue: String(newValue),
        });
      }

      setState({
        ...state,
        waitingForOperand: true,
        operator: nextOperator,
      });
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

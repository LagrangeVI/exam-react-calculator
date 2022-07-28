import React, {
  useState,
  useEffect,
  useContext,
  PointTarget,
  createContext,
} from "react";

import "./App.css";



const AppContext = createContext();

const AppContextProvider = (props) => {
  const [state, setState] = useState({
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
    scale: 1,
  });

  
  const actions = {
    setValue: async (value) => {
      setState({ ...state, value });
    },
    clearAll: async () => {
      setState({
        ...state,
        value: null,
        displayValue: "0",
        operator: null,
        waitingForOperand: false,
      });
    },
    clearDisplay: async () => {
      setState({
        ...state,
        displayValue: "0",
      });
    },
    clearLastChar: async () => {
      setState({
        ...state,
        displayValue:
          state.displayValue.substring(0, state.displayValue.length - 1) || "0",
      });
    },
    toggleSign: async () => {
      const newValue = parseFloat(state.displayValue) * -1;
      setState({
        ...state,
        displayValue: String(newValue),
      });
    },
    inputPercent: async () => {
      const currentValue = parseFloat(state.displayValue);

      if (currentValue === 0) return;

      const fixedDigits = state.displayValue.replace(/^-?\d*\.?/, "");
      const newValue = parseFloat(state.displayValue) / 100;

      setState({
        ...state,
        displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
      });
    },
    inputDot: async () => {
      if (!/\./.test(state.displayValue)) {
        setState({
          ...state,
          displayValue: state.displayValue + ".",
          waitingForOperand: false,
        });
      }
    },

    inputDigit: async (digit) => {
      if (state.waitingForOperand) {
        setState({
          ...state,
          displayValue: String(digit),
          waitingForOperand: false,
        });
      } else {
        setState({
          ...state,
          displayValue:
            state.displayValue === "0"
              ? String(digit)
              : state.displayValue + digit,
        });
      }
    },
    performOperation: async (nextOperator) => {
      const inputValue = parseFloat(state.displayValue);

      if (state.value == null) {
        setState({
          ...state,
          value: inputValue,
        });
      } else if (state.operator) {
        const currentValue = state.value || 0;
        const newValue = CalculatorOperations[state.operator](
          currentValue,
          inputValue
        );

        setState({
          ...state,
          value: newValue,
          displayValue: String(newValue),
        });
      }

      setState({
        waitingForOperand: true,
        operator: nextOperator,
      });
    },
    setScale: async (scale) => {
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

const CalculatorDisplay = () => {
  const {state, actions} = useContext(AppContext);

  let formattedValue = parseFloat(state.value).toFixed(2);

  // Add back missing .0 in e.g. 12.0
  // const match = state.value.match(/\.\d*?(0*)$/);

  // if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return (
    <div className="calculator-display">
      {formattedValue}
    </div>
  );
};

const CalculatorKey = ({ onPress, className, ...props }) => {
  return (

      <button onClick={()=>onPress()} className={`calculator-key ${className}`} {...props} />

  );
};

const CalculatorOperations = {
  "/": (prevValue, nextValue) => prevValue / nextValue,
  "*": (prevValue, nextValue) => prevValue * nextValue,
  "+": (prevValue, nextValue) => prevValue + nextValue,
  "-": (prevValue, nextValue) => prevValue - nextValue,
  "=": (prevValue, nextValue) => nextValue,
};

const App = () => {
  const {state, actions} = useContext(AppContext);

  const handleKeyDown = (event) => {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      actions.inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      actions.performOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      actions.inputDot();
    } else if (key === "%") {
      event.preventDefault();
      actions.inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      actions.clearLastChar();
    } else if (key === "Clear") {
      event.preventDefault();

      if (state.displayValue !== "0") {
        actions.clearDisplay();
      } else {
        actions.clearAll();
      }
    }
  };

  return (
    <AppContextProvider>
      <div className="calculator">
          <CalculatorDisplay />
          <div className="calculator-keypad">
            <div className="input-keys">
              <div className="function-keys">
                <CalculatorKey
                  className="key-clear"
                  onPress={() =>
                    state.clearDisplay
                      ? actions.clearDisplay()
                      : actions.clearAll()
                  }
                >
                  {state.clearText}
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
    </AppContextProvider>
  );
};

export default App;

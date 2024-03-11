import { createContext, useContext, useReducer } from "react";
import LocalizationDictionary from "../shared/LocalizationDictionary";

const LocalizationContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "switchLanguage": {
      return {
        ...state,
        currentLanguage: state.currentLanguage === "en" ? "ar" : "en",
      };
    }
  }
}

function LocalizationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, LocalizationDictionary);
  return (
    <LocalizationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocalizationContext.Provider>
  );
}

function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined)
    throw new Error(
      "LocalizationContext was used outside of LocalizationProvider."
    );
  return context;
}

export { LocalizationProvider, useLocalization };

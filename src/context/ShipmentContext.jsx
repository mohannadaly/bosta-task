import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const initialState = {
  error: "",
  branch: "مدينة نصر",
  provider: "",
  CurrentStatus: {
    state: "",
    timestamp: "",
  },
  PromisedDate: "",
  TrackingNumber: "",
  TrackingURL: "",
  SupportPhoneNumbers: ["19043"],
  TransitEvents: [],
  CreateDate: "",
  isEditableShipment: false,
  nextWorkingDay: [
    {
      dayDate: "",
      dayName: "",
    },
  ],
};

const ShipmentContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "fetchedShipment": {
      const parsedTransiteEvents = action.payload.TransitEvents.map((item) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
      const promisedDate = new Date(
        action.payload.PromisedDate
      ).toLocaleDateString();
      return {
        ...initialState,
        ...action.payload,
        TransitEvents: parsedTransiteEvents,
        PromisedDate: promisedDate,
      };
    }
    case "failedFetch": {
      return { ...state, error: action.payload };
    }
    case "reset": {
      return initialState;
    }
  }
}

function ShipmentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async function getShipment() {
      const url = `https://tracking.bosta.co/shipments/track/${currentId}`;
      fetch(url, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => dispatch({ type: "fetchedShipment", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    };
    if (currentId !== "") {
      dispatch({ type: "reset" });
      fetchData();
    }
    return function () {
      controller.abort();
    };
  }, [currentId]);

  return (
    <ShipmentContext.Provider value={{ state, setCurrentId }}>
      {children}
    </ShipmentContext.Provider>
  );
}

function useShipment() {
  const context = useContext(ShipmentContext);
  if (context === undefined)
    throw new Error("ShipmentContext was used outside of ShipmentProvider.");
  return context;
}

export { ShipmentProvider, useShipment };

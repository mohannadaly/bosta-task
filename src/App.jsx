import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LocalizationProvider } from "./context/LocalizationContext";
import { ShipmentProvider } from "./context/ShipmentContext";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./ui/Spinner/SpinnerFullPage";

const TrackShipment = lazy(() => import("./pages/TrackShipment/TrackShipment"));
const Layout = lazy(() => import("./ui/Layout/Layout"));
const Shipment = lazy(() => import("./pages/Shipment/Shipment"));

function App() {
  return (
    <LocalizationProvider>
      <ShipmentProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate replace to="track" />} />
                <Route path="track" element={<TrackShipment />} />
                <Route path="track/:id" element={<Shipment />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ShipmentProvider>
    </LocalizationProvider>
  );
}

export default App;

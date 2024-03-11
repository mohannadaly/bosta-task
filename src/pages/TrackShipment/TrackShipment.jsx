import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TrackShipment.module.scss";
import { useLocalization } from "../../context/LocalizationContext";

function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const {
    state: {
      currentLanguage,
      translations: { shipmentId, trackShipment },
    },
  } = useLocalization();

  return (
    <main className={styles.trackShipmentMain}>
      <h1>{trackShipment[currentLanguage]}</h1>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder={shipmentId[currentLanguage]}
      />
      <Link to={`/track/${trackingNumber}`}>Search</Link>
    </main>
  );
}

export default TrackShipment;

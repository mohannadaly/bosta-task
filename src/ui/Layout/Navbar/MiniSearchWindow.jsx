import { useState } from "react";
import { useLocalization } from "../../../context/LocalizationContext";
import styles from "./Navbar.module.scss";
import Search from "/search.svg";
import { Link } from "react-router-dom";
function MiniSearchWindow() {
  const {
    state: {
      currentLanguage,
      translations: { shipmentId, trackShipment },
    },
  } = useLocalization();

  const [trackingNumber, setTrackingNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <article
      className={`${styles.miniSearchWindow} ${isFocused ? styles.shown : ""}`}
    >
      <h1>{trackShipment[currentLanguage]}</h1>
      <div className={styles.trackingNumberField}>
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder={shipmentId[currentLanguage]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Link reloadDocument to={`/track/${trackingNumber}`}>
          <img src={Search} alt="search icon" />
        </Link>
      </div>
    </article>
  );
}

export default MiniSearchWindow;

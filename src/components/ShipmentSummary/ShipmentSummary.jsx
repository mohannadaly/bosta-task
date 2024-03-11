import { useLocalization } from "../../context/LocalizationContext";
import { useShipment } from "../../context/ShipmentContext";
import styles from "./ShipmentSummary.module.scss";
import TransitEventsStatus from "../../shared/TransitEventsStatus";

function ShipmentSummary() {
  const {
    state: {
      provider,
      CurrentStatus: currentStatus,
      PromisedDate: promisedDate,
      TrackingNumber: trackingNumber,
      TransitEvents: transitEvents,
    },
  } = useShipment();
  const {
    state: {
      currentLanguage,
      translations: {
        shipmentId,
        lastUpdate,
        merchantName,
        deliveryDate,
        transitEvents: transitEventsMessages,
      },
    },
  } = useLocalization();
  const currentStatusState = currentStatus["state"];
  const currentStatusMessage =
    currentStatusState &&
    transitEventsMessages[currentStatus["state"]][currentLanguage];
  const latestUpdate = new Date(currentStatus["timestamp"]);
  const statusStyle = TransitEventsStatus[currentStatus["state"]] || "";

  console.log(transitEvents);

  return (
    provider && (
      <article className={styles.shipmentSummary}>
        <article>
          <h1>
            {shipmentId[currentLanguage]}: {trackingNumber}
          </h1>
          <p className={statusStyle}>{currentStatusMessage}</p>
        </article>
        <article>
          <h1>{lastUpdate[currentLanguage]}</h1>
          <p>{latestUpdate.toLocaleString()}</p>
        </article>
        <article>
          <h1>{merchantName[currentLanguage]}</h1>
          <p>{provider}</p>
        </article>
        <article>
          <h1>{deliveryDate[currentLanguage]}</h1>
          <p>{promisedDate}</p>
        </article>
      </article>
    )
  );
}

export default ShipmentSummary;

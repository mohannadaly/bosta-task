import { useLocalization } from "../../context/LocalizationContext";
import { useShipment } from "../../context/ShipmentContext";
import styles from "./ShipmentDetailsTable.module.scss";
import TransitEventsStatus from "../../shared/TransitEventsStatus";

function ShipmentDetailsTable() {
  const {
    state: {
      branch,
      TransitEvents: transitEvents,
      CurrentStatus: currentStatus,
    },
  } = useShipment();
  const {
    state: {
      currentLanguage,
      translations: {
        shipmentDetailsTitle,
        shipmentDetailsBranch,
        shipmentDetailsDate,
        shipmentDetailsTime,
        shipmentDetailsText,
        transitEvents: transitEventsMessages,
      },
    },
  } = useLocalization();

  const statusStyle = TransitEventsStatus[currentStatus["state"]] || "";

  return (
    <article className={styles.shipmentDetails}>
      <h1>{shipmentDetailsTitle[currentLanguage]}</h1>
      <table>
        <thead>
          <tr>
            <th>{shipmentDetailsBranch[currentLanguage]}</th>
            <th>{shipmentDetailsDate[currentLanguage]}</th>
            <th>{shipmentDetailsTime[currentLanguage]}</th>
            <th>{shipmentDetailsText[currentLanguage]}</th>
          </tr>
        </thead>
        <tbody>
          {transitEvents
            .filter((e) => e.state !== "RECEIVED_DELIVERY_LOCATION")
            .map((e, idx) => (
              <tr key={idx}>
                <td>{branch}</td>
                <td>{e.timestamp.toLocaleDateString()}</td>
                <td>
                  {e.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  {(transitEventsMessages[e.state] &&
                    transitEventsMessages[e.state][currentLanguage]) ||
                    e.state}
                  {e.exceptionCode && (
                    <>
                      <br />
                      <span className={styles[statusStyle]}>{e.reason}</span>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </article>
  );
}

export default ShipmentDetailsTable;

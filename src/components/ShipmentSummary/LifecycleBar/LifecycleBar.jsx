import { useShipment } from "../../../context/ShipmentContext";
import { useLocalization } from "../../../context/LocalizationContext";
import styles from "./LifecycleBar.module.scss";
import PackageCreated from "/1.svg";
import PackageHanded from "/2.svg";
import OutForDelivery from "/3.svg";
import Delivered from "/4.svg";
import TransitEventStatus from "../../../shared/TransitEventsStatus";
function LifecycleBar() {
  const {
    state: {
      CurrentStatus: { state },
      TransitEvents: transitEvents,
    },
  } = useShipment();
  const {
    state: {
      currentLanguage,
      translations: { transitEvents: transitEventsMessages },
    },
  } = useLocalization();

  const stage = [
    { imgSrc: PackageCreated, stateName: "TICKET_CREATED" },
    { imgSrc: PackageHanded, stateName: "PACKAGE_RECEIVED" },
    { imgSrc: OutForDelivery, stateName: "OUT_FOR_DELIVERY" },
    { imgSrc: Delivered, stateName: "DELIVERED" },
  ];

  const stateIds = {
    TICKET_CREATED: 1,
    PACKAGE_RECEIVED: 2,
    NOT_YET_SHIPPED: 3,
    IN_TRANSIT: 4,
    OUT_FOR_DELIVERY: 5,
    WAITING_FOR_CUSTOMER_ACTION: 6,
    DELIVERED: 7,
    DELIVERED_TO_SENDER: 8,
    CANCELLED: 9,
  };

  const currentState =
    stateIds[state] !== undefined
      ? state
      : transitEvents[transitEvents.length - 1].state;

  const currentStyle = styles[TransitEventStatus[state]];

  return (
    <div className={styles.barWrapper}>
      <div className={styles.barContainer}>
        {stage.map((element) => (
          <div
            key={element.stateName}
            className={`${styles.stageContainer} ${
              stateIds[currentState] > stateIds[element.stateName]
                ? currentStyle
                : ""
            }`}
          >
            <div
              className={`${styles.stage} ${
                stateIds[currentState] === stateIds[element.stateName]
                  ? currentStyle
                  : ""
              }`}
            >
              {stateIds[currentState] <= stateIds[element.stateName] &&
              stateIds[currentState] < 7 ? (
                <img
                  src={element.imgSrc}
                  alt={
                    transitEventsMessages[element.stateName][currentLanguage]
                  }
                  className={styles.stateIcon}
                />
              ) : (
                "✓"
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.statusMessages}>
        <h1>{transitEventsMessages.TICKET_CREATED[currentLanguage]}</h1>
        <h1>{transitEventsMessages.PACKAGE_RECEIVED[currentLanguage]}</h1>
        <h1>{transitEventsMessages.OUT_FOR_DELIVERY[currentLanguage]}</h1>
        <h1>{transitEventsMessages.DELIVERED[currentLanguage]}</h1>
      </div>
    </div>
  );
}

export default LifecycleBar;

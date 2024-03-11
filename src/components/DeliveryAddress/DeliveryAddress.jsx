import { useLocalization } from "../../context/LocalizationContext";
import { useShipment } from "../../context/ShipmentContext";
import styles from "./DeliveryAddress.module.scss";
function DeliveryAddress() {
  const {
    state: {
      currentLanguage,
      translations: { deliveryAddress },
    },
  } = useLocalization();
  const {
    state: { DeliveryAddress },
  } = useShipment();
  return (
    <article className={styles.deliveryAddress}>
      <h1>{deliveryAddress[currentLanguage]}</h1>
      <p>{DeliveryAddress}</p>
    </article>
  );
}

export default DeliveryAddress;

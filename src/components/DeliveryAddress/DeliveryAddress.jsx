import { useLocalization } from "../../context/LocalizationContext";
import styles from "./DeliveryAddress.module.scss";
function DeliveryAddress() {
  const {
    state: {
      currentLanguage,
      translations: { deliveryAddress },
    },
  } = useLocalization();
  return (
    <article className={styles.deliveryAddress}>
      <h1>{deliveryAddress[currentLanguage]}</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
        voluptates eos cupiditate sint, deleniti inventore, error neque ut quod
        repellendus voluptatem nam quia consectetur hic a possimus soluta,
        sapiente sunt.
      </p>
    </article>
  );
}

export default DeliveryAddress;

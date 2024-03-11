import { useLocalization } from "../../context/LocalizationContext";
import { useShipment } from "../../context/ShipmentContext";
import styles from "./SupportCta.module.scss";
import Support from "/support.svg";

function SupportCta() {
  const {
    state: {
      currentLanguage,
      translations: { gotIssues, gotIssuesCta },
    },
  } = useLocalization();
  const {
    state: { SupportPhoneNumbers },
  } = useShipment();
  return (
    <article className={styles.supportCta}>
      <img src={Support} alt="CTA Art" />
      <article>
        <h1>{gotIssues[currentLanguage]}</h1>
        <a href={`tel:${SupportPhoneNumbers}`} className={styles.ctaButton}>
          {gotIssuesCta[currentLanguage]}
        </a>
      </article>
    </article>
  );
}

export default SupportCta;

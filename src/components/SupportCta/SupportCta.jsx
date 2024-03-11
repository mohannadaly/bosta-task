import { useLocalization } from "../../context/LocalizationContext";
import styles from "./SupportCta.module.scss";
import Support from "/support.svg";

function SupportCta() {
  const {
    state: {
      currentLanguage,
      translations: { gotIssues, gotIssuesCta },
    },
  } = useLocalization();
  return (
    <article className={styles.supportCta}>
      <img src={Support} alt="CTA Art" />
      <article>
        <h1>{gotIssues[currentLanguage]}</h1>
        <button className={styles.ctaButton}>
          {gotIssuesCta[currentLanguage]}
        </button>
      </article>
    </article>
  );
}

export default SupportCta;

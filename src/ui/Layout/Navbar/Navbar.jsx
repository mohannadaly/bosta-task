import { Link } from "react-router-dom";
import { useLocalization } from "../../../context/LocalizationContext";
import styles from "./Navbar.module.scss";
import Logo from "../../Logo";
import MiniSearchWindow from "./MiniSearchWindow";

function Navbar() {
  const {
    state: {
      currentLanguage,
      translations: { home, pricing, sales, trackShipment, login },
    },
    dispatch,
  } = useLocalization();

  const altLanguage = currentLanguage === "en" ? "AR" : "EN";

  const switchLanguage = () => {
    dispatch({ type: "switchLanguage" });
  };

  return (
    <nav className={styles.navbar}>
      <Link to="https://bosta.co/">
        <Logo />
      </Link>
      <ul className={styles.primaryLinks}>
        <li>
          <Link to="/">{home[currentLanguage]}</Link>
        </li>
        <li>
          <Link to="https://bosta.co/pricing">{pricing[currentLanguage]}</Link>
        </li>
        <li>
          <Link to="https://bosta.co/business">{sales[currentLanguage]}</Link>
        </li>
      </ul>

      <ul className={styles.secondaryLinks}>
        <li className={styles.trackingLink}>
          <Link to="track">{trackShipment[currentLanguage]}</Link>
          <MiniSearchWindow />
        </li>
        <li className={styles.separator} />
        <li>
          <Link to="https://business.bosta.co/signin">
            {login[currentLanguage]}
          </Link>
        </li>
        <li className={styles.languageSwitch}>
          <button onClick={switchLanguage}>{altLanguage}</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

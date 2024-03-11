import LifecycleBar from "./LifecycleBar/LifecycleBar";
import styles from "./ShipmentSummary.module.scss";
import SummaryInfo from "./SummaryInfo/SummaryInfo";

function ShipmentSummary() {
  return (
    <article className={styles.shipmentSummary}>
      <SummaryInfo />
      <LifecycleBar />
    </article>
  );
}

export default ShipmentSummary;

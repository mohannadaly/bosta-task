import { useParams } from "react-router";
import { useShipment } from "../../context/ShipmentContext";
import { lazy, useEffect } from "react";
import DeliveryAddress from "../../components/DeliveryAddress/DeliveryAddress";
import SupportCta from "../../components/SupportCta/SupportCta";
import styles from "./Shipment.module.scss";

const ShipmentSummary = lazy(() =>
  import("../../components/ShipmentSummary/ShipmentSummary")
);
const ShipmentDetailsTable = lazy(() =>
  import("../../components/ShipmentDetailsTable/ShipmentDetailsTable")
);

function Shipment() {
  const { id } = useParams();
  const { setCurrentId } = useShipment();

  useEffect(() => {
    setCurrentId(id);
  }, [id, setCurrentId]);

  return (
    <main className={styles.shipmentMain}>
      <ShipmentSummary key={id} />
      <section>
        <ShipmentDetailsTable key={id} />
        <aside>
          <DeliveryAddress key={id} />
          <SupportCta />
        </aside>
      </section>
    </main>
  );
}

export default Shipment;

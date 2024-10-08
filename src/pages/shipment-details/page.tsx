import styles from './styles.module.scss';

import { useParams } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import useShipmentDetails from '../../hooks/useShipmentDetails';
import Loader from '../../components/loader/loader';
import Timeline from './components/timeline/timeline';
import DetailsTable from './components/details-table/details-table';
import Address from './components/address/address';
import Help from './components/help/help';

export default function ShipmentDetailsPage() {
  const { shipmentId } = useParams();
  const { data, error, isLoading } = useShipmentDetails(Number(shipmentId));

  usePageTitle(`Bosta | Shipment ${shipmentId ?? 'Invalid'}`);

  if (isLoading) return <Loader />;
  if (error) throw error;
  if (data?.isDraftOrder || data?.TransitEvents?.length === 0)
    return (
      <article className={styles.page}>
        <img src="/pin.png" alt="Map Pin" />
        <h1>{data.CurrentStatus.state}</h1>
      </article>
    );
  return (
    <article className={styles.page}>
      <Timeline shipmentDetails={data} />
      <div className={styles.container}>
        <DetailsTable events={data?.TransitEvents ?? []} />

        <div className={styles.side}>
          <Address address={data?.DropOffAddress} />
          <Help />
        </div>
      </div>
    </article>
  );
}

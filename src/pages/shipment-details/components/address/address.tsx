import { useTranslation } from 'react-i18next';
import { type Address } from '../../../../types/util';
import styles from './styles.module.scss';
export default function Address({ address }: Readonly<{ address?: Address }>) {
  const { t } = useTranslation();
  return (
    <section className={styles.address}>
      <h3>{t('pages.shipments.address.title')}</h3>
      <p>
        {address?.buildingNumber && `${address?.buildingNumber} - `}
        {address?.firstLine ?? ''}
        {address?.floor &&
          `, ${t('pages.shipments.address.floor')} ${address?.floor}`}
        {address?.apartment &&
          `, ${t('pages.shipments.address.apartment')} ${address?.apartment}`}
        <br />
        {address?.secondLine ?? ''}
        <br />
      </p>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import Widget from '../../components/widget/widget';
import usePageTitle from '../../hooks/usePageTitle';

export default function TrackPage() {
  const { t } = useTranslation();

  usePageTitle('Bosta | Track Your Shipment');

  return (
    <article className={styles.page}>
      <section>
        <img src="/pin.png" alt="Map Pin" />
        <h1>{t('pages.track.header')}</h1>
        <p>{t('pages.track.subheader')}</p>
        <Widget className={styles.widget} />
      </section>
    </article>
  );
}

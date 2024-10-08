import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
export default function Help() {
  const { t } = useTranslation();
  return (
    <section className={styles.help}>
      <img src="/support.svg" alt="Support" />
      <h3>{t('pages.shipments.help.title')}</h3>
      <button>{t('pages.shipments.help.cta')}</button>
    </section>
  );
}

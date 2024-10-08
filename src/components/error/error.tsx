import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
export default function ErrorComponent() {
  const { t } = useTranslation();
  return (
    <article className={styles.page}>
      <h1>{t('pages.error.header')}</h1>
      <p>{t('pages.error.message')}</p>
      <Link to={'/'}>{t('pages.error.cta')}</Link>
    </article>
  );
}

import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const { t } = useTranslation();

  const header = t('pages.home.header');
  const splitHeader = header.split(' ');
  const headerPhrase = splitHeader.slice(0, -1).join(' ');
  const headerHighlightedWord = splitHeader[splitHeader.length - 1];

  return (
    <article className={styles.page}>
      <h1>
        {headerPhrase} <span>{headerHighlightedWord}</span>
      </h1>
      <h2>{t('pages.home.subheader')}</h2>
      <Link to="/track" className={styles.cta}>
        {t('pages.home.cta')}
      </Link>
      <div className={styles.emblem}>
        <img src='/logo/emblem.svg' alt="Emblem" />
      </div>
    </article>
  );
}

import { useTranslation } from 'react-i18next';
import { TransitEvent } from '../../../../types/util';
import styles from './styles.module.scss';
import { formatDate } from '../../../../util/formatDate';

export default function DetailsTable({
  events,
}: Readonly<{ events: TransitEvent[] }>) {
  const { t } = useTranslation();

  const _events = events
    .map((event) => ({
      ...event,
      timestamp: new Date(event.timestamp),
    }))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <section className={styles.table}>
      <h3>{t('pages.shipments.details.title')}</h3>

      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <td>{t('pages.shipments.details.header.branch')}</td>
            <td>{t('pages.shipments.details.header.date')}</td>
            <td>{t('pages.shipments.details.header.time')}</td>
            <td>{t('pages.shipments.details.header.notes')}</td>
          </tr>
        </thead>
        <tbody>
          {_events.map((event, idx) => (
            <tr key={idx}>
              <td>{event.code ?? '#'}</td>
              <td>{formatDate(event.timestamp).date}</td>
              <td dir="ltr">{formatDate(event.timestamp).time}</td>
              <td>
                {event.state}
                {event.msg && (
                  <>
                    <br />
                    <em>{event.msg}</em>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

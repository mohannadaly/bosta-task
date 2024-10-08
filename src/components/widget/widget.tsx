import { ChangeEvent, HTMLAttributes, useRef, useState } from 'react';
import styles from './widget.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

type WidgetProps = HTMLAttributes<HTMLDivElement> & Readonly<{}>;
export default function Widget({ className, ...props }: WidgetProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const valid =
      event.target.validity.valid || event.target.value.length === 0;
    if (!valid) return;
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (value.length === 0) return;
    navigate(`/shipments/${value}`);
    setValue('');
  };

  return (
    <div {...props} className={`${styles.widget} ${className}`}>
      <label>{t('pages.track.header')}</label>
      <section className={styles.searchField}>
        <input
          ref={inputRef}
          value={value}
          type="number"
          placeholder={t('pages.track.placeholder')}
          pattern="[0-9]*"
          onChange={handleInput}
          required
        />
        <button
          onClick={handleSubmit}
          disabled={!inputRef.current?.validity.valid}
        >
          <img src="/search.svg" alt="search" />
        </button>
      </section>
    </div>
  );
}

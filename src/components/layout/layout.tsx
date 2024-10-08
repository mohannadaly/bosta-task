import Navbar from '../navbar/navbar';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  useEffect(() => {
    if (searchParams.get('lang') !== i18n.language) {
      setSearchParams({ ...searchParams, lang: i18n.language });
    }
  }, [i18n.language]);

  return (
    <>
      <Navbar />
      <main className="main">{children}</main>
    </>
  );
}

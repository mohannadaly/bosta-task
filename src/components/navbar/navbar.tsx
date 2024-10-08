import './navbar.scss';
import Widget from '../widget/widget';

import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navbarToggleRef = useRef<HTMLButtonElement>(null);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [renderWidget, setRenderWidget] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [focused, setFocused] = useState(false);

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language.split('-')[0].toLowerCase();
  const targetLanguage = currentLanguage === 'en' ? 'ar' : 'en-US';

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleMouseEnter = () => {
    setRenderWidget(true);
    setTimeout(() => setShowWidget(true), 10);
  };

  const handleMouseLeave = () => {
    if (!focused) {
      setShowWidget(false);
      setTimeout(() => setRenderWidget(false), 100);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setShowWidget(false);
    setTimeout(() => setRenderWidget(false), 100);
  };

  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (
        navbarToggleRef.current &&
        !navbarToggleRef.current.contains(e.target as Node)
      ) {
        setNavbarExpanded(false);
      }
    };

    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <header className="header" ref={navbarToggleRef}>
      <button
        className="navbar-toggle"
        onClick={() => setNavbarExpanded(!navbarExpanded)}
      >
        <img
          className="icon"
          src={`/navbar/${navbarExpanded ? 'close' : 'hamburger'}.svg`}
          alt="Navbar Toggle Icon"
        />
      </button>
      <nav className={`navbar ${navbarExpanded ? 'expanded' : ''}`}>
        <Link to="https://bosta.co" className="logo">
          <img
            className="logo"
            src={`/logo/${currentLanguage}.svg`}
            alt="Bosta"
          />
        </Link>

        <ul className="navItems">
          <li className="navItem">
            <NavLink to="/">{t('navbar.home')}</NavLink>
          </li>

          <li className="navItem">
            <Link to="https://bosta.co/pricing">{t('navbar.pricing')}</Link>
          </li>

          <li className="navItem">
            <Link to="https://bosta.co/business">{t('navbar.sales')}</Link>
          </li>
        </ul>

        <ul className="navItems">
          <li onMouseLeave={handleMouseLeave} className="navItem trackWidget">
            <NavLink
              onMouseEnter={handleMouseEnter}
              className={`${showWidget ? 'active' : ''}`}
              to="/track"
            >
              {t('navbar.track')}
            </NavLink>
            {renderWidget && (
              <div className={`widgetWrapper ${showWidget && 'visible'}`}>
                <Widget onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            )}
          </li>

          <li className="navItem">
            <Link to="https://business.bosta.co/signin">
              {t('navbar.login')}
            </Link>
          </li>

          <li className="navItem">
            <button
              className="switchLanguage"
              onClick={() => changeLanguage(targetLanguage)}
            >
              {currentLanguage === 'en' ? 'AR' : 'ENG'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

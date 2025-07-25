import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' }
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    // For RTL support
    if (e.target.value === 'ar' || e.target.value === 'he' || e.target.value === 'fa') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor="language-select" style={{ marginRight: 8 }}>{t('language')}:</label>
      <select id="language-select" value={i18n.language} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
}

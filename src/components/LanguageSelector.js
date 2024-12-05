// src/components/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-selector">
            <button 
                className={`lang-btn ${i18n.language.includes('es') ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
            >
                ES
            </button>
            <button 
                className={`lang-btn ${i18n.language.includes('en') ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSelector;
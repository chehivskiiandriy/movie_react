import React from 'react';
import classNames from 'classnames';

import './LocaleItem.scss';

const LocaleItem = ({ lang, changeLocale, flag, fullLang, active }) => (
    <li onMouseDown={() => changeLocale(lang)} className={classNames('LocaleItem', { active: active === lang })}>
        <img src={flag} alt={lang} />
        <span>{fullLang}</span>
    </li>
);
export default LocaleItem;

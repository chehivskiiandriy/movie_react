import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { setLocale } from "../../../ducks/locale";
import './LocaleMenu.scss';
import LocaleItem from './LocaleItem/LocaleItem';

import flag_en from '../../../assets/images/en.png';
import flag_uk from '../../../assets/images/uk.png';
import flag_ru from '../../../assets/images/ru.png';

class LocaleMenu extends Component {
    state = {
        isOpen: false
    };

    localeHandler = (lang) => {
        this.props.setLocale(lang);
        this.toggleMenu();
    };

    toggleMenu = () => this.setState((prevState) => {
        return { isOpen: !prevState.isOpen };
    });

    hideLocaleMenu = () => this.setState({ isOpen: false });

    render () {
        const { lang } = this.props;
        const { isOpen } = this.state;

        const locales = ['en', 'uk', 'ru'];
        const flags = {
            en: flag_en,
            uk: flag_uk,
            ru: flag_ru
        };
        const fullLang = {
            en: 'English',
            uk: 'Українська',
            ru: 'Русский'
        };

        const localeList = locales
            // .filter(lng => lng !==lang)
            .map(lng =>
            <LocaleItem
                key={lng}
                lang={lng}
                flag={flags[lng]}
                fullLang={fullLang[lng]}
                active={lang}
                changeLocale={this.localeHandler}/>
        );

        return (
            <div className="LocaleMenu" >
                <button
                    className={classNames('CurrentLocale', { ActiveLocale: isOpen })}
                    onClick={this.toggleMenu}
                    onBlur={this.hideLocaleMenu}>
                    {lang.toUpperCase()}</button>
                {isOpen && <ul className="LocaleList">
                    {localeList}
                </ul>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.locale.lang
    }
};

export default connect(mapStateToProps, { setLocale })(LocaleMenu);
import React from 'react';
import { Link } from 'react-router-dom';

import movieLogo from '../../../assets/images/moveee.png';
import './Logo.scss';

const Logo = () => (
    <div className="Logo">
        <Link to="/" className="Link">
            <img src={movieLogo} alt="Movie"/>
        </Link>
    </div>
);

export default Logo;
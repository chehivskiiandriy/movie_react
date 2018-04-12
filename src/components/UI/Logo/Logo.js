import React from 'react';
import { Link } from 'react-router-dom';

import movieLogo from '../../../assets/images/movie_logo.png';

const Logo = () => (
    <div>
        <Link to="/">
            <img src={movieLogo} alt="Movie"/>
        </Link>
    </div>
);

export default Logo;
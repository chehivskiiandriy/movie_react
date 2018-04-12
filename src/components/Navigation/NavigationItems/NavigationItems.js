import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Dropdown from './Dropdown/Dropdown';

const NavigationItems = () => (
    <ul>
        <NavigationItem link="/" name="New" exact />
        <NavigationItem link="/films" name="Films" exact>
            <Dropdown>
                <NavigationItem link="/films/comedy" name="Comedy" exact />
                <NavigationItem link="/films/horror" name="Horror" exact >
                    <Dropdown>
                        <NavigationItem link="/films/horror/one" name="One" exact />
                        <NavigationItem link="/films/horror/two" name="Two" exact />
                    </Dropdown>
                </NavigationItem>
            </Dropdown>
        </NavigationItem>
        <NavigationItem link="/serials" name="Serials"/>
    </ul>
);

export default NavigationItems;
import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import './NavigationItems.scss';

const NavigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" name="New" exact color="DarkBlue"/>
        <NavigationItem link="/films" name="Films" exact color="Blue">
            <DropdownMenu>
                <NavigationItem link="/films/comedy" name="Comedy" exact />
                <NavigationItem link="/films/horror" name="Horror" exact >
                    <DropdownMenu>
                        <NavigationItem link="/films/horror/one" name="One" exact />
                        <NavigationItem link="/films/horror" name="Two" exact >
                            <DropdownMenu>
                                <NavigationItem link="/films/horror/one" name="OneOne" exact />
                                <NavigationItem link="/films/horror/two" name="TwoTwo" exact />
                            </DropdownMenu>
                        </NavigationItem>
                    </DropdownMenu>
                </NavigationItem>
                <NavigationItem link="/films/comedy" name="Fantasy" exact />
            </DropdownMenu>
        </NavigationItem>
        <NavigationItem link="/serials" name="Serials" color="Red"/>
    </ul>
);

export default NavigationItems;
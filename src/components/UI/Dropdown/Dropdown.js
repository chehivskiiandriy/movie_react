import React from 'react';

const Dropdowm = () => {

    return (
        <div className="Dropdown">
            <div className="DropdownTitle">Title</div>
            <div className="DropdownSub">
                <ul className="SubMenu">
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
                <ul className="SubMenu">
                    <li>OneOne</li>
                    <li>TwoTwo</li>
                    <li>ThreeThree</li>
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
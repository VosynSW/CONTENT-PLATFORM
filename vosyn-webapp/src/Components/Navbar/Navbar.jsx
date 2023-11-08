import React from 'react';
import RegionSelector from '../RegionSelector/RegionSelector';

import './Navbar.css';

function Navbar() {
    return (
        <div className='navbar-container'>
            <RegionSelector />
        </div>
    );
}

export default Navbar;

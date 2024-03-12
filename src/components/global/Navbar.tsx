import React from 'react';
import { Link,NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className='w-full h-fit px-2 py-8 bg-gray-700 text-white'>
            <ul className='flex justify-between'>
                <Link to='/'>Scrapy</Link>
                <NavLink to='/'>Menu</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;
import React, { useEffect, useRef, useState } from 'react';
import Button from './button';
import '../styles/Status.css';
import optionsimg from '../assets/images/options.png';
import Dropdown from './Dropdown';  // Keep using './Dropdown' if you didn't rename the file
import '../styles/Dropdown.css';
import dropdownimg from '../assets/images/dropdown.png';

function Navbar(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownButtonRef = useRef(null);

    const handleClick = () => {
        console.log("hello");
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = (event) => {
        if (isDropdownOpen && !dropdownButtonRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, [isDropdownOpen]);

    return (
        <div className='randombar'>
            <div className='topBar' onClick={handleClick}>
                <img src={optionsimg} className='optionsImg' alt='Options' />
                <Button className='button'>Display</Button>
                <img src={dropdownimg} className='optionsImg2' alt='Dropdown' />
            </div>
            {isDropdownOpen && (
                <div ref={dropdownButtonRef}>
                    <Dropdown
                        order={props.order}
                        grouping={props.grouping}
                        setGroupingValue={props.setGroupingValue}
                        setOrderingValue={props.setOrderingValue}
                    />
                </div>
            )}
        </div>
    );
}

export default Navbar;
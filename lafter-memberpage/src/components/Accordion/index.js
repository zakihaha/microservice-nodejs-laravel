import React, { useState } from 'react';

export { default as Item } from './Item'
export { default as IconPlay } from 'public/images/icon-play.svg'
export { default as IconLock } from 'public/images/icon-lock.svg'

function Accordion({children}) {
    const [active, setActive] = useState(null);

    const toggle = (id) => {
        setActive(prev => prev === id ? null : id);
    }

    return (
        <div className='accordion'>
            {children(active, toggle)}
        </div>
    );
}

export default Accordion;
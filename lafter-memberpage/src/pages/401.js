import React from 'react';
import { Link } from 'react-router-dom';

function Unauthenticated(props) {
    return (
        <div>
            <br />
            Unauthenticated
            <Link to='/login' className="bg-indigo-700 hover:bg-indigo-800 focus:outline-none text-white py-3 px-6 shadow-inner">login</Link>
        </div>
    );
}

export default Unauthenticated;
import React from 'react';
import { Link } from 'react-router-dom';

function Centered({children}) {
    return (
        <section className='h-screen flex justify-center flex-col items-center'>
            <div className="text-lg text-gray-600 mt-4 mb-8 lg:w-8/12 xl:w-6/12 mx-auto text-center">
                {children}
            </div>
        </section>
    );
}

export default Centered;
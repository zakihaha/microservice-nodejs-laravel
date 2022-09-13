import React from 'react';
import { Link } from 'react-router-dom';

function Loading() {
    return (
        <section className='h-screen flex justify-center flex-col items-center'>
            <h1 className="text-3xl text-gray-900 mt-12">Doing science...</h1>
        </section>
    );
}

export default Loading;
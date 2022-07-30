import React from 'react';

function Clients(props) {
    return (
        <div className='flex justify-center items-center'>
            <div className="w-1/6">
                <img src="/images/logo-amazon.svg" className='mx-auto' alt="logo-amazon" />
            </div>
            <div className="w-1/6">
                <img src="/images/logo-microsoft.svg" className='mx-auto' alt="logo-microsoft" />
            </div>
            <div className="w-1/6">
                <img src="/images/logo-tesla.svg" className='mx-auto' alt="logo-tesla" />
            </div>
            <div className="w-1/6">
                <img src="/images/logo-google.svg" className='mx-auto' alt="logo-google" />
            </div>
            <div className="w-1/6">
                <img src="/images/logo-facebook.svg" className='mx-auto' alt="logo-facebook" />
            </div>
        </div>
    );
}

export default Clients;
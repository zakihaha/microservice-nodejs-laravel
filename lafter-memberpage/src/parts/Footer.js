import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    function submit() {

    }
    return (
        <footer className='container mx-auto'>
            <div className="flex justify-between">
                <div className="w-1/6">
                    <h6 className='text-white'>Company</h6>
                    <ul className="mt-4">
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">API Developer</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">Career</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">Our Story</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">New Soon</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-1/6">
                    <h6 className='text-white'>Student</h6>
                    <ul className="mt-4">
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">Get Scholarship</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">Our Pathskills</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">All Features</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="#" className="text-indigo-500 hover:text-teal-500 hover:underline">Refund Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-1/6">
                    <h6 className='text-white'>Touch Us</h6>
                    <p className="mt-4 text-indigo-500 leading-loose">
                        Micro Centre <br />
                        Alleysi Block X No. 12 <br />
                        Jakarta Selata, Indonesia <br />
                        +21 2020 5555
                    </p>
                </div>
                <div className="w-2/6">
                    <h6 className='text-white'>Promotion</h6>
                    <p className="mt-4 text-indigo-500">Submit your email for new updates</p>
                    <form onSubmit={submit}>
                        <input type="text" className='bg-white focus:outline-none border-0 px-6 py-3 mt-6' placeholder='Your email address' />
                        <button className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3">Register Now</button>
                    </form>
                </div>
            </div>
            <div className="border-t border-gray-800 text-center pt-8 mt-8">
                <p className="text-indigo-600">2022 Copyright Lafter. All Rights Reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
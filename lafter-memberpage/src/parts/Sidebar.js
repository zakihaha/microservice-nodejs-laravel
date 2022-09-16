import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import users from 'constants/api/users';

import { ReactComponent as DefaultUser } from 'assets/images/default-avatar.svg';

function Sidebar({ match, history }) {
    const getNavLinkClass = (path) => {
        return match.path === path ? 'active bg-indigo-900 text-white' : 'text-indigo-500';
    }

    const USERS = useSelector(state => state.users);

    const logout = async() => {
        try {
            await users.logout()
            localStorage.removeItem('lafter:token');
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <aside className='bg-indigo-1000 max-h-screen h-screen overflow-y-auto' style={{ width: 280 }}>
            <div className="max-h-screen h-screen fixed bg-indigo-1000 flex flex-col content-between" style={{ width: 280 }}>
                <div className="flex flex-col text-center mt-8">
                    <div className="border border-indigo-500 mx-auto p-2 inline-flex rounded-full overflow-hidden mb-3">
                        {
                            USERS?.avatar ? <img className='rounded-full object-cover' src={USERS?.avatar} alt={USERS?.name} style={{ width: 90, height: 90 }} />
                                :
                                <DefaultUser className='rounded-full fill-indigo-500' style={{ width: 90, height: 90 }}></DefaultUser>
                        }
                    </div>

                    <h6 className='text-white text-xl'>{USERS?.name ?? "Username"}</h6>
                    <span className='text-indigo-500 text-sm'>{USERS?.profession ?? "Profession"}</span>
                </div>

                <ul className="main-menu mt-12">
                    <li>
                        <Link to='/' className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left", getNavLinkClass("/")].join(" ")}>
                            My Class
                        </Link>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href={`${process.env.REACT_APP_FRONTPAGE_URL}/library`}
                            className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500"].join(" ")}>
                            Library
                        </a>
                    </li>
                    <li>
                        <Link to='/transactions' className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left", getNavLinkClass("/transactions")].join(" ")}>
                            Transactions
                        </Link>
                    </li>
                    <li>
                        <Link to='/settings' className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left", getNavLinkClass("/settings")].join(" ")}>
                            Settings
                        </Link>
                    </li>
                </ul>

                <div className="my-auto"></div>

                <ul className="main-menu mt-12">
                    <li>
                        <button
                            onClick={logout}
                            className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white text-indigo-500 focus:outline-none w-full text-left"].join(" ")}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default withRouter(Sidebar);
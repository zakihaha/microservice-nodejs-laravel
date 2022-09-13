import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import users from 'constants/api/users';
import { setAuthorizationHeader } from 'configs/axios'
import { populateProfile } from 'store/actions/users';

import useForm from 'helpers/hooks/useForm';

function LoginForm({ history }) {
    const dispatch = useDispatch();

    const [{ email, password }, setState] = useForm({
        email: "", password: ""
    })

    const submit = async (e) => {
        e.preventDefault()

        try {
            let response = await users.login({ email, password })
            setAuthorizationHeader(response.data.token)

            let user = await users.details()

            dispatch(populateProfile(user.data[0]))

            const production = process.env.REACT_APP_FRONTPAGE_URL === "http://localhost:3001" ? "Domain = localhost" : ""
            localStorage.setItem("lafter:token", JSON.stringify({
                ...response.data, email
            }))

            const redirect = localStorage.getItem('lafter:redirect')
            const userCookie = {
                name: user.data[0].name,
                thumbnail: user.data[0].avatar
            }

            const expires = new Date(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000
            )

            document.cookie = `lafter:user=${JSON.stringify(userCookie)}; expires=${expires.toUTCString()}; path:/; ${production}`

            history.push(redirect || "/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center items-center pb-24'>
            <div className="w-3/12">
                <h1 className="text-4xl text-gray-900 mb-6">
                    <span className="font-bold">Continue</span> Study, <br />
                    Finish your <span className="font-bold">Goals</span>
                </h1>
                <form onSubmit={submit} method="post">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className='text-lg mb-2'>Email Address</label>
                        <input type="email" name='email' className='bg-white focus:outline-none px-6 py-3 w-full border border-gray-600 focus:border-teal-500' value={email} onChange={setState} placeholder='Your email address' />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className='text-lg mb-2'>Password</label>
                        <input type="password" name='password' className='bg-white focus:outline-none px-6 py-3 w-full border border-gray-600 focus:border-teal-500' value={password} onChange={setState} placeholder='Your email address' />
                    </div>
                    <button type='submit' className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full">Register Now</button>
                </form>
            </div>

            <div className="w-1/12"></div>

            <div className="w-5/12 flex justify-end pt-24 pr-16">
                <div className="relative" style={{ width: 369, height: 440 }}>
                    <div className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0" style={{ width: 324, height: 374 }}>
                        <div className="absolute w-full h-full -right-8 -bottom-8">
                            <img src="/assets/images/tamara.jpg" alt="Girl with Laptop" />
                        </div>
                        <div className="absolute z-10 bg-white -bottom-24 -right-24 py-3 px-4" style={{ width: 290 }}>
                            <p className="text-gray-900 mb-2">Metode belajar yang santai seperti nonton drakor di Netflix</p>
                            <span className="text-gray-600">Alyssa, Apps Developer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginForm);
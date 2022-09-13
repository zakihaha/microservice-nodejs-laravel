import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import users from 'constants/api/users';
import useForm from 'helpers/hooks/useForm';
import fieldErrors from 'helpers/fieldErrors';
import Select from 'components/Form/Select';
import Input from 'components/Form/Input';

function RegisterForm({ history }) {
    const dispatch = useDispatch();

    const [{ name, email, password, profession, otherProfession }, setState] = useForm({
        name: "",
        email: "",
        password: "",
        profession: "",
        otherProfession: ""
    })

    const [errors, setErrors] = useState(null)

    const submit = async (e) => {
        e.preventDefault()

        try {
            let response = await users.register({ name, email, password, profession: profession === "other" ? otherProfession : profession })
            console.log(response);

            history.push("/login")
        } catch (error) {
            setErrors(error.response.data.message)
            console.log(error);
        }
    }

    const ERRORS = fieldErrors(errors)

    return (
        <div className='flex justify-center items-center pb-24'>
            <div className="w-3/12">
                <h1 className="text-4xl text-gray-900 mb-6">
                    <span className="font-bold">Grow Skills</span> From, <br />
                    Anywhere
                </h1>
                <form onSubmit={submit} method="post">
                    <Input
                        type='text'
                        value={name}
                        error={ERRORS?.name?.message}
                        name="name"
                        onChange={setState}
                        placeholder="Your Name"
                        labelName="FullName"
                    />

                    <Input
                        type='email'
                        value={email}
                        error={ERRORS?.email?.message}
                        name="email"
                        onChange={setState}
                        placeholder="Your email address"
                        labelName="Email Address"
                    />

                    <Input
                        type='password'
                        value={password}
                        error={ERRORS?.password?.message}
                        name="password"
                        onChange={setState}
                        placeholder="Your password"
                        labelName="Password"
                    />

                    <Select
                        labelName='Occupation'
                        name='profession'
                        value={profession}
                        fallbackText="Select your focus"
                        onclick={setState}>
                        <option value="">Select your focus</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="others">others</option>
                    </Select>
                    <span className="text-red-500 pt-2">{ERRORS?.profession?.message}</span>

                    {
                        profession === "others" && (
                            <Input
                                type='text'
                                value={otherProfession}
                                error={ERRORS?.otherProfession?.message}
                                name="otherProfession"
                                onChange={setState}
                                placeholder="Your Profession"
                                labelName="Other Occupation"
                            />
                        )
                    }

                    <button type='submit' className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full">Daftar</button>
                </form>
            </div>

            <div className="w-1/12"></div>

            <div className="w-5/12 flex justify-end pt-24 pr-16">
                <div className="relative" style={{ width: 369, height: 440 }}>
                    <div className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0" style={{ width: 324, height: 374 }}>
                        <div className="absolute w-full h-full -right-8 -bottom-8">
                            <img src="/assets/images/james.jpg" alt="Girl with Laptop" />
                        </div>
                        <div className="absolute z-10 bg-white -bottom-24 -right-24 py-3 px-4" style={{ width: 290 }}>
                            <p className="text-gray-900 mb-2">Semua materi terstruktrur baik dan mentor yang sangat lihai</p>
                            <span className="text-gray-600">James, Apps Developer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(RegisterForm);
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Select from 'components/Form/Select';
import Input from 'components/Form/Input';
import useForm from 'helpers/hooks/useForm';

import users from 'constants/api/users';
import media from 'constants/api/media';
import { populateProfile } from 'store/actions/users';
import image2base64 from 'utils/image2base64'
import fieldErrors from 'helpers/fieldErrors';

import { ReactComponent as DefaultUser } from 'assets/images/default-avatar.svg';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

function SettingForm({ details }) {
    const dispatch = useDispatch()
    const addPicture = useRef(null)

    const [state, setKey, setState] = useForm({
        name: details?.name ?? "",
        email: details?.email ?? "",
        profession: details?.profession ?? "",
        avatar: details?.avatar ?? "",
        password: details?.password ?? "",
        otherProfession: details?.otherProfession ?? "",
    })

    const [errors, setErrors] = useState(null)

    const previewImage = (e) => {
        e.persist()
        image2base64(e.target.files[0]).then(image => {
            setKey({
                target: {
                    name: e.target.name,
                    value: image
                }
            })
        })
    }

    const submit = async (e) => {
        e.preventDefault()

        let payload = {
            name: state.name,
            email: state.email,
            profession: state.profession === "other" ? state.otherProfession : state.profession,
            password: state.password
        }

        if (state.avatar.indexOf("base64") > -1) {
            let avatar = await media.upload(state.avatar)
            console.log(avatar);
            payload.avatar = avatar.data.image
        }

        console.log('new user data', payload);

        try {
            let res = await users.update(payload)
            toast.success("Profile updated")
            setState({
                ...state,
                password: ""
            })
            setErrors(null)
            console.log(res.data);
            dispatch(populateProfile({
                ...details,
                ...res.data
            }))
        } catch (err) {
            console.log(err);
            setErrors(err?.response?.data?.message)
        }
        // users.update(payload).then(res => {
        //     toast.success("Profile updated")
        //     setState({
        //         ...state,
        //         password: ""
        //     })
        //     setErrors = null
        //     console.log(res.data);
        //     dispatch(populateProfile(
        //         {
        //             ...details,
        //             res.data
        //         }
        //     ))
        // }).catch(err => {
        //     setErrors(err?.response?.data?.message)
        // })
    }

    const ERRORS = fieldErrors(errors)

    return (
        <>
            <section className="flex flex-col mt-8">
                <div className="flex justify-start items-center -mx-5">
                    <div className="w-auto text-center px-5">
                        <div className="rounded-full overflow-hidden w-24 h-24">
                            {
                                state.avatar ?
                                    <img src={state.avatar} alt="avatar" className="w-full h-full object-cover" />
                                    :
                                    <DefaultUser className='fill-indigo-500' style={{ width: 90, height: 90 }}></DefaultUser>
                            }
                        </div>
                    </div>
                    <div className="w-full-flex flex-col">
                        <span className='text-gray-600'>Add your picture...</span>
                        <div>
                            <input type="file" name="avatar" id="avatar" ref={addPicture} onChange={previewImage} className='hidden' />
                            <button
                                onClick={() => addPicture.current.click()}
                                className="bg-gray-300 hover:bg-gray-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-3">
                                Browse
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col mt-8">
                <div className="flex items-center pb-24">
                    <div className="w-4/12">
                        <form onSubmit={submit}>
                            <Input
                                type='text'
                                value={state.name}
                                error={ERRORS?.name?.message}
                                name="name"
                                onChange={setKey}
                                placeholder="Your Name"
                                labelName="FullName"
                            />

                            <Input
                                type='email'
                                value={state.email}
                                error={ERRORS?.email?.message}
                                name="email"
                                onChange={setKey}
                                placeholder="Your email address"
                                labelName="Email Address"
                            />

                            <Input
                                type='password'
                                value={state.password}
                                error={ERRORS?.password?.message}
                                name="password"
                                onChange={setKey}
                                placeholder="Your password"
                                labelName="Password"
                            />

                            <Select
                                labelName='Occupation'
                                name='profession'
                                value={state.profession}
                                fallbackText="Select your focus"
                                onclick={setKey}>
                                <option value="">Select your focus</option>
                                <option value="Web Developer">Web Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="others">others</option>
                            </Select>
                            <span className="text-red-500 pt-2">{ERRORS?.profession?.message}</span>

                            {
                                state.profession === "others" && (
                                    <Input
                                        type='text'
                                        value={state.otherProfession}
                                        error={ERRORS?.otherProfession?.message}
                                        name="otherProfession"
                                        onChange={setKey}
                                        placeholder="Your Profession"
                                        labelName="Other Occupation"
                                    />
                                )
                            }

                            <button type='submit' className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4">Update</button>

                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default withRouter(SettingForm);
import React, { useEffect } from 'react';

import Sidebar from 'parts/Sidebar';
import courses from 'constants/api/courses';
import { statusCourses, fetchCourses, messageCourses } from 'store/actions/courses';
import { useDispatch, useSelector } from 'react-redux';
import ListClassItem from 'parts/ListClassItem';
import Loading from 'parts/Loading';
import { setAuthorizationHeader } from 'configs/axios';

const EmptyState = () => {
    return <section className='flex h-screen items-center'>
        <div className="w-5/12 text-center py-12 mx-auto">
            <img src={`${process.env.PUBLIC_URL}/assets/images/illustration-my-class.png`} alt="please login" />
            <h1 className="text-3xl text-gray-900 mt-12">Time to Invest</h1>
            <p className='text-lg text-gray-600 mt-4 mb-8 mx-auto text-center'>
                It seems you don’t have any class yet so let’s get them and grow your skills
            </p>
            <a
                target="_blank"
                rel="noopener noreferrer"
                className='bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3'
                href={`${process.env.REACT_APP_FRONTPAGE_URL}/library`}
            >
                Cari Kelas
            </a>
        </div>
    </section>
}

function MyClass(props) {
    const dispatch = useDispatch();
    const COURSES = useSelector(state => state.courses);
    setAuthorizationHeader(JSON.parse(localStorage['lafter:token']).token)

    const getClass = async () => {
        dispatch(statusCourses("loading"));
        try {
            const response = await courses.mine();
            dispatch(fetchCourses(response.data));
            dispatch(statusCourses("success"));
        } catch (error) {
            dispatch(messageCourses(error.message));
            dispatch(statusCourses("error"));
        }
    }

    useEffect(() => {
        window.scroll(0, 0)

        getClass();
    }, []);

    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <main className='flex-1'>
                <div className='px-16'>
                    {COURSES.status === "loading" && <Loading />}
                    {COURSES.status === "error" && COURSES.message}
                    {COURSES.status === "ok" && (COURSES.total > 0 ?
                        <>
                            <section className="flex flex-col mt-8">
                                <h1 className="text-4xl text-gray-900 font-medium"> My Class </h1>
                                <p className='text-lg text-gray-600'>Continue learning to pursue your dreams</p>
                            </section>
                            <section className="flex flex-col mt-8">
                                <div className="flex justify-start items-center -mx-4">
                                    {
                                        Object.values(COURSES.data).map((item, index) => {
                                            return <ListClassItem data={item.course} key={index}></ListClassItem>
                                        })
                                    }
                                </div>
                            </section>
                        </>
                        :
                        <EmptyState />)
                    }
                </div>
            </main>
        </div>
    );
}

export default MyClass;
import React from 'react';

import { ReactComponent as ArrowBack } from 'assets/images/icon-arrow_back.svg';
import { Link, withRouter } from 'react-router-dom';

function SidebarClass({ data, match, defaultUri }) {
    const getNavLinkClass = (path) => {
        return match.url === path || defaultUri === path ? 'text-teal-500' : 'text-indigo-500';
    }

    const list = []
    data?.chapters?.forEach((chapter, index) => {
        list.push(
            <li key={`${chapter.course_id}-${index}`}>
                <span className="nav-header relative block py-3 px-5 bg-indigo-800 text-white text-left">
                    {chapter.name ?? "Chapter Name"}
                </span>
            </li>
        )

        if (chapter?.lessons?.length > 0) {
            chapter.lessons.forEach((lesson, index2) => {
                list.push(
                    <li key={`${chapter.course_id}-${index}-${lesson.id}-${index2}`}>
                        <Link
                            to={`/courses/${data.id}/${chapter.id}/${lesson.video}`}
                            className={[`relative flex items-center py-3 px-5 hover:text-white transition-all duration-200 w-full text-left truncate ...`,
                                getNavLinkClass(`/courses/${data.id}/${chapter.id}/${lesson.video}`)].join(" ")}
                        >
                            {lesson.name ?? "Lesson Name"}
                        </Link>

                    </li>
                )
            })
        }
    })


    return (
        <aside className='bg-indigo-1000 max-h-screen h-screen overflow-y-auto' style={{ width: 280 }}>
            <div className="max-h-screen h-screen fixed bg-indigo-1000 flex flex-col content-between" style={{ width: 280 }}>

                <ul className="main-menu mt-12">
                    <li>
                        <Link to='/' className="relative flex items-center py-3 px-5 w-full text-left text-white mb-12">
                            <ArrowBack className='fill-white mr-2'></ArrowBack>
                            Back to Home
                        </Link>
                    </li>
                    {list}
                </ul>


            </div>
        </aside>
    );
}

export default withRouter(SidebarClass);
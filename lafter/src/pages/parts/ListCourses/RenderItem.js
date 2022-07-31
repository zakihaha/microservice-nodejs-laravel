import React from 'react';
import Link from "next/link";

import IconPlay from 'public/images/icon-play.svg'

function RenderItem({item}) {
    return (
        <div className='w-1/4 px-4'>
            <div className="item relative">
                <figure className="item-image">
                    <IconPlay></IconPlay>
                    <img src={item?.thumbnail ?? ''} alt={item?.name ?? "Image Course"} />
                </figure>
                <div className="item-meta">
                    <h4 className="text-lg text-gray-900">{item?.name ?? "Course name"}</h4>
                    <h5 className="text-sm text-gray-600">{item?.level ?? "Course name"}</h5>
                </div>
                <Link href="course/[slug]" as={`/courses/${item.id}`}><a className="link-wrapped"></a></Link>
            </div>
        </div>
    );
}

export default RenderItem;
import Link from 'next/link';
import React from 'react';
import RenderItem from './RenderItem';
import BusinessDevelopment from 'public/images/icon-bd.svg'
import ContentWriter from 'public/images/icon-cw.svg'
import ProductAdvertisement from 'public/images/icon-pa.svg'
import CustomerRelationship from 'public/images/icon-cr.svg'
import GameDevelopment from 'public/images/icon-gd.svg'
import TravelGuidance from 'public/images/icon-tg.svg'

function ListCategories() {
    const data = [
        {
            imageName: <BusinessDevelopment />,
            name: "Business Development",
            total: 1293
        },
        {
            imageName: <ContentWriter />,
            name: "Content Writer",
            total: 564
        },
        {
            imageName: <ProductAdvertisement />,
            name: "Product Advertisement",
            total: 524
        },
        {
            imageName: <CustomerRelationship />,
            name: "Customer Relationship",
            total: 129
        },
        {
            imageName: <GameDevelopment />,
            name: "Game Development",
            total: 2352
        },
        {
            imageName: <TravelGuidance />,
            name: "Travel Guidance",
            total: 321
        },
    ]
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className="w-auto">
                    <h2 className='text-lg text-gray-600'>Categories</h2>
                    <h3 className='text-xl text-gray-900'>Explore & <span className='text-teal-400'>Learn</span></h3>
                </div>
            </div>

            <div className="flex justify-start items-center -mx-4 mt-6">
                {
                    data?.length > 0 ? data.map((item, index) => {
                        return <RenderItem item={item} key={index}></RenderItem>
                    }) : <div className="w-full text-center py-12">No Item Found</div>
                }
            </div>
        </>
    );
}

export default ListCategories;
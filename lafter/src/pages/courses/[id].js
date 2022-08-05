import Head from "next/head";
import Link from "next/link";
import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group'

import courses from "src/constants/api/courses";
import Header from "src/parts/Header";
import Feature from "src/parts/Details/Feature";
import NameTag from 'public/images/detail-student.svg'
import Playback from 'public/images/detail-video.svg'
import Certificate from 'public/images/detail-certificate.svg'
import CoursePhoto from "src/parts/Details/CoursePhoto";
import RenderPreview from "src/parts/Details/RenderPreview";
import Footer from "src/parts/Footer";
import { formatThousand } from "src/helpers";

function DetailCourses({ data }) {
    console.log(data);

    const footer = useRef(null)
    const [isSticky, setIsSticky] = useState(true)

    useEffect(() => {
        const stickyOffsetTop = footer.current.getBoundingClientRect().top

        const stickyMetaToggler = () => {
            setIsSticky(stickyOffsetTop >= window.pageYOffset + window.innerHeight)
        }

        window.addEventListener('scroll', stickyMetaToggler)

        return () => {
            window.removeEventListener('scroll', stickyMetaToggler)
        }

    }, [])

    return (
        <>
            <Head>
                <title>LAFTER - </title>
            </Head>

            <section className="pt-10 relative overflow-hidden" style={{ height: 660 }}>
                {
                    data?.chapters?.[0]?.lessons?.[0]?.video &&
                    <div className="video-wrapper">
                        <YouTube
                            videoId={data?.chapters?.[0]?.lessons?.[0]?.video}
                            id={data?.chapters?.[0]?.lessons?.[0]?.video}
                            opts={{
                                playerVars: {
                                    loop: 1,
                                    mute: 1,
                                    autoplay: 0,
                                    controls: 0,
                                    showinfo: 0,
                                }
                            }}
                            onEnd={(event) => {
                                event.target.playVideo()
                            }}
                        >
                        </YouTube>
                    </div>
                }

                <div className="absolute inset-0 z-0 w-full bg-black opacity-75">
                    <div className="meta-title absolute inset-0 object-fill z-0 w-full flex justify-center items-center">
                        <div className="text-center">
                            <h3 className="text-lg text-white">Kelas Online: </h3>
                            <h4 className="text-6xl text-teal-500 font-semibold">{data?.name ?? "Nama Kelas"}</h4>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto z-10 relative">
                    <Header></Header>
                </div>
            </section>

            <section className="container mx-auto pt-24 relative">
                <div className="absolute top-0 w-full transform -translate-y-1/2">
                    <div className="w-3/4 mx-auto">
                        <div className="flex justify-between">
                            <Feature data={{
                                icon: <NameTag className="fill-teal-500" />,
                                meta: "Students",
                                value: data?.total_students ?? "0"
                            }}>
                            </Feature>
                            <Feature data={{
                                icon: <Playback className="fill-teal-500" />,
                                meta: "Videos",
                                value: data?.total_videos ?? "0"
                            }}>
                            </Feature>
                            <Feature data={{
                                icon: <Certificate className="fill-teal-500" />,
                                meta: "Certificate",
                                value: data?.certificate == 1 ? "Tersedia" : "-"
                            }}>
                            </Feature>
                        </div>
                    </div>
                </div>

                <div className="w-3/4 mx-auto mt-8">
                    <div className="w-3/4">
                        <section>
                            <h6 className="font-medium text-gray-900 text-2xl mb-4">About <span className="text-teal-500">Course</span></h6>
                            <p className="text-gray-600 text-lg leading-relaxed mb-3">{data?.description ?? "No description found"}</p>
                        </section>

                        <section className="mt-10">
                            <h6 className="font-medium text-gray-900 text-2xl mb-4">Course <span className="text-teal-500">Photos</span></h6>
                            <div className="flex justify-start items-center -mx-4 mt-6">
                                {
                                    data?.images?.length > 0 ?
                                        data?.images?.map((photo, index) => <CoursePhoto data={photo.image} key={index} />)
                                        : <div className="w-full">No Item Found</div>
                                }
                            </div>
                        </section>

                        <section className="mt-10">
                            <h6 className="font-medium text-gray-900 text-2xl mb-4">You Will <span className="text-teal-500">Learn</span></h6>
                            {
                                data?.chapters?.length > 0 ?
                                    <RenderPreview previews={data.chapters}></RenderPreview>
                                : <div className="w-full text-center py-12">No Chapter Found</div>
                            }
                        </section>
                    </div>
                </div>

                <div>
                    <CSSTransition in={isSticky} timeout={300} className="meta-price" unmountOnExit>
                        <div>
                            <div className="meta-price w-full bg-white z-50 left-0 py-3">
                                <div className="w-3/4 mx-auto">
                                    <div className="flex items-center">
                                        <div className="w-full">
                                            <h2 className="text-gray-600">Nama Kelas</h2>
                                            <h3 className="text-2xl text-gray-900">{data?.name ?? "Nama kelas"}</h3>
                                        </div>
                                        <h5 className="text-2xl text-teal-500 whitespace-nowrap mr-4">
                                            {
                                                data?.type == "free" ? "Free" : "Rp. " + formatThousand(data?.price ?? 0)
                                            }
                                        </h5>
                                        <a href={`${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/joined/${data.id}`} target='_blank' rel='noopener noreferrer' className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 whitespace-nowrap">
                                            {
                                                data?.type == 'free' ? 'Enroll Now' : "Buy Now"
                                            }
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </section>

            <section className="mt-24 bg-indigo-1000 py-12" ref={footer}>
                <Footer></Footer>
            </section>
        </>
    );
}

export async function getServerSideProps(props) {
    const { id } = props.query
    try {
        const data = await courses.detail(id)
        return { props: { data } }
    } catch (error) {
        return error
    }
}

export default DetailCourses;
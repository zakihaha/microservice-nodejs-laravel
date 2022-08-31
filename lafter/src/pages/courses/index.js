import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import courses from "src/constants/api/courses";
import Footer from "src/parts/Footer";
import Header from "src/parts/Header";
import ListCourses from "src/parts/ListCourses";

function Courses({ data }) {
    const [search, setSearch] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const [searchResponse, setSearchResponse] = useState({ isLoading: false, isError: false, data: [] });

    const selectWrapper = useRef(null)

    const clickOutside = (e) => {
        if (selectWrapper.current && !selectWrapper.current.contains(e.target)) {
            setSearch('');
            console.log('outside');
        }
    }

    let timeoutSearch = useRef(null)

    const handleSearch = (e) => {
        e.persist()
        setSearch(e.target.value)
        clearTimeout(timeoutSearch.current)
        timeoutSearch.current = setTimeout(() => {
            setSearchResponse({ isLoading: true, isError: false, data: [] })
            courses.all({ params: { q: e.target.value } }).then(res => {
                console.log(res);
                setSearchResponse({ isLoading: false, isError: false, data: res.data })
            }).catch(err => {
                setSearchResponse({ isLoading: false, isError: true, data: [] })
                console.log(err);
            })
        }, 1000)
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside)
        return () => {
            window.addEventListener("mousedown", clickOutside)
        }
    }, [])

    return (
        <>
            <Head>
                <title>LAFTER - Courses</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="pt-10 z-30 relative" style={{ height: 360 }}>
                <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-75"></div>
                <div className="meta-title absolute bottom-0 object-fill z-0 w-full flex justify-center items-center" style={{ marginBottom: "-25px" }}>
                    <div className="relative">
                        <h3 className="text-6xl text-center text-teal-500 font-semibold">
                            Library
                        </h3>
                        <h4 className="text-lg text-center text-white">
                            Jangan mau kalah update dengan yang lainnya. <br />Yuk ikuti perkembangan teknologi.
                        </h4>
                        <div className="flex flex-col relative" ref={selectWrapper}>
                            <input
                                id="q"
                                onChange={handleSearch}
                                onFocus={() => setSearchFocus(!searchFocus)}
                                onBlur={() => setSearchFocus(!searchFocus)}
                                value={search}
                                placeholder={searchFocus ? "Ketik minimal 3 karakter untuk mencari" : "Lagi cari kelas apa?"}
                                type="text"
                                className="bg-white focus:outline-none transition-all duration-200 focus:border-teal-500 border border-gray-600 px-4 py-3 w-full mt-6"
                                autoComplete="off"
                            />
                            {
                                search.length >= 3 &&
                                <div className="flex flex-col absolute py-2 px-4 bg-white border border-gray-600 w-full z-10" style={{ top: 73 }}>
                                    {
                                        searchResponse.isLoading ? "Loading..." :
                                            <>
                                                {
                                                    searchResponse.isError && "Terjadi kesalahan"
                                                }
                                                {
                                                    searchResponse.data.length > 0 ?
                                                    searchResponse.data?.map((item, index) => { 
                                                        return (
                                                            <div key={index} className="flex items-center -mx-4 py-2 cursor-pointer hover:bg-gray-200 relative">
                                                                <div className="w-auto px-4" style={{ width: 150 }}>
                                                                    <img src={item?.thumbnail ?? ""} alt={item?.name ?? "Course name"} />
                                                                </div>
                                                                <div className="w-full px-4">
                                                                    <h6 className="text-gray-600 text-lg">{item?.name ?? "Course name"}</h6>
                                                                    <p className="text-gray-600">{item?.level ?? "Level"}</p>
                                                                    <Link href="/courses/[id]" as={`/courses/${item.id}`}><a className="link-wrapped"></a></Link>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : "No courses found"
                                                }
                                            </>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const data = await courses.all()
        return { props: { data: data.data } }
    } catch (error) {
        return error
    }
}

export default Courses;
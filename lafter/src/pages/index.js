import Head from 'next/head'
import Link from 'next/link'
import axios from 'src/configs/axios'

import courses from 'src/constants/api/courses'
import Header from 'src/pages/parts/Header.js'
import Hero from 'src/pages/parts/Hero.js'
import Clients from 'src/pages/parts/Clients.js'
import ListCourses from 'src/pages/parts/ListCourses'
import ListCategories from 'src/pages/parts/ListCategories'
import Footer from 'src/pages/parts/Footer'

import Circle from 'public/images/hero-circle.svg'

export default function Home({ data }) {
	console.log(data);
	return (
		<>
			<Head>
				<title>LAFTER</title>
			</Head>

			<main>
				<section className='header-clipping pt-10'>
					<Circle className="absolute left-0 bottom-0"></Circle>
					<div className="sunshine"></div>
					<div className="container mx-auto">
						<Header></Header>
						<Hero></Hero>
					</div>
				</section>
				<section className='container mx-auto pt-24'>
					<Clients></Clients>
				</section>
				<section className="container mx-auto pt-24">
					<ListCourses data={data}></ListCourses>
				</section>
				<section className="container mx-auto pt-24">
					<ListCategories></ListCategories>
				</section>
				<section className="mt-24 bg-indigo-1000 py-12">
					<Footer></Footer>
				</section>
			</main>
		</>
	)
}

Home.getInitialProps = async () => {
	try {
		const data = await courses.all()
		return { data: data.data }
	} catch (error) {
		return error
	}
}
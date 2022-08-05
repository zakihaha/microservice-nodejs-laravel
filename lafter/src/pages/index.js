import Head from 'next/head'
import Link from 'next/link'
import axios from 'src/configs/axios'

import courses from 'src/constants/api/courses'
import Header from 'src/parts/Header.js'
import Hero from 'src/parts/Hero.js'
import Clients from 'src/parts/Clients.js'
import ListCourses from 'src/parts/ListCourses'
import ListCategories from 'src/parts/ListCategories'
import Footer from 'src/parts/Footer'

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

// Home.getInitialProps = async () => {
// 	console.log('getInitialProps');
// 	try {
// 		const data = await courses.all()
// 		return { data: data.data }
// 	} catch (error) {
// 		return error
// 	}
// }

export async function getServerSideProps() {
	try {
		const data = await courses.all()
		return { props: { data: data.data } }
	} catch (error) {
		return error
	}
}
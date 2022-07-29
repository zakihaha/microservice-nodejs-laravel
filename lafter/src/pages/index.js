import Head from 'next/head'
import Link from 'next/link'
import axios from 'src/configs/axios'

import Header from './parts/Header.js'
export default function Home({ data }) {
	return (
		<>
			<Head>
				<title>LAFTER</title>
			</Head>

			<main>
				<section className='header-clipping pt-10'>
					{/* <Circle className="absolute left-0 bottom-0"></Circle> */}
					<div className="sunshine"></div>
					<div className="container mx-auto">
						<Header></Header>
					</div>
				</section>
			</main>
		</>
	)
}

Home.getInitialProps = async () => {
	try {
		const data = await axios.get('/courses')
		return { data: data.data.data }
	} catch (error) {
		return error
	}
}
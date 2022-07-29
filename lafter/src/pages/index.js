import Head from 'next/head'
import Link from 'next/link'

import axios from 'configs/axios'

export default function Home(props) {
	console.log(props);
	return (
		<div className="container mx-auto mt-4">
			<Head>
				<title>LAFTER</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div>Selamat datang di halaman utama</div>
				<Link href="/random"><a>Bring me to Random Page</a></Link>
			</main>
		</div>
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
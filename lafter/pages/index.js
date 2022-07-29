import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
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

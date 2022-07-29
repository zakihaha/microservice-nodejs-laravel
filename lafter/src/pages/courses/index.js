import Head from "next/head";
import Link from "next/link";

function Random({ data }) {
    return (
        <>
            <Head>
                <title>LAFTER - RANDOM</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mt-12 mx-auto">
                <h1 className="text-3xl">Fethcing random words</h1>
                {
                    data.map(todo => {
                        return <li className="border border-indigo-700 p-4" key={todo.id}>{todo?.title ?? "-"} <Link href="/random/[id]" as={`/random/${todo.id}`}><a>Launch</a></Link> </li>
                    })
                }
            </main>
        </>
    );
}

Random.getInitialProps = async () => {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => json)

        return { data }
    } catch (error) {
        console.error(error);
    }
}

export default Random;
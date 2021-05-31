import Link from "next/link";
import Head from "next/head";


export function MainLayout({children, title ="Next App"}) {
    return (
        <>
            <Head>
                <title>{title} | Next course</title>
                <meta name="keywords" content="next, javascript, nextJs, react"/>
                <meta name="description" content="this in my first NextLs app"/>
                <meta charSet="utf-8"/>
            </Head>
            <nav>
                <Link href={"/"}><a>Home</a></Link>
                <Link href={"/posts"}><a>Posts</a></Link>
                <Link href={"/about"}><a>About</a></Link>
            </nav>
            <main>
                {children}
            </main>
{/*            position: fixed;*/}
            <style jsx>{`
            nav {
           
            height: 60px;
            left: 0px:
            top: 0px;
            right: 0px;
            background: blue;
            display: flex;
            justify-content: space-around;
            align-items: center;
                        
            }
            nav a {
            text-decoration: none;
            color: #fff;
            }
            main {
            padding: 10px
            }
            `}</style>
        </>
    )

}

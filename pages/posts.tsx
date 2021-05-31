import Router from "next/router";
import React, {useEffect, useState} from "react";
import Head from "next/head";
import {MainLayout} from "../components/MainLayout";
import {loadGetInitialProps} from "next/dist/next-server/lib/utils";
import Link from "next/link";
import Preloader1 from "../components/Preloader1/Preloader1";


export default function Posts({posts:serverPosts}) {
    const [posts, setPosts] = useState(null)
    const linkClickHandler = () => {
        Router.push("/")
    }

    useEffect(()=>{
        async function load() {
            const response = await fetch("http://localhost:4200/posts")
            const json = await response.json()
            setPosts(json)
        }
        if(!serverPosts){
            load()
        }
    },[])

    if (!posts){
        return<>
            <MainLayout><Preloader1/></MainLayout>
        </>
    }

    return <MainLayout title={"posts"}>
        <h1> Hello Posts</h1>
        <button onClick={linkClickHandler}> go back to home</button>
        <button onClick={() => Router.push("/about")}> go to about</button>
        <div>
            {posts.map(p => {
                return <div key={p.id}>
                    <Link href={`./post/[id]`} as={`./post/${p.id}`}><a>{p.title} </a></Link>
                </div>
            })}
        </div>

    </MainLayout>
}


Posts.getInitialProps = async (ctx) => {
    const {req} = ctx
    if (!req) {
        return {
            posts: null
        }
    }
    const response = await fetch("http://localhost:4200/posts")
    const posts = await response.json()
    return {
        posts
    }
}


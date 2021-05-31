import Router from "next/router";
import React, {useEffect, useState} from "react";
import {MainLayout} from "../components/MainLayout";
import {NextPageContext} from "next/dist/next-server/lib/utils";
import Link from "next/link";
import Preloader1 from "../components/Preloader1/Preloader1";
import {MyPost} from "../interface/post";


interface PostsPropsType {
    posts: Array<MyPost>
}

export default function Posts({posts:serverPosts}:PostsPropsType) {
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


Posts.getInitialProps = async (ctx:NextPageContext) => {
    const {req} = ctx
    if (!req) {
        return {
            posts: null
        }
    }
    const response = await fetch(`${process.env.API_URL}/posts`)
    const posts :Array<MyPost> = await response.json()
    return {
        posts
    }
}


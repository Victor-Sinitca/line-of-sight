import Router, {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import Preloader1 from "../../components/Preloader1/Preloader1";
import React, {useEffect, useState} from "react";
import {NextPageContext} from "next/dist/next-server/lib/utils";
import {MyPost} from "../../interface/post";


interface PostProps {
    post:MyPost
}

export default function Post({post:serverPost}:PostProps) {
    const router = useRouter()
    const [post, setPost]= useState(serverPost)

    const linkClickHandler =()=>{
        Router.push("/posts")
    }


    useEffect(()=>{
        debugger
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts/${router.query.postId}`)
            const data = await response.json()
            setPost(data)
        }
        if(!serverPost){
            load()
        }
    },[])

    if (!post){
        return<>
            <MainLayout><Preloader1/></MainLayout>
        </>
    }
    return <MainLayout title={`Post${router.query.postId}`}>
        <h1>Post {router.query.postId}</h1>
        <div>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
        </div>
        <div>
            <button onClick={linkClickHandler}>go to all posts</button>
        </div>
    </MainLayout>

}
/*Post.getInitialProps = async (ctx) => {
    const {req}=ctx
    const {query}=ctx
    if (!req){
        return {
            post:null
        }
    }
    const response = await fetch(`http://localhost:4200/posts/${query.postId}`)
    const post = await response.json()
    return {
        post
    }
}*/


interface PostNextPageContext extends NextPageContext {
    query: {
        postId:string
    }
}
export async function getServerSideProps(ctx:PostNextPageContext) {
    const {req}=ctx
    const {query}=ctx
    if (!req){
        return {
            props:{post:null}
        }
    }
    const response = await fetch(`${process.env.API_URL}/posts/${query.postId}`)
    const post: MyPost = await response.json()
    return {
        props:{post}
    }

}

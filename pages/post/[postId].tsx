import Router, {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import Preloader1 from "../../components/Preloader1/Preloader1";
import React, {useEffect, useState} from "react";


export default function Post({post1:serverPost}) {
    const router = useRouter()
    const [post, setPost]= useState(null)

    const linkClickHandler =()=>{
        Router.push("/posts")
    }


    useEffect(()=>{
        async function load() {
            const response = await fetch(`http://localhost:4200/posts/${router.query.postId}`)
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
            <hi>{post.title}</hi>
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

export async function getServerSideProps(ctx) {
    const {req}=ctx
    const {query}=ctx
    if (!req){
        return {
            props:{post:null}
        }
    }
    const response = await fetch(`http://localhost:4200/posts/${query.postId}`)
    const post = await response.json()
    return {
        props:{post}
    }

}

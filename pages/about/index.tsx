import React from "react"
import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";


export default function About({title}) {

    const linkClickHandler =()=>{
        Router.push("/")
    }
    debugger


    return <MainLayout title={"about"}>
        <h1> Hello About2222222222</h1>
        <div>
            <hi>{title.title}</hi>
        </div>

        <button onClick={linkClickHandler}> go back to home</button>
        <button onClick={()=>Router.push("/posts")}> go  to posts</button>
    </MainLayout>
}


About.getInitialProps = async (ctx) => {
    const response = await fetch(`http://localhost:4200/about`)
    const title = await response.json()
    debugger
    return {
        title
    }
}

import Link from "next/link";
import React from "react";
import Head from "next/head";
import {MainLayout} from "../components/MainLayout";


export default function Index() {

    return <MainLayout>
        <h1> Hello Index NextJs 99999 </h1>
        <p>
            <Link href="/about">  about </Link>
        </p>
        <p>
            <Link href={'/posts'}>posts </Link>
        </p>
        <p>1111111111111111111111111111</p>

    </MainLayout>
}

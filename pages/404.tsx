import Link from "next/link";
import {MainLayout} from "../components/MainLayout";
import s from "../styles/error.module.css"

export default function ErrorPage() {
    return <MainLayout>
        <h1 className={s.error}>404</h1>
        <h1>Message of error</h1>
        <Link href={"./"}><a>go to home</a></Link>
    </MainLayout>

}

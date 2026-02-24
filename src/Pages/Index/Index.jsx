import './Index.css'
import React from 'react'
import {Link} from "react-router-dom";

export default function Index () {
    return (
        <>
            <div className={'flex gap-[0.3rem] py-[0.8rem] px-[1rem] rounded-md bg-white/10 backdrop-blur-xl items-center justify-center'}>
                <Link className={'text-xl text-white font-semibold'} to={'/login'}>Sign in /</Link>
                <Link className={'text-xl text-white font-semibold'} to={'/register'}>Sign up</Link>
            </div>
        </>
    )
}
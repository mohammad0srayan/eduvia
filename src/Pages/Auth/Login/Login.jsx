import './Login.css'
import React from 'react'
import { useFormik } from "formik";
import {Link} from "react-router-dom";

export default function Login () {

    const form = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.phone = 'Please enter a valid email';
            }

            console.log(errors)
            return errors
        },
    })

    return (
        <>
            <div className={'register'}>
                <form className={'form-register'} onSubmit={form.handleSubmit}>
                    <p className="form-title">برای ورود اطلاعات خود را وارد کنید</p>

                    <main style={{display: "flex", flexDirection: 'column'}} className={'mt-[1rem]'}>
                        <input
                            type="email"
                            name="email"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.email}
                            placeholder="ایمیل"
                        />

                        <input
                            type="password"
                            name="password"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.password}
                            placeholder="رمز عبور"
                        />
                    </main>

                    <div className={''}>
                        <p className={'text-white'}>اکانت برای خود ندارید؟<Link className={'text-blue-500 font-semibold'} to={'/register'}> ثبت نام </Link></p>
                    </div>

                    <button type="submit">ثبت</button>

                    <div className="drops">
                        <div className="drop drop-1"></div>
                        <div className="drop drop-2"></div>
                        <div className="drop drop-3"></div>
                        <div className="drop drop-4"></div>
                        <div className="drop drop-5"></div>
                    </div>
                </form>
            </div>
        </>
    )
}
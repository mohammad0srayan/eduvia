import './Register.css'
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import swal from 'sweetalert'

export default function Register() {


    const navigate = useNavigate()
    const form = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            city: '',
            date: '',
            career: '',
            education: '',
            password: '',
            confirmPassword: ''
        },

        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.phone = 'Please enter a valid email';
            }

            return errors
        },

        onSubmit: async (values) => {
            try {
                const dataToSend = {
                    email: values.email,
                    password: values.password,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    city: values.city,
                    birth_date: values.date,
                    gender: gender === '-1' ? 'other' : gender,
                    role: modeRegister,
                    education: modeRegister === 'teacher' ? values.education : ''
                }

                console.log('📤 ارسال:', dataToSend)

                const response = await fetch('http://localhost:8000/api/auth/register/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataToSend)
                })

                const data = await response.json()

                if (response.ok) {
                    swal({
                        icon: 'success',
                        title: 'ثبت‌نام موفق',
                        buttons: 'ادامه'
                    }).then(() => navigate('/verify-user'))
                } else {
                    swal({
                        icon: 'error',
                        title: 'خطا',
                        text: data.error || 'مشکلی پیش اومد'
                    })
                }
            } catch (error) {
                swal({
                    icon: 'error',
                    title: 'خطا در ارتباط با سرور'
                })
            }
        }
    })

    const [modeRegister, setModeRegister] = useState('student')
    const [isSecurity, setIsSecurity] = useState(false)
    const [gender, setGender] = useState('-1')

    return (
        <>
            <div className={'register'}>
                <form className={'form-register'} onSubmit={form.handleSubmit}>
                    <p className="form-title">لطفا فرم زیر را کامل کنید</p>

                    <div className={'flex justify-between items-center gap-[1rem] px-[4rem] my-[2rem]'}>
                        <span
                            className={`cursor-pointer text-white text-2xl pb-[0.5rem] ${modeRegister === 'teacher' ? 'border-b-[2px] border-white' : ''}`}
                            onClick={() => setModeRegister('teacher')}>معلم</span>
                        <span
                            className={`cursor-pointer text-white text-2xl pb-[0.5rem] ${modeRegister === 'student' ? 'border-b-[2px] border-white' : ''}`}
                            onClick={() => setModeRegister('student')}>دانش آموز</span>
                    </div>

                    <main>
                        <input
                            type="text"
                            name="firstname"
                            value={form.values.firstname}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="نام"
                        />

                        <input
                            type="text"
                            name="lastname"
                            value={form.values.lastname}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="نام خانوادگی"
                        />

                        <input
                            type="email"
                            name="email"
                            value={form.values.email}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="ایمیل"
                        />

                        <input
                            type="text"
                            name="city"
                            value={form.values.city}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="شهر"
                        />

                        <input
                            type="date"
                            name="date"
                            value={form.values.date}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="تاریخ تولد"
                        />

                        <input
                            type="text"
                            name="education"
                            value={form.values.education}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="تحصیلات"
                        />

                        {modeRegister === 'teacher' ? (
                            <>
                                <input
                                    type="text"
                                    name="education"
                                    value={form.values.career}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    placeholder="سابقه کاری"
                                />
                            </>
                        ) : null}

                        <input
                            type="password"
                            name="password"
                            value={form.values.password}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="رمز عبور"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.values.confirmPassword}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="تکرار رمز عبور"
                        />

                    </main>

                    <section>
                        <select
                            name="product"
                            id="selectBox"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                        >
                            <option value={'-1'}>لطفا جنسیت خود را انتخاب کنید</option>
                            <option value={'man'}>مرد</option>
                            <option value={'woman'}>زن</option>
                        </select>

                        <input
                            className={`form-check-input`}
                            type="checkbox"
                            onClick={() => setIsSecurity(!isSecurity)}
                            id="flexCheckDefault"
                            name="check"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            قوانین و مقررات و میپذیرم
                        </label>
                    </section>

                    <div className={'w-full flex justify-end items-end'}>
                        <button className={`form-btn ${isSecurity ? 'cursor-pointer' : 'opacity-[0.5]'}`}
                                disabled={!isSecurity} type="submit">ثبت نام
                        </button>
                    </div>

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
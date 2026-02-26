import './Register.css'
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import swal from 'sweetalert'

export default function Register() {
    const navigate = useNavigate()
    const [modeRegister, setModeRegister] = useState('student')
    const [isSecurity, setIsSecurity] = useState(false)
    const [gender, setGender] = useState('-1')

    const form = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            city: '',
            date: '',
            education: '',      // برای همه (تحصیلات)
            work_experience: '', // فقط برای معلم (سابقه کار)
            password: '',
            confirmPassword: ''
        },

        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = 'ایمیل الزامی است';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'ایمیل نامعتبر است';
            }

            if (!values.password) {
                errors.password = 'رمز عبور الزامی است';
            } else if (values.password.length < 6) {
                errors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
            }

            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'رمز عبور مطابقت ندارد';
            }

            // تحصیلات برای همه اجباریه
            if (!values.education) {
                errors.education = 'تحصیلات الزامی است';
            }

            // سابقه کار فقط برای معلم
            if (modeRegister === 'teacher' && !values.work_experience) {
                errors.work_experience = 'سابقه کار برای معلم الزامی است';
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
                    gender: gender === '-1' ? 'man' : gender,
                    role: modeRegister,
                    education: values.education,  // برای همه فرستاده میشه
                }

                // اگه معلم بود، سابقه کار هم اضافه کن
                if (modeRegister === 'teacher') {
                    dataToSend.work_experience = values.work_experience;
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
                        text: modeRegister === 'teacher' ? 'معلم گرامی خوش آمدید' : 'دانش‌آموز عزیز خوش آمدید',
                        buttons: 'ادامه'
                    }).then(() => navigate('/login'))
                } else {
                    swal({
                        icon: 'error',
                        title: 'خطا',
                        text: data.error || 'مشکلی پیش اومد'
                    })
                }
            } catch (error) {
                console.error('خطا:', error)
                swal({
                    icon: 'error',
                    title: 'خطا در ارتباط با سرور'
                })
            }
        }
    })

    return (
        <div className={'register'}>
            <form className={'form-register'} onSubmit={form.handleSubmit}>
                <p className="form-title">لطفا فرم زیر را کامل کنید</p>

                {/* انتخاب نقش */}
                <div className={'flex justify-between items-center gap-[1rem] px-[4rem] my-[2rem]'}>
                    <span
                        className={`cursor-pointer text-white text-2xl pb-[0.5rem] ${modeRegister === 'teacher' ? 'border-b-[2px] border-white' : ''}`}
                        onClick={() => setModeRegister('teacher')}>معلم</span>
                    <span
                        className={`cursor-pointer text-white text-2xl pb-[0.5rem] ${modeRegister === 'student' ? 'border-b-[2px] border-white' : ''}`}
                        onClick={() => setModeRegister('student')}>دانش آموز</span>
                </div>

                {/* فرم */}
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

                    {/* تحصیلات - برای همه */}
                    <input
                        type="text"
                        name="education"
                        value={form.values.education}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        placeholder="تحصیلات *"
                    />

                    {/* سابقه کار - فقط برای معلم */}
                    {modeRegister === 'teacher' && (
                        <textarea
                            name="work_experience"
                            value={form.values.work_experience}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            placeholder="سابقه کار * (مثال: ۵ سال تدریس ریاضی)"
                            rows="3"
                            style={{width: '100%', padding: '0.5rem', borderRadius: '8px'}}
                        />
                    )}

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

                {/* جنسیت */}
                <section>
                    <select
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                    >
                        <option value={'-1'}>لطفا جنسیت خود را انتخاب کنید</option>
                        <option value={'man'}>مرد</option>
                        <option value={'woman'}>زن</option>
                    </select>

                    {/* قوانین */}
                    <div style={{marginTop: '1rem'}}>
                        <input
                            type="checkbox"
                            onChange={() => setIsSecurity(!isSecurity)}
                            id="flexCheckDefault"
                        />
                        <label htmlFor="flexCheckDefault" style={{color: 'white', marginRight: '0.5rem'}}>
                            قوانین و مقررات را میپذیرم
                        </label>
                    </div>
                </section>

                {/* نمایش خطاها */}
                {Object.keys(form.errors).length > 0 && (
                    <div style={{color: '#ff6b6b', marginTop: '1rem'}}>
                        {Object.values(form.errors).map(err => (
                            <div key={err}>⚠️ {err}</div>
                        ))}
                    </div>
                )}

                {/* دکمه ثبت‌نام */}
                <div className={'w-full flex justify-end items-end'}>
                    <button 
                        className={`form-btn ${isSecurity ? 'cursor-pointer' : 'opacity-[0.5]'}`}
                        disabled={!isSecurity} 
                        type="submit"
                    >
                        ثبت نام
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
    )
}
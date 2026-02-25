import './VerifyOpt.css'

export default function VerifyOpt () {
    return (
        <>
            <div className={'flex flex-col gap-[1rem] justify-center items-center text-white bg-[rgba(28,28,28,0.8)] w-[450px] p-[1rem] rounded-3xl'}>
                <h2 className={'text-xl font-semibold'}>تایید کد</h2>
                <p>کد ارسال شده به mohammadsrayan011@gmail.com</p>

                <form className={'w-max p-[1rem]'}>
                    <div className={'flex flex-col justify-center items-center w-full'}>
                        <input
                            type="text" className={'w-max h-[10px] bg-[rgba(0,0,0,0.4)] p-[1rem] rounded-xl'}
                            placeholder="XXXXXX"
                            maxLength={6}
                        />
                        <div className={'mt-[1rem] w-full flex items-center justify-center'}>
                            <button className={'w-[150px] cursor-pointer bg-green-600 p-[0.5rem] rounded-2xl font-semibold'} type="submit">تایید</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
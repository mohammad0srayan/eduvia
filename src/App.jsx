import './App.css'
import {useRoutes} from "react-router-dom";
import routes from "./Routes.jsx";

export default function App() {

    const router = useRoutes(routes)

    return (
        <>
            <div className="relative min-h-screen overflow-hidden bg-slate-950 flex justify-center items-center">
                <div
                    className="absolute -top-32 -left-32 h-96 w-96 rounded-full
           bg-indigo-500/30 blur-3xl
           animate-[float_3s_ease-in-out_infinite]">
                </div>
                <div
                    className="absolute -top-32 -right-32 h-96 w-96 rounded-full
           bg-indigo-500/30 blur-3xl
           animate-[float_3s_ease-in-out_infinite]">
                </div>

                {router}

                <div
                    className="absolute top-1/2 -left-32 h-96 w-96 rounded-full
           bg-cyan-400/30 blur-3xl
           animate-[float-reverse_4s_ease-in-out_infinite]">
                </div>
                <div
                    className="absolute top-1/2 -right-32 h-96 w-96 rounded-full
           bg-cyan-400/30 blur-3xl
           animate-[float-reverse_4s_ease-in-out_infinite]">
                </div>
            </div>
        </>
    )
}
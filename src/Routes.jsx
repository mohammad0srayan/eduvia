import Index from './Pages/Index/Index.jsx'
import Login from './Pages/Auth/Login/Login.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'
import Register from './Pages/Auth/Register/Register.jsx'
import VerifyOpt from "./Pages/Auth/VerifyOpt/VerifyOpt.jsx"

const routes = [
    {path: '/', element: <Index />},
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: 'verify-user', element: <VerifyOpt />},
    {path: '/*', element: <NotFound />},
]

export default routes;
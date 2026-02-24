import Index from './Pages/Index/Index.jsx'
import Login from './Pages/Auth/Login/Login.jsx'
import Register from './Pages/Auth/Register/Register.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'

const routes = [
    {path: '/', element: <Index />},
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/*', element: <NotFound />},
]

export default routes;
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/Home/Home'
import News from '../pages/News/News'
import DefultError from '../component/Errors/DefultError'
import Downloadcodes from '../pages/auth/Downloadcodes'
import ForgetPassword from '../pages/auth/ForgetPassword'
import VerifybackupCodes from '../pages/auth/VerifybackupCodes'
import VerifyPassRestOPT from '../pages/auth/VerifyPassRestOPT'
import UpdatePassword from '../pages/auth/UpdatePassword'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError /> } />
                    <Route index element={<Home /> } />
                    <Route path='/news' element={<News /> } />

                    <Route path='/registation' element={<Register /> } /> 
                    <Route path='/download-codes' element={<Downloadcodes /> } />
                    
                    <Route path='/login' element={<Login />} />
                    <Route path='/forget-password' element={<ForgetPassword />} />
                    <Route path='/verify-otp' element={<VerifyPassRestOPT /> } />
                    <Route path='/update-password' element={<UpdatePassword /> } />

                    <Route path='/verify-backupcodes' element={<VerifybackupCodes /> } />
                    
                </Route>

                {/* <Route path='/dashboard/' element={<PrivateRoute roles={['admin', 'student']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['admin', 'student']} ><DashError /></PrivateRoute>}/>
                    <Route index element={<PrivateRoute roles={['admin', 'student']} ><DashHome /></PrivateRoute>}/>
                </Route> */}


            </Routes>
        </BrowserRouter>
    )
}

export default App


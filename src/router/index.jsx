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
import DashHome from '../pages/Dashboard/DashHome'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Errors/DashError'
import PrivateRoute from './PrivateRoute'
import Unauthorized from './Unauthorized'
import MyProfile from '../pages/Dashboard/profiles/MyProfile'
import ViewUser from '../pages/Dashboard/superAdmin/plaftfrom/ViewUser'
import CreateUser from '../pages/Dashboard/superAdmin/plaftfrom/CreateUser'
import AuditLogs from '../pages/Dashboard/superAdmin/security/AuditLogs'
import LoginHistory from '../pages/Dashboard/superAdmin/security/LoginHistory'
import UserAuditLog from '../pages/Dashboard/superAdmin/security/UserAuditLog'
import Users from '../pages/Dashboard/superAdmin/plaftfrom/Users'
import Notifications from '../pages/Dashboard/Notifications/Notifications'


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

                <Route path='/dashboard/' element={<PrivateRoute roles={['admin', 'student']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['admin', 'student']} ><DashError /></PrivateRoute>}/>
                    <Route index element={<PrivateRoute roles={['admin', 'student']} ><DashHome /></PrivateRoute>}/>
                    <Route path='my-profile' element={<PrivateRoute roles={['admin', 'student', ]} ><MyProfile /></PrivateRoute>}/>
                    <Route path='notifications' element={<PrivateRoute roles={['admin', 'student', ]} ><Notifications /></PrivateRoute>}/>

                    {/* Admin */}
                    <Route path='platfrom-users' element={<PrivateRoute roles={['admin']} ><Users /></PrivateRoute>}/>
                    <Route path='platfrom-user/:id' element={<PrivateRoute roles={['admin']} ><ViewUser /></PrivateRoute>}/>
                    <Route path='user/create' element={<PrivateRoute roles={['admin']} ><CreateUser /></PrivateRoute>}/>
                    
                    <Route path='security/audit-logs' element={<PrivateRoute roles={['admin']} ><AuditLogs /></PrivateRoute>}/>
                    <Route path='security/login-history' element={<PrivateRoute roles={['admin']} ><LoginHistory /></PrivateRoute>}/>
                    <Route path='security/user-auditlog/:id' element={<PrivateRoute roles={['admin']} ><UserAuditLog /></PrivateRoute>}/>



                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App


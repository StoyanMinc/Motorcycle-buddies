
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import ProtectedLayout from './components/protectedLayout/ProtectedLayout';
import VerifyEmail from './components/verifyEmail/VerifyEmail';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import ChangePassword from './components/change-password/ChangePassword';
import UpdateUser from './components/update-user/UpdateUser';
import AdminPanel from './components/admin-panel/AdminPanel';
import AdminProtectedLayout from './components/protectedLayout/AdminProtectedLayout';

function App() {

    return (
        <div className='w-full h-full'>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/verify-email/:token' element={<VerifyEmail />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />

                <Route element={<ProtectedLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/change-password' element={<ChangePassword />} />
                    <Route path='/update-user' element={<UpdateUser />} />
                </Route>

                <Route element={<AdminProtectedLayout />}>
                    <Route path='/admin-panel' element={<AdminPanel />} />
                </Route>

            </Routes>
        </div>
    )
}

export default App

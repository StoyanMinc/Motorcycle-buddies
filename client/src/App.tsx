
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ProtectedLayout from './components/protectedLayout/ProtectedLayout';
import VerifyEmail from './components/verifyEmail/VerifyEmail';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import ChangePassword from './components/change-password/ChangePassword';
import UpdateUser from './components/update-user/UpdateUser';
import AdminPanel from './components/admin-panel/AdminPanel';
import AdminProtectedLayout from './components/protectedLayout/AdminProtectedLayout';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Settings from './components/settings/Settings';
import Motorcycles from './components/motorcycles/Motorcycles';
import CreateMotorcycle from './components/add-motorcycle/AddMotorcycle';
import UpdateMotorcycle from './components/update-motorcycle/UpdateMotorcycle';
import Maintenance from './components/maintenance/Maintencance';
import Trips from './components/trips/Trips';
import AddTrip from './components/add-trip/AddTrip';
import TripList from './components/trip-list/TripList';
import EditTrip from './components/edit-trip/EditTrip';

console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_SERVER_URL);
function App() {
    return (
        <div className='w-full h-full flex flex-col'>
            <Toaster />
            <Navigation />
            <div className="flex min-h-screen flex-col w-full bg-gray-100 pt-[70px]">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/verify-email/:token' element={<VerifyEmail />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token' element={<ResetPassword />} />

                    <Route element={<ProtectedLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/change-password' element={<ChangePassword />} />
                        <Route path='/update-user' element={<UpdateUser />} />
                        <Route path='/motorcycles' element={<Motorcycles />} />
                        <Route path='/motorcycles/add' element={<CreateMotorcycle />} />
                        <Route path='/motorcycles/update/:motorcycleId' element={<UpdateMotorcycle />} />
                        <Route path='/maintenance' element={<Maintenance />} />
                        <Route path='/trips' element={<Trips />} />
                        <Route path='/trips-list' element={<TripList />} />
                        <Route path='/trips/add' element={<AddTrip />} />
                        <Route path='/trips/edit/:id' element={<EditTrip />} />
                    </Route>

                    <Route element={<AdminProtectedLayout />}>
                        <Route path='/admin-panel' element={<AdminPanel />} />
                    </Route>

                </Routes>
            </div>
        </div>
    )
}

export default App

import { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logout from '../pages/Logout';
import AdminApplications from '../pages/admin/Applications';
import Schools from '../pages/admin/schools/Schools';
import EditShool from '../pages/admin/schools/EditSchool';
import NewSchool from '../pages/admin/schools/NewSchool';
import Applications from '../pages/Applications';
import StudentApplication from '../pages/loggin/Orders';
import ApplicationsInfo from '../pages/admin/ApplicationsInfo';
import NotFound from "../components/NotFound/NotFound";


const App = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if (token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    const logoutUser = () => {
        setUser({
            loggedIn: false
        })
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                {!user.loggedIn && <Route path="/login" element={<Login setUser={setUser} />} />}
                {!user.loggedIn && <Route path="/register" element={<Register />} />}
                {user.loggedIn && user.role == '0' && (
                    <>
                        <Route path="/admin/applications" element={<AdminApplications />} />
                        <Route path="/admin/schools" element={<Schools />} />
                        <Route path="/admin/schools/new" element={<NewSchool />} />
                        <Route path="/admin/ApplicationsInfo/register/:id" element={<ApplicationsInfo />} />
                        <Route path="/admin/schools/edit/:id" element={<EditShool />} />
                    </>
                )}
                {user.loggedIn && (
                    <>
                        <Route path="/applications" element={<Applications />} />
                        <Route path="/student/order" element={<StudentApplication />} />
                    </>
                )}
                <Route path="/logout" element={<Logout logoutUser={logoutUser} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
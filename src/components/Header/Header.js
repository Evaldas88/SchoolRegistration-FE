import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


const Header = () => {
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

    return (
        <header className="navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
                <div className=" "></div>
                <nav>
                    <ul >
                        <li ><Link className='text-white h4 text-center' to="/">Home</Link></li>
                        {!user.loggedIn && (
                            <>
                                <li><Link className='text-white h4' to="/login">Login</Link></li>
                                <li><Link className='text-white h4' to="/register">Registration</Link></li>
                            </>
                        )}
                        {user.loggedIn && (
                            <>
                                <li><Link className='text-white h4' to="/applications">Applications</Link></li>
                                <li><Link className='text-white h4' to="/logout">Logout</Link></li>
                            </>
                        )}
                        {user.loggedIn && user.role === '0' && (
                            <>
                                <li>
                                    <Link className='text-white h4' to="/admin/applications">Admin</Link>
                                    <ul class="dropdown-menu">
                                        <li><Link className='' to="/admin/applications">Applications</Link></li>
                                        <li><Link className='' to="/admin/schools">Schools</Link></li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
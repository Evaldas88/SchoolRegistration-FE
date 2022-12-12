import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header/Header'
import Message from '../components/message/Message'
import { useNavigate } from 'react-router-dom'
// import Footer from '../components/footer/Footer'

const Login = ({setUser}) => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(false)
        const token = localStorage.getItem('token')

        if(token) {
            navigate('/')
        }
    }, [navigate])

    const handleFormChange = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/login', loginForm)
        .then(resp => {
            setLoading(false)
            if(resp.status === 200) {
                localStorage.setItem('token', resp.data.message.token)
                localStorage.setItem('user_role', resp.data.message.role)
                setUser({
                    loggedIn: true,
                    token: resp.data.message.token,
                    role: resp.data.message.role
                })
                navigate('/')
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }
 
    return (
        <>
            {loading && ( <div className="loading">Loading...</div> )}
            <Header />
            <div className='container'>
            <main className="text-center loginForm">
                <div className="form-signin w-100 m-auto">
                    <h1 className="h2 mb-3 fw-normal text-light">Login</h1>
                    <Message value={message} />
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="email" onChange={handleFormChange} placeholder="name@example.com" />
                            <label>Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control mt-3" name="password" onChange={handleFormChange} placeholder="password" />
                            <label>Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
                    </form> 
                </div>
            </main>
            {/* <Footer/> */}
            </div>
        </>
    )
}

export default Login
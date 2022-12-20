import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header/Header'
import Message from '../components/message/Message'
import { useNavigate } from 'react-router-dom'
// import Footer from '../components/footer/Footer'

const Login = ({ setUser }) => {
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

        if (token) {
            navigate('/')
        }
    }, [navigate])

    const handleFormChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/login', loginForm)
            .then(resp => {
                setLoading(false)
                if (resp.status === 200) {
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
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Serveris miręs', status: 'danger' })
            })
    }

    return (
        <>
            {loading && (<div className="loading">Loading...</div>)}
            <Header />
            <div className='container'>
                <div className="mx-auto  my-5 col-6 d-flex aligns-items-center justify-content-center">
                    <div className="card w-50">
                        <div className="card-body" >
                            <h1 className="h3 mb-3 fw-normal">Login</h1>
                            <Message value={message} />
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-group d-grid gap-2">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" onChange={handleFormChange} placeholder="name@example.com" />
                                    <label>Password</label>
                                    <input type="password" className="form-control mt-1" name="password" onChange={handleFormChange} placeholder="password" />
                                </div>
                                <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Prisijungti</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <Footer/> */}

            </div>

        </>
    )
}

export default Login
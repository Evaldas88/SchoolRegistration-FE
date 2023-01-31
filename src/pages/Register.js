import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header/Header'
import Message from '../components/message/Message'
 
const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
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
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/register', registerForm)
            .then(resp => {
                if (resp.status === 200) {
                    localStorage.setItem('token', resp.data.message.token)
                    localStorage.setItem('user_role', resp.data.message.role)
                    setLoading(false)
                    navigate('/')
                }
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'The server is dead', status: 'danger' })
            })
    }

    return (
        <>
            {loading && (<div className="loading">Loading...</div>)}
            <Header />
            <div className="d-flex aligns-items-center justify-content-center">
                <div className="card w-25">
                    <div className="card-header ">Registration

                        <div className="card-body">
                            <Message value={message} />
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-label mt-2">
                                    <label >Name</label>
                                    <input type="text" className="form-control mt-1" name="name" onChange={handleFormChange} placeholder="Your name" value={registerForm.name} />
                                </div>
                                <div className="form-label mt-2">
                                    <label>Email</label>
                                    <input type="email" className="form-control mt-1" name="email" onChange={handleFormChange} placeholder="name@example.com" value={registerForm.email} />
                                </div>
                                <div className="form-label mt-2">
                                    <label>Password</label>
                                    <input type="password" className="form-control mt-1" name="password" onChange={handleFormChange} placeholder="Password" value={registerForm.password} />
                                </div>
                                <button className="w-100 btn-lg btn btn-dark mt-3" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </>
    )
}

export default Register
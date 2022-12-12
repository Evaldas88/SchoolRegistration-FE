import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header/Header'
import Message from '../components/message/Message'
// import Footer from '../components/footer/Footer'

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
        if(token) {
            navigate('/')
        } 
    }, [navigate])

    const handleFormChange = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/register', registerForm)
        .then(resp => {
            if(resp.status === 200) {
                localStorage.setItem('token', resp.data.message.token)
                localStorage.setItem('user_role', resp.data.message.role)
                setLoading(false)
                navigate('/')
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'The server is dead', status: 'danger'})
        })
    }
 
    return (
        <>
            {loading && ( <div className="loading">Loading...</div> )}
            <Header />
            <main className="text-center registerForm">
                <div className="form-signin w-100 m-auto">
                    <h1 className="h2 mb-3 fw-normal text-light">Registration</h1>
                    <Message value={message} />
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="name" onChange={handleFormChange} placeholder="Jūsų vardas" value={registerForm.name} />
                            <label >Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="email" onChange={handleFormChange} placeholder="name@example.com" value={registerForm.email} />
                            <label>Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" name="password" onChange={handleFormChange} placeholder="Slaptažodis" value={registerForm.password} />
                            <label>Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    </form> 
                </div>
            </main>
            {/* <Footer/> */}
        </>
    )
}

export default Register
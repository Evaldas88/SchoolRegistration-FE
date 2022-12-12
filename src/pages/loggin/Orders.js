import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/Header/Header'
import Message from '../../components/message/Message'
// import Footer from '../../components/footer/Footer'

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        surname: '',
        student_id: '',
        student_bd: '',
        class: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    


    // useEffect(() => {
    //     setLoading(false)
    //     const token = localStorage.getItem('token')
    //     if(token) {
    //         navigate('/')
    //     } 
    // }, [navigate])

    const handleFormChange = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://127.0.0.1:8000/api/student/register', registerForm, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
        }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Mokykla sėkmingai išssaugota', status: 'success'})
                setTimeout(() => navigate('/'), 2000)
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
             <Header />
            <main className="text-center registerForm">
                <div className="form-signin w-100 m-auto">
                    <h1 className="h2 mb-3 fw-normal text-light">Student registration</h1>
                    <Message value={message} />
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="name" onChange={handleFormChange} placeholder="Mokinio vardas" value={registerForm.name} />
                            <label >Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="surname" onChange={handleFormChange} placeholder="Mokinio pavardė" value={registerForm.surname} />
                            <label >Surname</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="student_id" onChange={handleFormChange} placeholder="Asmens kodas" value={registerForm.email} />
                            <label>Personal code</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" name="student_bd" onChange={handleFormChange} placeholder="Gimimo data" value={registerForm.password} />
                            <label>Date of birth</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" name="student_bd" onChange={handleFormChange} placeholder="Klasė" value={registerForm.password} />
                            <label>Which grade will the student be in?</label>
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
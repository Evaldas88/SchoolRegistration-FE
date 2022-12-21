import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const NewHotel = () => {
    const [form, setForm] = useState({
        name: '',
        code: '',
        image: '',
        city: '',
        address: '',
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [shools, setSchools] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
        
            setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoading(true)

        axios.get('http://127.0.0.1:8000/api/schools')
        .then(resp => {
            setLoading(false)
            setSchools(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Sever is dead', status: 'danger'})
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('http://127.0.0.1:8000/api/schools', formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'School saved', status: 'success'})
                setTimeout(() => navigate('/admin/schools'), 2000)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Sever is dead', status: 'danger'})
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container  w-25 ">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>New school</h2>
                    </div>
                </div>
                <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group mt-2">
                        <label>School name:</label> 
                        <input type="text" name="name" className="form-control mt-1" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Code:</label>
                        <input type="number" name="code" className="form-control  mt-1" onChange={handleFormChange} value={form.price} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Town:</label>
                        <input type="text" name="city" className="form-control  mt-1" onChange={handleFormChange} value={form.travel_duration} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Address</label>
                        <input type="text" name="address" className="form-control  mt-1" onChange={handleFormChange} value={form.travel_duration} />
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewHotel
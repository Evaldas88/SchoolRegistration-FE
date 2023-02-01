import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const EditSchool = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        code: '',
        city: '',
        address: '',
        image: '',
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/schools/' + id)
        .then(resp => {
            setLoading(false)
            setForm({
                name: resp.data.message[0].name,
                code: resp.data.message[0].code,
                city: resp.data.message[0].city,
                address: resp.data.message[0].address,
                image: resp.data.message[0].image,
            })
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('http://127.0.0.1:8000/api/schools/' + id, formData, {
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
                setMessage({text: 'Server is dead', status: 'danger'})
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container w-25">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Edit school</h2>
                    </div>
                </div>
                <Message value={message} />
                <form className="mt-3" onSubmit={handleFormSubmit}>
                    <div className="form-group mt-2">
                        <label>School name:</label>
                        <input type="text" name="name" className="form-control  mt-1" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Photo:</label>
                        <input type="text" name="image" className="form-control  mt-1" onChange={handleFormChange} value={form.image} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Code:</label>
                        <input type="number" name="code" className="form-control  mt-1" onChange={handleFormChange} value={form.code} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Town:</label>
                        <input type="text" name="city" className="form-control  mt-1" onChange={handleFormChange} value={form.city} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Address:</label>
                        <input type="text" name="address" className="form-control mt-1" onChange={handleFormChange} value={form.address} />
                    </div>
                    <div className="form-group  mt-2">
                        <button type="submit" className="btn btn-primary  mt-3">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditSchool
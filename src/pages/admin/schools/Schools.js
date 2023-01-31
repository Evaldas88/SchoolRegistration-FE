import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const Schools = () => {
    const [schools, setSchools] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/schools', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(false)
                setSchools(resp.data.message)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server is dead', status: 'danger' })
            })
    }, [reload])

    const handleDelete = (id) => {
        // console.log(id)
        setLoading(true)
        axios.delete('http://127.0.0.1:8000/api/schools/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((resp) => {
                setLoading(false)
                setReload(true)
                setMessage({ text: resp.data.message, status: 'success' })
                setTimeout(() => setMessage({ text: '', status: '' }), 5000)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server is dead', status: 'danger' })
            })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12 d-flex">
                        <h2>Schools</h2>
                        <Link to="/admin/schools/new" className="btn btn-success mx-4">New school</Link>
                    </div>
                </div>
                <Message value={message} />
                {schools.length > 0 ? (
                    <table className="table bg-light table-bordered align-middle text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Town</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map(school => (
                                <tr key={school.id}>
                                    <td className="text-center">{school.id}</td>
                                    <td  ><img src={school.image} alt={school.name} style={{ width: "6rem" }}  className=""/></td>
                                    <td>{school.name}</td>
                                    <td>{school.code}</td>
                                    <td>{school.city}</td>
                                    <td>{school.address}</td>
                                    <td>

                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(school.id)}>Delete</button>
                                        <Link to={'/admin/schools/edit/' + school.id} className="btn btn-primary">Edit</Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">No requests received</h5>}
            </div>
        </>
    )
}

export default Schools
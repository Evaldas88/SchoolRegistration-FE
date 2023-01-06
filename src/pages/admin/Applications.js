import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const Appli = () => {
    const navigate = useNavigate();

    const [applis, setApplis] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/applications/all', {
            "Accept": 'application/json',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(false)
                setApplis(resp.data.message)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'The server is dead', status: 'danger' })
             })
    }, [reload])

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete('http://127.0.0.1:8000/api/applications/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(true)
                setMessage({ text: resp.data.message, status: 'success' })
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'The server is dead', status: 'danger' })
            })
    }

    const handleStatus = (id) => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/applications/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setReload(true)
                setLoading(false)
                setMessage({ text: resp.data.message, status: 'success' })
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'The server is dead', status: 'danger' })
             })
    }
    const handleDetails = (id) => {
        setLoading(true)
        navigate('/admin/ApplicationsInfo/register/' + id )
}



    return (
        <>
            <Header />
            {loading && (<div className="loading">Kraunasi...</div>)}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h2>Requests received</h2>
                    </div>
                </div>
                <Message value={message} />
                {applis.length > 0 ? (
                    <table className="table bg-light table-bordered text-center">
                        <thead>
                            <tr>
                                <th>Educational institution name</th>
                                 <th>Address</th>
                                <th>City</th>
                                 <th>Student Surname</th>
                                 <th>Student Birthday</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applis.map(appli => (
                                <tr key={appli.id}>
                                    <td>{appli.school_name}</td>
                                     <td>{appli.address}</td>
                                    <td>{appli.city}</td>
                                     <td>{appli.surname}</td>
                                     <td>{appli.student_bd}</td>
                                    <td>{appli.approved === 0 ? 'Unverified' : 'Verified'}</td>
                                    <td>
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(appli.id)}>Delete</button>
                                        <button className="btn btn-success  me-2" onClick={() => handleStatus(appli.id)}>
                                            {appli.approved === 0 ? 'Confirm' : 'Reject'}
                                        </button>
                                        <button className="btn btn-warning" onClick={() => handleDetails(appli.id)}>Student detail</button>
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

export default Appli
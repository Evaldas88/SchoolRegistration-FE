import { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Message from '../components/message/Message'
import axios from 'axios'

const Applis = () => {
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
        axios.get('http://127.0.0.1:8000/api/applications/', {
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
                    setMessage({ text: 'Server is dead', status: 'danger' })
            })
    }, [reload])


    const handleDelete = (id) => {
        setLoading(true)
        axios.delete('http://127.0.0.1:8000/api/applicationS/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(true)
                setMessage({ text: resp.data.message, status: 'success' })
                setTimeout(() => setMessage(''), 2000)
                setApplis([])
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
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h2>Applications submitted</h2>
                    </div>
                </div>
                <Message value={message} />
                {applis.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>School</th>
                                <th>Class</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applis.map(appli => (
                                <tr key={appli.id}>
                                    <td>{appli.name}</td>
                                    <td>{appli.surname}</td>
                                    <td>{appli.school_name}</td>
                                    <td>{appli.class}</td>
                                    <td>{appli.approved === 0 ? 'Not approved' : 'Approved'}</td>
                                    <td>
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(appli.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">No applications received</h5>}
            </div>
        </>
    )
}

export default Applis
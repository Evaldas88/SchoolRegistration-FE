import { useState } from 'react'
import SchoolCard from '../SchoolCard/SchoolCard.js'
import Message from '../message/Message'
import axios from 'axios'

 
const SchoolList = (props) => {
    const schools = props.schools
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })

    const handleOrder = (id) => {
        setLoading(true)

        axios.post('http://127.0.0.1:8000/api/applications', {
            school_id: id
        }, 
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'You have successfully registered.', status: 'success'})
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

    return loading ? ( <div className="loading">Loading...</div> ) : (
        <>
            <Message value={message} />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {schools.map(school => <SchoolCard key={school.id} data={school} handleOrder={handleOrder} />)}
            </div>
        </>
    )
}

export default SchoolList
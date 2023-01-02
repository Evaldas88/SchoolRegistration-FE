import { useState } from 'react'
import SchoolCard from '../SchoolCard/SchoolCard.js'
import Message from '../message/Message'
 import { useNavigate } from 'react-router-dom'


const SchoolList = (props) => {
    const schools = props.schools
    const navigate = useNavigate()
    // const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })

    const handleOrder = (id) => {
        setLoading(true)
        localStorage.setItem('id', id)
        navigate('/student/order')
    }

    return loading ? (<div className="loading">Loading...</div>) : (
        <>
            <Message value={message} />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {schools.map(school => <SchoolCard key={school.id} data={school} handleOrder={handleOrder} />)}
            </div>
            
        </>
    )
}

export default SchoolList
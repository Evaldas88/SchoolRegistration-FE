import Header from '../components/Header/Header'
import SchoolList from '../components/SchoolList/SchoolList'
import Message from '../components/message/Message'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import Footer from '../components/footer/Footer'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [schools, setSchools] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })

    useEffect(() => {
         setLoading(true)
        axios.get('http://127.0.0.1:8000/api/schools')
        .then(resp => {
            setLoading(false)
            if(resp.data.success) {
                setSchools(resp.data.message)
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server error', status: 'danger'})
        })
    }, [])

    return (
        <>
            <Header />
            {loading && ( <div className="loading">Loading...</div> )}
            <div className="container">
                <Message value={message} />
                {schools ? <SchoolList schools={schools} /> : (
                    <h2>No schools list</h2>
                )}
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Home
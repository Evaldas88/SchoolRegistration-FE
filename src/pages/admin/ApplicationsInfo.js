import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import axios from 'axios'

const Appli = () => {
    const { id } = useParams();
    const [applis, setApplis] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    var today = new Date()


    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/applicationsS/' + id
            , {
                "Accept": 'application/json',
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then(resp => {
                setLoading(false)
                setReload(false)
                setApplis(resp.data.message)
                // console.log(resp.data)

            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Serveris miręs', status: 'danger' })
            })
    }, [reload])

    const back = () => {
        setLoading(true)
        navigate('/admin/Applications')
    }



    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div>
                    <h3 className='text-dark'>Student Registration Information</h3>
                </div>
                <table className="table bg-white table-bordered mt-5">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Birthday</th>
                            <th>Personal code</th>
                            <th>Age</th>
                            <th>Will attend class</th>
                            <th>The person registering</th>
                            <th>Date of registration</th>
                            <th>Time of registrations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applis.map((appli, index) => (
                            <tr key={index}>
                                <td>{appli.name}</td>
                                <td>{appli.surname}</td>
                                <td>{appli.student_bd}</td>
                                <td>{appli.student_id}</td>
                                <td>{appli.student_bd != null ? today.getFullYear() - appli.student_bd.substring(0, 4) : 'Fail'}</td>
                                <td>{appli.class}</td>
                                <td>{appli.user_name}</td>
                                <td>{appli.created_at.substring(0, 10)}</td>
                                <td>{appli.created_at.substring(11, 16)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button className="btn btn-dark m-2 float-end " onClick={() => back()}>Back</button>
                </div>
            </div>


        </>
    )
}

export default Appli
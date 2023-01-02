import Header from '../components/Header/Header'
import SchoolList from '../components/SchoolList/SchoolList'
import Message from '../components/message/Message'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import Footer from '../components/footer/Footer'

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [schools, setSchools] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const url = 'http://127.0.0.1:8000/api/search/'
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/schools')
            .then(resp => {
                setLoading(false)
                if (resp.data.success) {
                    setSchools(resp.data.message)
                }
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'Server error', status: 'danger' })
            })
    }, [])



    const searchSchool = (event) => {
        event.preventDefault();
        let item = event.target.name.value;
        console.log(item)
        let searchUrl = url + item;

        fetch(searchUrl)
            .then((res) => res.json())
            .then(
                (res) => {
                    setItems( res);
                    setLoading(true);
                    console.log(res)

                },
                (err) => {
                    setError(err);
                    console.log(err)
                    setLoading(true);
                }
            );
    }
    return (
        <>
            <Header />
            {loading && (<div>Loading...</div>)}
            <div className="container">
                <div className="float-end">
                    <form className="float-end" onSubmit={(e) => searchSchool(e)}>
                        <label>Search school:</label>
                        <div className="d-flex">
                            <input className="form-control" name="name"></input>
                            <button className="btn border">Search</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm d-flex align-items-center justify-content-center flex-wrap p-3 ">
                    {items.map((school, index) => (
                        <div className="card-body flex-fill mb-5 mx-4 mt-3 bg-light p-4 rounded"
                            key={school.id}>
                            <div className="d-flex j ustify-content-between mt-3 text-align">
                                <h4 className="card-title mx-3">{school.name}</h4>
                                <p className="card-title mx-3 fst-italic">{school.city}</p>
                                <p className="card-title mx-3 fst-italic">{school.address}</p>
                                <p className="card-title mx-3 fst-italic">{school.code}</p>
                            </div>
                            <div className="d-flex justify-content-between"></div>
                        </div>
                    ))}
                </div>
                <Message value={message} />
                {schools ? <SchoolList schools={schools} />
                    : (
                        <h2>No schools list</h2>
                    )}
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default Home
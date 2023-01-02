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

    let [showSearchResults, setShowSearchResults] = useState(false)

    const searchSchool = (event) => {
        event.preventDefault();
        setShowSearchResults(!showSearchResults)
        let item = event.target.name.value;
        console.log(item)
        let searchUrl = url + item;

        fetch(searchUrl)
            .then((res) => res.json())
            .then(
                (res) => {
                    setItems(res);
                    setLoading(false);
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
                <Message value={message} />
                {!showSearchResults ?
                    <div>
                        {schools ? <SchoolList schools={schools} />
                            : (
                                <h2>No schools list</h2>
                            )}
                    </div>
                    :
                    <div>
                        {items ? <SchoolList schools={items} />
                            : (
                                <h2>No schools list</h2>
                            )}
                    </div>
                   }
            </div>

            {/* <Footer/> */}
        </>
    )
}

export default Home
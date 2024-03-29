import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



const SchoolCard = (props) => {
    const { data, handleOrder } = props
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if (token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    return (
        <div className="container text-center mt-5">
            <div className=" card col-lg-8 mx-auto">
                <div className="  d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <div className=" d-flex flex-wrap gap-4 " >
                        <div className="card-body ">
                            <h4 className="card-title text-center">  {data.name} </h4>
                            {data.image && (
                                <div className="">
                                    <img src={data.image} alt={data.name} className="img-thumbnail" style={{ height: "8rem" }} />
                                </div>
                            )}
                            <h5 className="card-title mt-3">City<p> {data.city} </p></h5>
                            <h5 className="card-title mt-2">Address<p>{data.address}</p></h5>
                            {user.loggedIn && user.role === '1' && (
                                <>
                                    <div className="mt-2">
                                        <button className="btn btn-success" onClick={() => handleOrder(data.id)}><Link className='h5 text-info' to="/student/order">Schools</Link></button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SchoolCard
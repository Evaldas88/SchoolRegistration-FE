import React from 'react';
import MyImage from '../photo/404.png'
import { useNavigate} from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    const back = () => {
         navigate('/')
    }

return (
  <div className="height-min mt-5">
    <div className="container text-center mt-5">
      <img src={MyImage} alt='Error' className='error' />
     
    </div>
    <button className="btn-lg btn btn-dark mt-5" onClick={() => back()}>GO TO HOMEPAGE</button>
  </div>
)
};


export default NotFound;
import React from 'react';
import './Footer.css'

const Footer = () => (
         <footer className="container text-center ">
            <div >
                <section >
                    <a
                        className="btn btn-sm btn-dark btn-floating me-1"
                        href="https://github.com/Evaldas88" 
                        role="button"
                    >
                        <i className="bi bi-github"></i>
                    </a>
                    <a
                        className="btn btn-sm btn-dark btn-floating"
                        href="https://www.linkedin.com/in/evaldas-skackauskas/"
                        role="button"
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>
                </section>
            </div>
            <div className='text-center' >
                &copy; {new Date().getFullYear()} Copyright: Evaldas88
            </div>
        </footer>
 );


export default Footer;
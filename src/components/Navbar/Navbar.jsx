import React, { useContext } from 'react'
import '../Navbar/navbar.css'
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
// import ModalLogin from '../ModalLogin/ModalLogin';
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext';
import { asset } from '../../assets/asset';


const Navbar = ({ setShowLogin }) => {


    const { token, logout } = useContext(AdminContext);

    const navigate = useNavigate();



    return (

        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand" href="/">
                        <img src={asset.profile} alt="" height="60" width="60" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <form className="d-flex" role="search" id='search'>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit"><CiSearch /></button>
                            </form>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Services
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/aromatic" className="dropdown-item">Aromatic</Link>
                                    </li>
                                    <li>
                                        <Link to="/dustbin" className="dropdown-item">Dustbin</Link>
                                    </li>
                                    <li>
                                        <Link to="/cleaning" className="dropdown-item">Cleaning</Link>
                                    </li>
                                    <li>
                                        <Link to="/other-appliances" className="dropdown-item">Other Appliances</Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/About">About Us</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/Contact">Blog</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/Contact">Contact Us</a>
                            </li>

                            <li className="nav-item">
                                {!token ? <button type="button" className="btn btn-primary" onClick={() => setShowLogin(true)} >
                                    Sign in
                                </button> :
                                    <div className="profile-image">
                                        <FaUserCircle className='profile-icon' />
                                        <ul className="nav-profile-dropdown">
                                            <li className='dropdown-sec' onClick={() => navigate("/myorders")}>
                                                <FaShoppingBag className='drop-icon' />
                                                <p className='sec-text'>Orders</p>
                                            </li>
                                            <li className='dropdown-sec' onClick={logout}>
                                                <IoIosLogOut className='drop-icon' />
                                                <p className='sec-text'>Logout</p>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar

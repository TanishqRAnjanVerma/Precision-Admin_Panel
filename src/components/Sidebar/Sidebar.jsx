import React from 'react'
import '../Sidebar/sidebar.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { asset } from '../../assets/asset';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                    <IoIosAddCircleOutline className="order-icon" />
                    <p className='sidebar-title'>Add items</p>
                </NavLink>

                <NavLink to="/list" className="sidebar-option">
                    <img className="order-icon" src={asset.order_icon} alt='' />
                    <p className='sidebar-title'>List items</p>
                </NavLink>

                <NavLink to="/orders" className="sidebar-option">
                    <img className="order-icon" src={asset.order_icon} alt='' />
                    <p className='sidebar-title'>Orders</p>
                </NavLink>

                <NavLink to="/admincreateblog" className="sidebar-option">
                    <img className="order-icon" src={asset.order_icon} alt='' />
                    <p className='sidebar-title'>Admin-Create-Blog</p>
                </NavLink>

                <NavLink to="/adminbloglist" className="sidebar-option">
                    <img className="order-icon" src={asset.order_icon} alt='' />
                    <p className='sidebar-title'>Admin-Blog-Items</p>
                </NavLink>
            </div>

        </div>
    )
}

export default Sidebar

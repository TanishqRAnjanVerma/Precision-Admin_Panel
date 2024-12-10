import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Orders/orders.css';
import { PiCurrencyInrBold } from "react-icons/pi";
import { toast } from 'react-toastify';
import { asset } from '../../assets/asset';


const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        }
        else {
            toast.error("Error");
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        });
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();

    }, [])

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img className='parcel-img' src={asset.parcel} alt="" />

                        <div className='order-item-display'>
                            <p className="order-item-product">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + "x" + item.quantity

                                    }
                                    else {
                                        return item.name + "x" + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName + "" + order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>{order.address.street + ", "}</p>
                                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.pincode}</p>
                            </div>
                            <p className="order-item-phone">
                                {order.address.mobile}
                            </p>
                        </div>
                        <p className='items'>Items : {order.items.length}</p>
                        <p className='amount'><PiCurrencyInrBold />{order.amount}</p>
                        <select className='select-status' onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Product Processing">Product Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Order Delivered">Order Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders

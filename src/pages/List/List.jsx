import React, { useState, useEffect } from "react";
import "../List/list.css"
import axios from "axios";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/precision/list`);


        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const removeProduct = async (productId) => {
        const response = await axios.post(`${url}/api/precision/remove`, { id: productId });
        await fetchList();

        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error("Error");
        }
    }

    return (
        <div className="list add flex-col">
            <p>All Product List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>


                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt="" className="table-img" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p><MdOutlineCurrencyRupee />{item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className="remove"><IoIosCloseCircleOutline /></p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default List;

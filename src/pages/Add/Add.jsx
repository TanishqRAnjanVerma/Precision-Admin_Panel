import React, { useState } from "react";
import "../Add/add.css";
import axios from 'axios'
import { asset } from "../../assets/asset";
import { toast } from "react-toastify";

const Add = ({ url }) => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        desc_1: "",
        desc_2: "",
        price: "",
        category: "Industrial",
    });

    const onChangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmithandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("desc_1", data.desc_1);
        formData.append("desc_2", data.desc_2);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/precision/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                desc_1: "",
                desc_2: "",
                price: "",
                category: "Aromatic",
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className="add">
            <form className="add-form flex-col" onSubmit={onSubmithandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image" className="label-upload">
                        <img
                            className="upload"
                            src={image ? URL.createObjectURL(image) : asset.upload}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                <div className="add-product-name">
                    <p>Product Name</p>
                    <input
                        onChange={onChangehandler}
                        value={data.name}
                        className="p-input"
                        type="text"
                        name="name"
                        id=""
                        placeholder="Type here"
                    />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangehandler}
                        value={data.desc_1}
                        className="d-input"
                        name="desc_1"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description 2</p>
                    <textarea
                        onChange={onChangehandler}
                        value={data.desc_2}
                        className="d-input"
                        name="desc_2"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangehandler}
                            name="category"
                            className="select-category"
                        >
                            <option value="Aromatic"> Aromatic</option>
                            <option value="Dustbin"> Dustbin</option>
                            <option value="Cleaning"> Cleaning</option>
                            <option value="Appliances"> Appliances</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangehandler}
                            value={data.price}
                            className="price-input"
                            type="Number"
                            name="price"
                            placeholder="Rs20"
                        />
                    </div>
                </div>

                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;

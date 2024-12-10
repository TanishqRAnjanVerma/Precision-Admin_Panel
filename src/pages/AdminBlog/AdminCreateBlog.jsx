// pages/AdminBlog/AdminCreateBlog.jsx
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'


const AdminCreateBlog = ({ url }) => {  // Get url from props instead of context
    const [data, setData] = useState({
        title: "",
        subtitle: "",
        content: "",
        image: "",
        videoUrl: ""
    })

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setData({ ...data, image: e.target.files[0] })
        } else {
            setData({ ...data, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Validate form data
            if (!data.title || !data.subtitle || !data.content || !data.image) {
                toast.error("Please fill all fields");
                return;
            }

            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("subtitle", data.subtitle)
            formData.append("content", data.content)
            formData.append("image", data.image)
            formData.append("videoUrl", data.videoUrl)
            const response = await axios.post(`${url}/api/blog/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                toast.success("Blog created successfully!")
                // Reset form
                setData({
                    title: "",
                    subtitle: "",
                    content: "",
                    image: "",
                    videoUrl: ""
                })
            } else {
                toast.error(response.data.message || "Failed to create blog")
            }
        } catch (error) {
            console.error("Error creating blog:", error)
            toast.error(error.response?.data?.message || "Error creating blog")
        }
    }

    return (
        <div className="admin-create-blog add">
            <h2>Create New Blog</h2>
            <form onSubmit={handleSubmit} className="blog-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        placeholder="Enter blog title"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>YouTube Video URL (optional)</label>
                    <input
                        type="text"
                        name="videoUrl"
                        value={data.videoUrl}
                        onChange={handleChange}
                        placeholder="Enter YouTube video URL"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Subtitle</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={data.subtitle}
                        onChange={handleChange}
                        placeholder="Enter blog subtitle"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        placeholder="Enter blog content"
                        className="form-control"
                        rows="6"
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="form-control"
                        accept="image/*"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Create Blog
                </button>
            </form>
        </div>
    )
}

export default AdminCreateBlog
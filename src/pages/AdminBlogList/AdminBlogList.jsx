// pages/AdminBlog/AdminBlogList.jsx
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'


const AdminBlogList = () => {
    const { url } = useContext(AdminContext)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${url}/api/blog/list`)
                setBlogs(response.data.data)
            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch blogs")
            }
        }
        fetchBlogs()
    }, [url])

    const handleRemove = async (id) => {
        try {
            const response = await axios.post(`${url}/api/blog/remove`, { id })
            toast.success(response.data.message)
            setBlogs(blogs.filter((blog) => blog._id !== id))
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove blog")
        }
    }

    const getEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return null;
    };

    return (
        <div className="admin-blog-list">
            <h1 className="admin-blog-header">Manage Blogs</h1>
            <div className="blog-grid">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-card">
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-subtitle">{blog.subtitle}</p>
                        {blog.image && (
                            <img
                                src={`${url}/uploads/${blog.image}`}
                                alt={blog.title}
                                className="blog-image"
                            />
                        )}
                        {blog.videoUrl && (
                            <div className="blog-video">
                                <h3>Video URL:</h3>
                                <p>{blog.videoUrl}</p>
                                {getEmbedUrl(blog.videoUrl) && (
                                    <div className="video-container">
                                        <iframe
                                            src={getEmbedUrl(blog.videoUrl)}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            onClick={() => handleRemove(blog._id)}
                            className="remove-btn"
                        >
                            Remove Blog
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminBlogList
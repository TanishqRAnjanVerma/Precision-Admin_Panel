import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const url = "http://localhost:4000"; // Your backend URL
    // Add new state for blogs
    const [blogs, setBlogs] = useState([])

    // Add new useEffect for fetching blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${url}/api/blog/list`);
                if (response.data.success) {
                    setBlogs(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    // Add new blog-related functions
    const addBlog = async (blogData) => {
        try {
            const response = await axios.post(`${url}/api/blog/add`, blogData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: token
                }
            });
            if (response.data.success) {
                setBlogs([...blogs, response.data.data]);
                return { success: true, message: "Blog added successfully" };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: "Error adding blog" };
        }
    };

    const removeBlog = async (blogId) => {
        try {
            const response = await axios.post(`${url}/api/blog/remove`,
                { id: blogId },
                { headers: { token: token } }
            );
            if (response.data.success) {
                setBlogs(blogs.filter(blog => blog._id !== blogId));
                return { success: true, message: "Blog removed successfully" };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: "Error removing blog" };
        }
    };


    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${url}/api/admin/login`, { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("adminToken", response.data.token);
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await axios.post(`${url}/api/admin/register`, { name, email, password });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("adminToken", response.data.token);
                return { success: true, message: "Account created successfully" };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Signup failed" };
        }
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("adminToken");
    };

    const contextValue = {
        url,
        token,
        setToken,
        login,
        signup,
        logout,
        blogs,
        setBlogs,
        addBlog,
        removeBlog,
        isAuthenticated: !!token
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
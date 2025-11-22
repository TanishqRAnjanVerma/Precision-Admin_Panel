import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AdminContextProvider from "./context/AdminContext";
import AdminCreateBlog from "./pages/AdminBlog/AdminCreateBlog";
import AdminBlogList from "./pages/AdminBlogList/AdminBlogList";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const url = "https://precision-backend.onrender.com";

  return (
    <AdminContextProvider>
      <>
        <div>
          {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
          <ToastContainer />
          <Navbar setShowLogin={setShowLogin} />

          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
              <Route
                path="/admincreateblog"
                element={<AdminCreateBlog url={url} />}
              />
              <Route
                path="/adminbloglist"
                element={<AdminBlogList url={url} />}
              />
            </Routes>
          </div>
        </div>
      </>
    </AdminContextProvider>
  );
};

export default App;

import React, { useState, useContext } from 'react'
import "../LoginPopup/loginpopup.css"
import { IoCloseSharp } from "react-icons/io5";
import { AdminContext } from '../../context/AdminContext';

const LoginPopup = ({ setShowLogin }) => {
    const { login, signup } = useContext(AdminContext);
    const [currState, setCurrState] = useState("Login");
    const [error, setError] = useState("");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        let result;

        if (currState === "Login") {
            result = await login(data.email, data.password);
        } else {
            result = await signup(data.name, data.email, data.password);
        }

        if (result.success) {
            setShowLogin(false);
        } else {
            setError(result.message);
        }
    }

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={onSubmit}>
                <div className="modal-b-1">
                    <h5 className='modal-b-txt-1'>{currState}</h5>
                    <IoCloseSharp onClick={() => setShowLogin(false)} className='close-icon' />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign up" &&
                        <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter your name' className="input-field" required />
                    }
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter your email' className="input-field" required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter your password' className="input-field" required />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type='submit' className='create-account'>
                    {currState === "Sign up" ? "Create an account" : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" className="checkbox-field" required />
                    <p className='policy'>By continuing I agree to Precision &nbsp;
                        <a href="" className="policy-link">Terms of Service</a>,&nbsp;
                        <a href="" className="policy-link">Privacy Policy</a>&nbsp;and&nbsp;
                        <a href="" className="policy-link">Content Policies</a>
                    </p>
                </div>
                {currState === "Login"
                    ? <p className='switch'>New to Precision? <span className='switch-text' onClick={() => setCurrState("Sign up")}>Create an account</span></p>
                    : <p className='switch'>Already have an account? <span className='switch-text' onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
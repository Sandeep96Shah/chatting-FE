import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import { user_validate, signUp } from '../actions';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isSignIn, setIsSignIn] = useState(props.auth.proceedSignIn || true);
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();
    
    const handleSignIn = (e) => {
        e.preventDefault();
        if(isSignIn) {
            props.dispatch(user_validate(email, navigate, password));
        }else {
            setIsSignIn(!isSignIn);
        }
    }

    useEffect(() => {
        setIsSignIn(props.auth.proceedSignIn);
    }, [props.auth.proceedSignIn])

    const handleSignUp = (e) => {
        e.preventDefault();
        if(!isSignIn) {
            props.dispatch(signUp({email, name, password, confirmPassword, toast}));
        }else {
            setIsSignIn(!isSignIn);
        }
    }

    return (
        <>
        <ToastContainer />
        <Link to="/"><div className="homepage"><p>Home</p></div></Link>
        <div className="navbar">
            <div><h1>Connecting People Through Messaging!</h1></div>
        </div>
        <div className="sign_container sign_top">
            <div className="sign_header">
                <h1>{"Register/SignIn"}</h1>
            </div>
            <div className="form_container">
                <form>
                    {
                        isSignIn ? (
                            <>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </>
                        ): (
                            <>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="email">Name</label>
                                <input 
                                    type="test"
                                    name="test"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="email">Confirm Password</label>
                                <input 
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </>
                        )
                    }
                    <div className='btn_container'>
                        <div className="submit_btn">
                            <button onClick={  (e) =>  handleSignIn(e) } className={`${isSignIn ? "primary" : "secondary"} submit_btn_input`}>Sign In</button>
                        </div>
                        <div className="submit_btn">
                            <button onClick={  (e) =>  handleSignUp(e) } className={` ${!isSignIn ? "primary" : "secondary"} submit_btn_input`}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

export default connect(mapStateToProps)(Navbar);

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import { connect } from 'react-redux';
import  jwt_decode from 'jwt-decode';

const App = (props) => {
  const [endPoint, setEndPoint] = useState("http://localhost:5000");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      const user = jwt_decode(token);
      navigate('/dashboard',{ state:{user,}});
    }
  }, [])

  return (
    <div>
        <div>
            <Routes>
              <Route path="/" element={<HomePage /> }/> 
              <Route path="/login" element={<RegisterPage /> }/> 
              <Route path="/dashboard" element={<Dashboard {...props}/> }/>                       
            </Routes>
        </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);


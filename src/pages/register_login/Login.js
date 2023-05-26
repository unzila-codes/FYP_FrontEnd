import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import google_icon from '../../images/google_icon.png';
import logo from '../../images/logo.png';
import { Layout } from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export const Login = () => {
  const navigate = useNavigate();
  const {loginUser} = useContext(UserContext);
  const [errMsg, setErrMsg] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== '')) {
      setErrMsg('Please fill in all required fields!');
      return;
    }

    try {
      const data = await loginUser({
        email: formData.email,
        password: formData.password
      });

      console.log('Login request response:', data);

      if (data.success) {
        e.target.reset();
        toast.success('Sign In Successful');
        navigate('/');
        
       
      } else {
        setErrMsg(data.message);
      }
    } catch (error) {
      console.error('Login request error:', error);
      setErrMsg('An error occurred. Please try again later.');
    }
  };

    return (
        <Layout>

            <section className="banner_content">
                <div className="container register_container">
                    <div className="row">
                        <div className="right_register_col col-md-7">

                            <div className="right_logo">
                                <img className='logo_register' src={logo} alt="" />
                                <h2>Rental Hub</h2>
                            </div>

                            <div className="right_center">
                                <h2>New Here ?</h2>
                                <h5>Sign Up & Discover a Great</h5>
                                <h5>Amount Of Rental Properties</h5>

                            </div>

                            <div className="right_button">
                                <button className="login_btn">
                          <Link to="/Register">Register</Link> 
                                    
                                </button>
                            </div>


                            <div className="right_foot">
                                <h1>Where We Dream of Luxurary House</h1>
                                <h1>Becoming a Reality In Real Time</h1>

                            </div>

                        </div>

                        <div className="left_register_col col-md-5">
                            <h1 className='text-center'>Sign In</h1>

                            <div className="register_form">
                                    <form onSubmit={submitForm}>
                                <div className="form_element" id="email">
                                    <input  type="email" name='email'
                                     placeholder='Email'
                                     onChange={onChangeInput}
                                      />
                                </div>

                                


                                <div className="form_element" id="password">
                                <input name="password" type="password" 
                                 placeholder='Password' 
                                 onChange={onChangeInput}
                                 

                                   />
                               {/* <BsFillEyeFill className='eye_icon' onClick={()=>setShowPassword(prevState => !prevState) }/> */}
                            </div>



                                <div className="form_element" id="signup">
                                    <button type="submit">LogIn</button>

                                </div>
                                </form>
                            </div>
                           <p className='text-center'>
                                ____ OR ____
                            </p>

                            <div className="google_signup">

                                <img src={google_icon} />
                                <a href="#"> <p>Signup with google</p></a>
                            </div>

                        </div>



                    </div>
                </div>
            </section>


        </Layout>
    )
} 
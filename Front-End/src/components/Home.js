import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/Home.css"
import img from '../asserts/animation.mp4'
import { Main } from './Main'
import Footer from './Footer'
import UserAuthService from '../Service/UserAuthService'

import { login, selectUser } from './Features/features';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Home = () => {
    const navigate = useNavigate('');
    const history = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [inpval, setInpval] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

   

    const [data,setData] = useState([]);
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addData = async(e) => {
        e.preventDefault();

        const { username, email, phoneNumber, password } = inpval;
        try{
        if (username === "") {
            toast.error(' Name field is required!',{
                position: "top-center",
            });
        } else if (email === "") {
             toast.error('Email field is required',{
                position: "top-center",
            });
        } else if (!email.includes("@")) {
             toast.error('Please enter valid Email address',{
                position: "top-center",
            });
        } else if (phoneNumber === "") {
             toast.error('PhoneNumber field is required',{
                position: "top-center",
            });
        } else if (password === "") {
             toast.error('Password field is required',{
                position: "top-center",
            });
        } else if (password.length < 5) {
             toast.error('Password length must be greater than five',{
                position: "top-center",
            });
        } else {
            console.log("Data added succesfully");
            const response = await UserAuthService.saveUser(inpval);
            console.log(response);
        const target = "Error";
        const target1 = "Email Already Exists !!";

        if (response.data === target) {
            alert(target);
        } else if (response.data === target1) {
            alert(target1);
        }
        else{
            alert("success");
            localStorage.setItem("useryoutube",JSON.stringify([...data,inpval]));
            navigate('/');

        }
        }
        }
        catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return (
        <>
             <Main/>
        <div className='main1'> 
            <div className='tems1'>
            <video autoPlay loop muted className='videos'>
                    <source src={img} type='video/mp4' ></source>
                </video>
            </div>
            <div className='tems2'>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3 sign" style={{ width: "100%" }}>
                        <Form className='vv'>
                        <h3 style={{color: "black",marginLeft:95,marginBottom:30}}> Passenger Sign Up</h3>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='username' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="phoneNumber" name='phoneNumber' onChange={getdata} placeholder="Enter Phone Number" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' id = "movee" onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                            <p className='mt-3 link mv' style={{color: "black",}}>Already Have an Account <span ><NavLink to="/">Sign In</NavLink></span> </p>
                        </Form>
                       
                    </div>
                </section>
                <ToastContainer />
            </div>
            </div>
        </div>
        <br></br>
        <span>

        <Footer />
        </span>
        </>
    )
}

export default Home
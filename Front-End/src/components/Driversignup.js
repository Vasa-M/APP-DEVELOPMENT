import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/Home.css"
import img from '../asserts/Driver.mp4'
// import { Main } from './Main'
import { Maindriver } from './Maindriver'
import Footer from './Footer'
import DriverService from '../Service/DriverService'
import UserAuthService from '../Service/UserAuthService'

const Driversignup = () => {
    const navigate = useNavigate('');
    const history = useNavigate();

    const [inpval, setInpval] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        aadharNumber: "",
        vehicleNumber: "",
        rcNumber: "",
        liscenceNumber: "",
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

        const { username, email, phoneNumber, aadharNumber, rcNumber, vehicleNumber, liscenceNumber, password } = inpval;
        
        if (username === "") 
        {
            toast.error(' Name field is required!',{
                position: "top-center",
            });
        }
        else if (email === "") {
         toast.error('Email field is required',{
            position: "top-center",
        });
        } else if (!email.includes("@")) {
         toast.error('Please enter valid Email address',{
            position: "top-center",
        });
        } 
        else if (aadharNumber === "") 
        {
            toast.error(' AadharNumber field is required!',{
                position: "top-center",
            });
        } 
        else if (rcNumber === "") 
        {
            toast.error(' RegistrationNumber field is required!',{
                position: "top-center",
            });
        }else if (phoneNumber === "") 
        {
            toast.error(' PhoneNumber field is requred!',{
                position: "top-center",
            });
        } 
        else if (vehicleNumber === "") 
        {
            toast.error(' VehicleNumber field is requred!',{
                position: "top-center",
            });
        } 
        else if (liscenceNumber === "") 
        {
            toast.error(' LiscenceNumber field is requred!',{
                position: "top-center",
            });
        }else if (password === "") {
             toast.error('password field is requred',{
                position: "top-center",
            });
        } else if (password.length < 5) {
             toast.error('password length greater five',{
                position: "top-center",
            });
        } else {
            console.log("Data added succesfully");
            try{
            const response = await UserAuthService.saveDriver(inpval);
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
            navigate('/driverlog');

        }
    }
    catch(error){
        console.log(error);
    }

        
        }
    }

    return (
        <>
             <Maindriver/>
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
                        <h3 style={{color: "black",marginLeft:95,marginBottom:30}}> Driver Sign Up</h3>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='username' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='phoneNumber' onChange={getdata} placeholder="Enter Your PhoneNumber" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='aadharNumber' onChange={getdata} placeholder="Enter Your AadharNumber" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='vehicleNumber' onChange={getdata} placeholder="Enter Your VehicleNumber" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='rcNumber' onChange={getdata} placeholder="Enter Your RegistrationNumber" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6 " controlId="formBasicEmail">

                                <Form.Control type="text" name='liscenceNumber' onChange={getdata} placeholder="Enter Your LiscenceNumber" />
                            </Form.Group>


                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' id = "movee" onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                            <p className='mt-3 link mv' style={{color: "black",}}>Already Have an Account <span ><NavLink to="/driverlog">Sign In</NavLink></span> </p>
                        </Form>
                       
                    </div>
                </section>
                <ToastContainer />
            </div>
            </div>
        </div>
        <br></br><br></br><br></br>
        <br></br><br></br><br></br>
        <br></br><br></br>
        <Footer/>
        </>
    )
}

export default Driversignup
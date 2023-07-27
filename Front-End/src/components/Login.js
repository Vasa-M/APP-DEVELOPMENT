import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/Log.css"
import { Link } from 'react-router-dom';
import { Main } from './Main';
import img from '../asserts/animation.mp4'
import Footer from './Footer';
import UserAuthService from '../Service/UserAuthService';

import { addToken, login, selectUser , addEmail} from './Features/features';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate('');
    // const history = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
  


    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    // const [data, setData] = useState([]);
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

        try{
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");
        console.log(getuserArr);

        const { email, password } = inpval;
        
         if (email === "") {
            toast.error('Email field is required', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter valid Email address', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('Password field is required', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('Password length must be greater than five', {
                position: "top-center",
            });
        } else {

        const response = await UserAuthService.loginUserWithEmailAndPassword(inpval);
        console.log(response);
        
        
        if (response.message !== "Request failed with status code 400") 
        {
            console.log(response.data.accessToken);
            dispatch(addToken(response.data.accessToken));
            dispatch(addEmail(inpval.email));
            alert("Login Success");

            navigate('/newmap');
        } 
        else
        {
            alert("Oops Invalid E-mail or Password"); 
        }
    }
}
catch(error){
    alert("Login Error");
    console.log(error);
}
    }

    return (
        <>
        <Main/>
        <div className='main'>
            <div className='tem1'>
                <div style={{marginLeft:'150px',marginTop:'50px'}}>
            <video autoPlay loop muted className='video'>
                    <source src={img} type='video/mp4'></source>
                </video>
                </div>
            </div>
            <div className='tem2'>
            <div className="container mt-3"  style={{marginTop:'70%'}}>
                <section className='d-flex justify-content-between'   >
                    <div className="left_data mt-3 p-3 " id='kanna'>
                        <h3 className='text-center col-lg-6 aa' style={{width:300,display:'flex'}}>Passenger Sign In</h3>
                        <Form className='zz'>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" className='mtt-1' name='email' onChange={getdata} placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" className='mtt-1' name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6'id = "move" onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3-link-mv1 si_up' style={{color: "black"}}>Create new Account <span><Link to="/home">Sign Up</Link></span> </p>
               
                    </div>
                </section>
                <ToastContainer />
            </div>
            </div>
        </div>
        <br>
        </br>
        <span>

        <Footer/>
        </span>
        </>
    )
}

export default Login
import React from 'react'
import "../components/Main.css";
import { Link } from 'react-router-dom';
import img from '../asserts/nav.mp4'
import Footer from './Footer';
import img1 from "../asserts/logo-png.png"
export function Main()
{
    return(
        <>

            <div class = "sidenav"> 
            <ul>
                <li>{/*<video autoPlay loop muted className='navi'>
                    <source src={img} type='video/mp4'></source>
                </video> */}
                <img src={img1} style={{height:65,width:160,paddingTop:20}}/>
                </li>
                <li class="right"><span><Link to="/">Home</Link></span>
                </li>
                <li class="right"><span><Link to="/contact">Contact Us</Link></span>
                </li>
                <li class="right"><span><Link to="/about">About Us</Link></span>
                </li>
                {/* <li class ="right" id="r"><span><Link to="/">Passenger Sign In</Link></span>
                </li> */}
                <li class ="right" id='suhaas'><span><Link to="/driverlog">Driver Sign In</Link></span>
                </li>
            </ul>
        </div>
        </>
    );
}
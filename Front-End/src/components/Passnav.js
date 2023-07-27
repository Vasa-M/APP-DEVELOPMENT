import React, { useEffect } from 'react'
import "../components/Main.css";
import {useSelector} from 'react-redux'
import { selectUser, selectToken , selectEmails } from "./Features/features.js";
import UserService from '../Service/UserService';
import { useState } from 'react';
export function PassNav()
{
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const emails = useSelector(selectEmails);
  const [name , setName] = useState();
  const [email , setEmail] = useState();
  const [phoneNumber , setPhoneNumber] = useState();
//   var name = "";
  console.log(token);
  console.log(emails);
  useEffect(() => {
    const fun = async() => {
        try{  
            const response = await UserService.getUserByEmail( emails , token);
            console.log(response.data);
            setName(response.data.username);
            setEmail(response.data.email);
            setPhoneNumber(response.data.phoneNumber);
            console.log(name);
          }
          catch(error){
            console.log(error);
        }
    }
    fun();
  })
    
  
    return(
        <>
        <nav style={{backgroundColor:'black'}}>

        <div>

        <div class="dropdown" style={{paddingLeft:1000}}>
    <button class="dropbtn" style={{width:161,backgroundColor:'black'}}>PROFILE
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <ul style={{backgroundColor:'white'}}>
        
        <li className='redux'>
            USERNAME: {name}
        </li>
        <br></br>
        <li className='redux'>
            EMAIL: {emails}
        </li>
        <br></br>
        <li className='redux'>
            MOBILE NUMBER: {phoneNumber}
        </li>
      </ul>
    </div>
  </div>
        </div>
        </nav>
        
</>
    );
}
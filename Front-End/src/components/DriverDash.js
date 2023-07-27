import { useState } from 'react';
import './DriverDash.css'
import { DriverNav } from './DriverNav';
import {useSelector} from 'react-redux'
import { selectDriverEmails } from "./Features/features.js";

function DriverDash() {
    const [ready,setReady]=useState('No');
    const [location,setLocation]=useState('');
    const emails = useSelector(selectDriverEmails);

    const addReady=()=>{

        const val={
            ready:ready,
            location:location
        }
        console.log(val);
    }
    
    const getData=async(e)=>{
        setReady=e.target.value;
    }
    return ( 
        <>
        <DriverNav/>
        <div className='check'>
        <h4>CAPTAIN ARE YOU READY 👨🏻‍✈️🚕!!!</h4>
        <div class="form-check fh">
            <input class="form-check-input"  type="radio" onChange={(e)=>{setReady(e.target.value)}} name="flexRadioDefault" value='yes' id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
                Yes
            </label>
        </div>
        <div class="form-check fh">
            <input class="form-check-input" type="radio" onChange={(e)=>{setReady(e.target.value)}} name="flexRadioDefault" value='no' id="flexRadioDefault2" checked/>
            <label class="form-check-label" for="flexRadioDefault2">
                No
            </label>
        </div>
        <div className='jk'>
            <h5>Enter your Current Location:</h5>
            <input className='dj' name='location' onChange={(e)=>{setLocation(e.target.value)}} type='text' placeholder='Enter Location'/>
        </div>
        <button className='kj' style={{backgroundColor:"yellow"}} onClick={addReady}>Submit</button>
        </div>
        
        
        </>
     );
}

export default DriverDash;
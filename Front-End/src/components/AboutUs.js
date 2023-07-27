import React from "react";
import "../components/About.css";
import img from "../asserts/logo-png.png"
import { Main } from "./Main";
import { Link } from "react-router-dom";
function AboutUs() {
    return ( 
        <>
        <Main/>
        <div className="splitscreen">
        <div className="toppane">
        <h1 className="h1">"World’s Beloved Taxi Service"</h1>
<br>
</br>
<h6 className="h2">ONE-D is India’s largest mobility platform and one of the world’s largest ride-hailing companies, serving 250+ cities across 
India, Australia, New Zealand, and the UK. The ONE-D app offers mobility solutions by connecting customers to drivers and a wide range of vehicles across bikes, 
auto-rickshaws, metered taxis, and cabs, enabling convenience and transparency for hundreds of millions of consumers and over 1.5 million driver-partners.

ONE-D’s core mobility offering in India is supplemented by its electric-vehicle arm, ONE-D Electric; India’s largest fleet management business,
 ONE-D Fleet Technologies and ONE-D Skilling, that aims to enable millions of livelihood opportunities for India's youth. <br>
 </br><br></br>With its acquisition of Ridlr, India’s 
 leading public transportation app and investment in Vogo, a dockless scooter sharing solution, ONE-D is looking to build mobility for the next billion Indians. ONE-D also extends its consumer offerings like 
 micro-insurance and credit led payments through ONE-D Financial Services and a range of owned food brands through India’s largest network of kitchens under its Food business.

ONE-D was founded in JULY 2003 by Vasanth and Deepikka with a mission to build mobility for a billion people.
</h6>
  
        </div>
        <div className="bottompane">
        
           <img src={img} style={{height:230,width:480,paddingTop:100}}/>
        </div>
      </div>
        </>
     );
}

export default AboutUs;
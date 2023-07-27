import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase' style={{paddingTop:30}}>Contact Via Mobile:</h5>

            
            <p style={{marginLeft:70}}> 
              9080706050  
            </p>
          </MDBCol>

          <MDBCol lg='6' md='12' className='mb-4 mb-md-0' >
            <h5 className='text-uppercase'style={{paddingTop:30}}>Contact Via Email:</h5>

            <p style={{marginLeft:70}}>
              HelpService@gmail.com
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'black' ,color:'white'}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
          ONE-D TAXI
      </div>
    </MDBFooter>
  );
}
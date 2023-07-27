import React from 'react'
import '../components/Contact.css'
import { background } from '@chakra-ui/react'
import Footer from './Footer'
import { Main } from './Main'
import img from "../asserts/logo-png.png"
const ContactUs = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }
  return (
    <>
    <Main/>
    <div className="container mt-5">
      <h2 className="mb-3" style={{marginLeft:'360px',width:400}}>How Can We Help You?</h2>
      <form style={{marginLeft:'340px',marginTop:70}}nSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input className="form-control" type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input className="form-control" type="email" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message:
          </label>
          <textarea className="form-control" id="message" required />
        </div>
        <button style={{marginLeft:'85px',width:200}}className="btn btn-danger " type="submit">
          {formStatus}
        </button>
      </form>
    </div>
    <Footer/>
    </>
  )
}
export default ContactUs
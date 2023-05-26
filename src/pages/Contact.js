import React from 'react'
import { Layout } from '../components/layout/Layout'
import './contact.css'
import location_img from '../images/location.png'
import call from '../images/call.png'
import email from '../images/email.png'
import social_icon from '../images/socialIcons.png'





const Contact = () => {
  return (
    <Layout>
   
   {/* <!-------------------------- CONTACT------------------------------ --> */}
  <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="MainHeading">
                <h1>Get In Touch</h1><p></p>   
            </div>
        </div>
    </div>
  </div>
  <div class="container ContactContainer mb-5">
    <div class="row">
        <div>
            <h5>Send us a Message</h5>
        </div>
        <div class="col-md-6">
            <form>
                <div class="form-group">
                  <input type="text" class="form-control" id="exampleInputName1"  placeholder="Name"/>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="Message" placeholder="Write your Message here..." rows="8"></textarea>
                  </div>
                  <button type="button" class="formbtn">Send</button>
              </form>
        </div>
        <div class="col-md-6 ContactList">
            <ul class="fa-ul">
                {/* <li><span><img class="ConImg" src={location_img} alt=""/></span>Lorem ipsum dolor sit amet consectetur.</li>
                <li><span><img class="ConImg" src={call} alt=""/></span>123 345 789 3</li>
                <li><span><img class="ContactImg" src={email} alt=""/></span>mail@domain.com</li>
                <li><span><img class="ConImg" src={social_icon} alt=""/></span></li> */}
                {/* <li><span><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.09741262883!2d67.06797061431998!3d24.860522351379167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e9f60d36339%3A0x1d64ea8b0a7ca381!2sMohammad%20Ali%20Jinnah%20University!5e0!3m2!1sen!2s!4v1647781365907!5m2!1sen!2s"
                    width="90%" height="250" style="border:solid rgb(202, 194, 194) 1px;" allowfullscreen="" loading="lazy"></iframe></span></li> */}
              </ul>
        </div>
   </div>
   </div>
   {/* <!-------------------------- CONTACT END------------------------------- --> */}
    </Layout>
  )
}

export default Contact

import React from 'react'
import { Layout } from '../components/layout/Layout'
import vision from '../images/visionimg.png'
import mission from '../images/ourMission.png'
import approach from '../images/ourApproach.png'
import trust from '../images/trust.png'
import reliable from '../images/reliable.png'
import efficiency from '../images/efficiency.png'
import './about.css'


const About = () => {
  return (
    <Layout>
         {/* <!-------------------------- MAIN HEADING------------------------------- --> */}

<div class="container">
 <div class="row">
         <div class="MainHeading">
             <h1>ABOUT US</h1>
             <p>What we do</p>   
         </div>
         </div>
     <div className="row row_vision">
             <div class="col-md-7">
                 <div class="vision">
                     <h1>OUR VISION</h1>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not</p>   
                 </div>
             </div>
     
             <div class="col-md-5">
                 <div class="visionImg">
                 <img src={vision} />
                 </div>
             </div>
             </div>

             <div className="row row_mission">
             <div class="col-md-5">
                 <div class="visionImg missionImg">
                 <img src={mission} />
                 </div>
             </div>

             <div class="col-md-7">
                 <div class="vision mission">
                     <h1>OUR MISSION</h1>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not</p>   
                 </div>
             </div>
             <div className="row row_approach">  

             <div class="col-md-7">
                 <div class="vision">
                     <h1>OUR APPROACH</h1>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not</p>   
                 </div>
             </div>
     
             <div class="col-md-5">
                 <div class="visionImg">
                 <img src={approach} />
                 </div>
             </div>
             </div>
</div>
</div>

<div class="container end_about">
 <div class="row">
     
     <div class="col-md-12">
         <div class="MainHeading">
             <h1>WHAT WE EXCEL IN</h1><p></p>   
         </div>
     </div>
 </div>
</div>

<div class="container AboutBody">
 <div class="row">
     

     <div class="col-md-4">
         <img class="ExcelImg" src={trust} alt="" />
         <h4>Trust</h4>
         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
     </div>
     <div class="col-md-4 Reliable">
         <img class=" reliableImg" src={reliable} alt="" />
         <h4>Reliable</h4>
         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
     </div>
     <div class="col-md-4">
         <img class="ExcelImg" src={efficiency} alt=""/>
         <h4>Efficient</h4>
         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
     </div>
   
  
 </div>
</div>







 {/* <!-------------------------- MAIN HEADING END------------------------------- --> */}
    </Layout>
  )
}

export default About

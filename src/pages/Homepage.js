import React from 'react'
import { Layout } from '../components/layout/Layout'
import './homePage.css'
import design from '../images/design.png'
import about_1 from '../images/About1.png'
import about_2 from '../images/about2.png'
import potrait_1 from '../images/potrait1.jpeg'
import potrait_2 from '../images/potrait2.jpeg'


const Homepage = () => {
  return (

    <Layout>

      {/* <!-- -----------------------BANNER ---------------------------------> */}
      <section className="banner">
        <div className="container">
        
          <div className="row">
          <div className="div_banner"> <img src={design} alt="" />
             <h2 className='banner_head'>Finding Soulmate in Bricks</h2>
            <div className="bannerline"></div>
            <p>Find your dream home with ease on our user-friendly real estate marketplace. Browse listings, compare properties, and connect with top agents. Your perfect home is just a click away</p></div>
            
          </div>
        </div>
      </section>
      {/* <!-- -----------------------BANNER Closed---------------------------------> */}


      {/* <!-------------------------- ABOUT HEADING------------------------------- --> */}
   

      <section className="AboutBorder">
      <div className="container ">
          <div className="row">

            <div className="col-md-12">
              <div className="MainHeading">
                <h1>ABOUT US</h1><p>Start Living Your Dream</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container AboutUsBody">
          <div className="row">
            <div className="col-md-4">
              <img src={about_1} alt="" />
            </div>
            <div className="col-md-4">
              <p>Price is what you pay <br />
                Value is what you get</p>
              <div className="OurStory">
                <h2>OUR STORY</h2>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis volutpat nunc sagittis felis. Lacus sit sit donec in sapien sagittis pretium, phasellus neque. Volutpat congue diam pellentesque nibh gravida scelerisque nullam volutpat</span>
                <br /> <a href="#">View More <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div className="col-md-4 AboutImg2">
              <img src={about_2} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* <!-------------------------- CLOSED ABOUT HEADING------------------------------- --> */}

      {/* <!-------------------------- TESTIMONALS HEADING------------------------------- --> */}

      <section className='sec_testimonals'>
        <div className="container ">
          <div className="row">

            <div className="col-md-12">
              <div className="MainHeading">
                <h1>OUR TESTIMONALS</h1><p>What Client Say ABout Us</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="Testimonals AboutBorder">
        <div className="container TestimonalCont">
          <div className="row">
            <div className="carousel">
              <input type="radio" name="slide" id="indicator1"/>
                <input type="radio" name="slide" id="indicator2"/>
                  <input type="radio" name="slide" id="indicator3"/>
                    <input type="radio" name="slide" id="indicator4"/>
                      <div className="carousel-inner">
                        <div className="carousel-items">
                          <div className="carousel-captions">
                            <img src={potrait_1} />
                            <h2>Jessica Brown</h2>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Lobortis hendrerit iaculis sed tempor pulvinar. Diam eget pellentesque massa lorem.</p>
                          </div>
                        </div>
                        <div className="carousel-items">
                          <div className="carousel-captions">
                            <img src={potrait_2} />
                            <h2>Jessica Brown</h2>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Lobortis hendrerit iaculis sed tempor pulvinar. Diam eget pellentesque massa lorem.</p>
                          </div>
                        </div>
                        <div className="carousel-items">
                          <div className="carousel-captions">
                            <img src={potrait_2} />
                            <h2>Jessica Brown</h2>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Lobortis hendrerit iaculis sed tempor pulvinar. Diam eget pellentesque massa lorem.</p>
                          </div>
                        </div>
                        <div className="carousel-items">
                          <div className="carousel-captions">
                            <img src={potrait_2} />
                            <h2>Jessica Brown</h2>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Lobortis hendrerit iaculis sed tempor pulvinar. Diam eget pellentesque massa lorem.</p>
                          </div>
                        </div>
                      </div>
                      <div className="indicators">
                        <label for="indicator1"></label>
                        <label for="indicator2"></label>
                        <label for="indicator3"></label>
                        <label for="indicator4"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- ================================NEW LETTER HEADING============================== --> */}

<section>
 <div className="container ">
     <div className="row">
         
         <div className="col-md-12">
             <div className="MainHeading footerCol3 ">
                 <h1>SUBSCRIBE TO OUR NEWSLETTER</h1><p>Receive updates instantly</p>   
                 <div className="input-group NewsForm">
                   <input type="email" className="form-control" placeholder="Your Email"/>
                   <span className="input-group-btn">
                     <button className="btn" type="submit">Subscribe Now</button>
                   </span>
                 </div>
             </div>
         </div>   
     </div>
    </div>
</section>

            </Layout>

            )
}

            export default Homepage

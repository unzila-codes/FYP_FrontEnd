import './profile.css'
import React, {useContext} from 'react';
import { Layout } from '../../components/layout/Layout'
import { Link, useNavigate } from 'react-router-dom';
// import profile_picture from '../images/profile_Picture.png'
import { UserContext } from '../../context/UserContext';


// Custom hook for conditional redirection
const useRedirectIfNotLoggedIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  console.log('isLoggedIn:', isLoggedIn);

  if (!isLoggedIn) {
    console.log('Redirecting to login page');
    navigate('/Login');
  }
};

const Profile = () => {
  useRedirectIfNotLoggedIn();
  

  return (
    <Layout>


      <section className="profile_sec">
        <div className="container-fluid contiainer-profile">
          <div className="row row_profile_background">
         

          </div>
          <div className="div_profile_pic">

            {/* Profile Picture */}

            {/* <img src={profile_picture} /> */}

          </div>

          <div className="div_profile_info">


            <h3 className="porfile_heading">
              Elisha
            </h3>

            <p className="occupation">
              Content Manager. Techigator Pvt.Ltd
            </p>


            <div className="social_info">
              <p>
                <i class="fas fa-map-marker-alt "></i>New York, NY 23333, US
              </p>

              <p>
                <i class="fas fa-phone ml-3"></i>123 345 789 3
              </p>

              <p>
                <i class="fas fa-envelope ml-3"></i>mail@domain.com
              </p>
            </div>



            {/* <i class='fas fa-map-marker-alt' style='font-size:24px'></i>   */}
          </div>


        </div>

        {/* Profile Main BOdy */}
      </section>


      <section className='sec_profile_body'>
        <div className="container-fluid">
          <div className="row row_body">

            <div className="col-md-2 left_body">

              <h4 className='left_heading'>
                Ratings
              </h4>

              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>

              <p>
                <i class="fas fa-map-marker-alt "></i>New York, NY 23333, US
              </p>

              <p>
                <i class="fas fa-phone"></i>123 345 789 3
              </p>

              <button type="button"
               class="left_buttons btn btn-primary btn-lg">
            <Link to="/AddProperty_1">Add Property</Link>
               
               </button>


            </div>

            <div className="col-md-6 center_body">

              <h4>
                Tenants Requests
              </h4>

              <div className="row row_dues">

                <div className="col-md-5">
                  <h6 className='center_tenant'>
                    Unzila Shaukat
                  </h6>
                  <p className='outstanding_dues'>
                    CAA Colony, Karachi. Near Airport
                    <span> (1 lac) </span>
                  </p>
                </div>

                <div className="col-md-7">
                  <button type="button" class="btn btn-outline-danger reject_button">Reject</button>
                  <button type="button" class="btn btn-primary btn_pay_now">Accept</button>
                </div>

              </div>
              
              <div className="row row_dues mt-2">

                <div className="col-md-5">
                  <h6 className='center_tenant'>
                    Eman Zulfikar
                  </h6>
                  <p className='outstanding_dues'>
                    Gulshan Hadeed,
                    <span> (1.25 lac) </span>
                  </p>
                </div>

                <div className="col-md-7">
                <button type="button" class="btn btn-outline-danger reject_button">Reject</button>
                  <button type="button" class="btn btn-primary btn_pay_now">Accept</button>
                </div>



              </div>

            </div>

            <div className="col-md-2 right_body">
            <h4>
              Rent Dues
            </h4>
            <div className="dues">

              <p> <a href="">12th - Jan - 2023 </a> </p>

              <p> <a href="">12th - Nov - 2023 </a> </p>

            </div>
            {/* <button type="button" class="left_buttons btn btn-primary btn-lg">Rent Requests</button> */}

            </div>


          </div>
          
        </div>


      </section>



    </Layout>
  )
}

export default Profile
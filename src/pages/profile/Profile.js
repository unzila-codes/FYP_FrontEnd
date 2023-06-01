import "./profile.css";
import { Layout } from "../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data using the stored token or handle authentication state appropriately
    const token = localStorage.getItem("token");

    // Send a request to the backend API to fetch user profile data using the token
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
    fetch("http://localhost/FYP/profile.php", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProfileData(data.profile);
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage and redirect to the login page
    localStorage.removeItem("token");
    window.location.href = "/Login"; // Replace with the appropriate route for your login page
  };

  return (
    <Layout>
      <section className="mb-5 mt-5">
        <div className="container">
          <div className="row">
            {profileData ? (
              <div className="col-md-9 personal_info">
                <h3 className="porfile_heading">
                  Hi, <span> {profileData.name}</span>
                </h3>
                <p className="Cnic">
                  <span>CNIC:</span> {profileData.cnic}
                </p>
                <p className="email">
                  <span>EMAIL:</span> {profileData.email}   
                </p>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>

      <section className="sec_profile_body">
        <div className="container">
          <div className="row">
            <div className="col-md-2 left_body">
              <h5 className="left_heading">Ratings</h5>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <Link className="btn_left btn btn-primary" to="/AddPropertyBasic">
                Add Property
              </Link>
            </div>
            {/* center  */}
            <div className="col-md-6 center_body left_body">
              <h5>Tenants Requests</h5>
              <div className="row_dues col-md-12">
              {profileData ? (
                <h6 className="pt-1 ">{profileData.name}</h6>
                ) : (
                  <p>Loading...</p>
                )}
                <p className="outstanding_dues">
                  <span> Price </span> 100,000
                </p>
                <p className="outstanding_dues">
                  <span> Property </span> CAA Colony, Karachi. Near Airport
                </p>
                <div className="AcceptRejectBtn">
                  <button
                    type="button"
                    class="btn btn-outline-danger reject_button"
                  >
                    Reject
                  </button>
                  <button type="button" class="btn btn-primary btn_pay_now">
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;

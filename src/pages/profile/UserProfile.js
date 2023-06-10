import { Layout } from "../../components/layout/Layout";
import "./UserProfile.css";
//import avatar from '../../images/ProfileAvatar.avif.jpeg';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [biddingData, setBiddingData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
  });
  const [selectedBidStatus, setSelectedBidStatus] = useState("");

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      name: profileData.name,
      cnic: profileData.cnic,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Prepare the updated profile data
    const updatedProfileData = {
      ...profileData,
      name: formData.name,
      cnic: formData.cnic,
    };
    const token = localStorage.getItem("token");
    // Send a request to the backend API to update the profile data
    fetch("http://localhost/FYP/update_profile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfileData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProfileData(updatedProfileData);
          setEditMode(false);
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

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
          setBiddingData(data.biddingData);
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when the data is fetched
      });
  }, []);

  const handleBidAccept = (bidId) => {
    const token = localStorage.getItem("token");
    // Send a request to the backend API to update the bid status as accepted
    fetch(`http://localhost/FYP/profile.php?bid_id=${bidId}&status=accepted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update the bidding data in the frontend to reflect the accepted status
          const updatedBiddingData = biddingData.map((bid) => {
            if (bid.bid_id === bidId) {
              return {
                ...bid,
                status: "accepted",
              };
            }
            return bid;
          });
          setBiddingData(updatedBiddingData);
          setSelectedBidStatus("accepted"); 
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

  const handleBidReject = (bidId) => {
    const token = localStorage.getItem("token");
    // Send a request to the backend API to update the bid status as rejected
    fetch(`http://localhost/FYP/profile.php?bid_id=${bidId}&status=rejected`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update the bidding data in the frontend to reflect the rejected status
          const updatedBiddingData = biddingData.map((bid) => {
            if (bid.bid_id === bidId) {
              return {
                ...bid,
                status: "rejected",
              };
            }
            return bid;
          });
          setBiddingData(updatedBiddingData);
          setSelectedBidStatus("rejected"); // Disable the "Accept" button for the selected bid
        } else {
          // Handle error response
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

  const renderButton = (bid) => {
    if (bid.status === "accepted") {
      return <button type="button" className="btn btn-primary btn_pay_now">Pay Now</button>;
    } else if (bid.status === "rejected") {
      return (
        <button type="button" className="btn btn-outline-danger reject_button" disabled>
          Rejected
        </button>
      );
    } else {
      return (
        <>
        <button
          type="button"
          className={`btn btn-primary btn_pay_now ${selectedBidStatus === "accepted" ? "disabled-button" : ""}`}
          onClick={() => handleBidAccept(bid.bid_id)}
          style={{ cursor: selectedBidStatus === "accepted" ? "not-allowed" : "pointer" }}
          disabled={selectedBidStatus === "accepted"}
        >
          {selectedBidStatus === "accepted" ? "Processing..." : "Accept"}
        </button>
        <button
        type="button"
        className={`btn btn-outline-danger reject_button ${selectedBidStatus === "rejected" ? "disabled-button" : ""}`}
        onClick={() => handleBidReject(bid.bid_id)}
        style={{ cursor: selectedBidStatus === "rejected" ? "not-allowed" : "pointer" }}
        disabled={selectedBidStatus === "rejected"}
        >
        {selectedBidStatus === "rejected" ? "Processing..." : "reject"}
      </button>
      </>
      );
    }
  };
  return (
    <Layout>
      <section className="profile">
        <div className="container-fluid profileHeadContainer">
          <div className="row profileBackground">
            {profileData ? (
              <div className="col-md-9">
                {/* <img src={avatar} alt="" /> */}
                <h4 className="profileName">{profileData.name}</h4>
                <div className="idDetails ">
                  <h5 className="profileEmail">{profileData.email}</h5>
                  <h5 className="profileCnic">{profileData.cnic}</h5>
                </div>

                <div className="profileButtons">
                  <button
                    type="button"
                    class="btn_edit btn btn-info"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button type="button" class="btn_logout btn btn-info">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}

            {editMode && (
              <div className="col-md-9 personal_info">
                <h3 className="porfile_heading">Edit Profile</h3>
                <form onSubmit={handleSave}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <label htmlFor="cnic">CNIC:</label>
                  <input
                    type="text"
                    id="cnic"
                    value={formData.cnic}
                    onChange={(e) =>
                      setFormData({ ...formData, cnic: e.target.value })
                    }
                  />

                  <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="container-fluid dashboardSection mt-5">
              <ul class="nav nav-tabs justify-content-center">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    role="tab"
                    data-toggle="tab"
                    href="#dashboard_"
                  >
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    role="tab"
                    data-toggle="tab"
                    href="#biddingRequest"
                  >
                    Bidding Requests
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    role="tab"
                    data-toggle="tab"
                    href="#reviews"
                  >
                    Payment
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    role="tab"
                    data-toggle="tab"
                    href="#listings"
                  >
                    Pridict Rent
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="row tab-pane active row_dash justify-content-center"
                  id="dashboard_"
                  role="tabpanel"
                >
                  <div className="dashsection">
                    <div className="dashItems" id="bid">
                    {biddingData && !loading && (
                      <div className="totalBids">
                        <h5>Your total Bids</h5>

                        <h3>{biddingData.length} Bids</h3>
                      </div>
                    )}
                    </div>
                    <div className="dashItems" id="req">
                      <div className="totalReq">
                        <h5>Your total Reviews</h5>

                        <h3>40 Reviews</h3>
                      </div>
                    </div>
                    <div className="dashItems" id="Amt">
                      <div className="totalAmt">
                        <h5>Your Amount in wallet</h5>

                        <h3>Rs .50,000</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="row tab-pane rorow_dash"
                  id="biddingRequest"
                  role="tabpanel"
                >
                  {biddingData && !loading && (
                    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Property</th>
                          <th scope="col">Bid Amount</th>
                          <th scope="col">Status</th>
                          
                        </tr>
                      </thead>
                      {biddingData.map((bid, index) => (
                        <tbody key={index}>
                          <tr>
                            <th scope="row">{bid.name}</th>
                            <td>{bid.title}</td>
                            <td>{bid.amount}</td>
                            <td>
                            {renderButton(bid)}
                            </td>
                            {/* <td>
                              <button
                                type="button"
                                class="btn btn-outline-danger"
                                data-toggle="modal"
                                data-target="#exampleModalCenterDelete"
                              >
                                Delete
                              </button>
                            </td> */}
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  )}

                  {/* Modal Popup Screen For Approval */}
                  <div
                    class="modal fade"
                    id="exampleModalCenter"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title " id="exampleModalCenterTitle">
                            Bidding Request Details
                          </h4>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div className="container">
                            <div className="row row_bidDetails">
                              <div className="col-md-6">
                                <h6 className="bid_detilHead">Name : </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>Eman Zulfikar</h6>
                              </div>
                            </div>

                            <div className="row row_bidDetails">
                              <div className="col-md-6">
                                <h6 className="bid_detilHead">Email : </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>eman@gmail.com</h6>
                              </div>
                            </div>

                            <div className="row row_bidDetails">
                              <div className="col-md-6">
                                <h6 className="bid_detilHead">Price :</h6>
                              </div>
                              <div className="col-md-6">
                                <h6>Rs. 34000</h6>
                              </div>
                            </div>

                            <div className="row row_bidDetails">
                              <div className="col-md-6">
                                <h6 className="bid_detilHead">Tour : </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>12 :00</h6>
                              </div>
                            </div>
                            <div className="row row_bidDetails">
                              <div className="col-md-6">
                                <h6 className="bid_detilHead">Property : </h6>
                              </div>
                              <div className="col-md-6">
                                <h6>Model Colony, Airport</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-success">
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Popup Screen For Delete*/}
                  <div
                    class="modal fade"
                    id="exampleModalCenterDelete"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header model_deleteHead">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Confirmation !!!
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Are you sure to want to delete this bid??
                        </div>
                        <div class="modal-footer modal_delFooter">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-danger">
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row tab-pane row_dash"
                  id="reviews"
                  role="tabpanel"
                >
                  Payment
                </div>

                <div
                  className="row tab-pane row_dash"
                  id="listings"
                  role="tabpanel"
                >
                  Predict Rent
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;

import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import "./houseDetails.css";

export const HouseDetails = () => {
  const { property_id } = useParams();
  console.log("property_id:", property_id);
  const [houses, setHouses] = useState(null);
  const [images, setImages] = useState([]);
  const [popupImageIndex, setPopupImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    time: "",
  });

  useEffect(() => {
    async function getHouse() {
      const res = await fetch(
        `http://localhost/FYP/API/details.php?property_id=${property_id}`
      );
      const data = await res.json();
      setHouses(data.property);
      setImages(data.images);
      setLoading(false);
    }

    getHouse();
  }, [property_id]);
  const openPopup = (index) => {
    setPopupImageIndex(index);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost/FYP/profile.php", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const retrievedUserId = data.profile.id;
          setUserId(retrievedUserId);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

 
  const handleNegotiationRequest = () => {
    // Fetch the user ID from the state
    const user_id = userId;
  
    // Fetch the property ID from the URL parameter
    const propertyId  = property_id;
  
    // Destructure the form data
    const {name, email, phone, amount, time } = formData;
  
    // Create the payload for the API request
    const payload = {
      userId: user_id,
      property_id: propertyId, 
      name,
      email,
      amount,
      phone,
      time
    };
  
    // Make the API request to insert the data into the bidding table
    fetch('http://localhost/FYP/bidding.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bidding data:', data);
        // Handle the response or perform any necessary actions
      })
      .catch((error) => {
        console.error('Error inserting bidding data:', error);
        // Handle the error or display an error message
      });
  
    setShowModal(true);
  };

  const closePopup = () => {
    setPopupImageIndex(null);
  };

  const navigateLeft = () => {
    setPopupImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const navigateRight = () => {
    setPopupImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout>
      <section class="mt-5 propertydisplay">
        <div class="container">
          <div class="row">
            <div class="col-md-10 PropertyDetail">
              <p>
                Rental Hub &#8250; <span></span>
                {houses.city} Property &#8250; <span></span> {houses.area}{" "}
                &#8250;<span></span>{" "}
                <span class="sizeft">{houses.size} sqft Flat</span>
              </p>
            </div>
            <div class="col-md-2">
              <button class="Searchbtn" type="search">
                Back to Search <i class="fa fa-search"></i>
              </button>
            </div>
            <div class="col-md-9 PropertyDetail PropertyDetailName mt-2">
              <h4>
                {houses.title} I PKR{" "}
                <span class="PropertyPrice">{houses.price}</span>
              </h4>
            </div>
            <div class="col-md-3 mt-3 PropertyLocationDate">
              <p>
                Posted on - <span> {houses.datePosted} </span>{" "}
              </p>
            </div>
            <div class="PropertyLocation">
              <p>
                {" "}
                <i class="fas fa-map-marker-alt LocationIcon"></i>
                {houses.area} , {houses.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------IMAGES-------------------------- */}
      <section className="gallery">
        <div className="container image-container">
          <div className="row">
            {images.map((image, index) => (
              <a
                href="#"
                className="image property"
                key={index}
                onClick={() => openPopup(index)}
              >
                <img
                  src={`http://localhost/FYP/API/uploads/${image.image}`}
                  alt={`Property ${index}`}
                />
              </a>
            ))}
            {popupImageIndex !== null && (
              <>
                <div className="popup-overlay"></div>
                <div className="popup">
                  <img
                    src={`http://localhost/FYP/API/uploads/${images[popupImageIndex].image}`}
                    alt={`Image ${popupImageIndex}`}
                  />
                  <div className="popup-arrow left" onClick={navigateLeft}>
                    <i className="fa fa-angle-left"></i>
                  </div>
                  <div className="popup-arrow right" onClick={navigateRight}>
                    <i className="fa fa-angle-right"></i>
                  </div>
                  <div className="popup-close" onClick={closePopup}>
                    <i className="fa fa-times"></i>
                  </div>
                </div>
                <div className="blur-background"></div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------DESCRIPTION------------------------------------ */}
      <section class="mt-5 PropertyDesc">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h6>
                {houses.title}, {houses.city}
              </h6>
              <span class="BedroomIcon">
                <i class="fa fa-bed" aria-hidden="true"></i>
                {houses.beds}
              </span>
              <span class="ShowerIcon">
                {" "}
                <i class="fa fa-bath" aria-hidden="true"></i>
                {houses.bathrooms}
              </span>
              <p class="mt-4">{houses.description}</p>
              <h6>Key features:</h6>
              <ul>
                <li>{houses.features}</li>
              </ul>
              <p class="PropertyRecom">
                We highly recommend viewing this property.
              </p>
            </div>
            <div class="col-md-4 mb-5 SideProfileInfo">
              <form>
                <h4 class="mt-3">
                  PKR <span>{houses.price}</span>
                </h4>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    id="exampleInputName1"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    class="form-control mb-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    class="form-control mb-4"
                    id="exampleInputphone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    class="form-control mb-4"
                    id="exampleInputAmount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    class="form-control"
                    id="exampleInputvh"
                    placeholder="Visiting hrs"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                  <button type="submit" class="formbtn mt-4">
                    Send Email
                  </button>
                  {/* <button type="submit" class="formbtn mt-4">Send Request For Negotiation</button> */}
                  <button
                    type="button"
                    class="formbtn mt-4"
                    onClick={handleNegotiationRequest}
                  >
                    Send Request For Negotiation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="popup-container">
          <div className="popup-content">
            <h3>Request for Negotiation</h3>
            <p>Enter your negotiation details here.</p>
            {/* ...additional input fields, buttons, etc. for negotiation form... */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HouseDetails;

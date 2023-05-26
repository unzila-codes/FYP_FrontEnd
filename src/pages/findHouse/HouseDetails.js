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

  const closePopup = () => {
    setPopupImageIndex(null);
  };

  const navigateLeft = () => {
    setPopupImageIndex(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  const navigateRight = () => {
    setPopupImageIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
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
      <section className="gallery" >
        <div className="container image-container">
          <div className="row">
          {images.map((image, index) => (
            <a href="#" className="image property" key={index} onClick={() => openPopup(index)}>
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
                <img src={`http://localhost/FYP/API/uploads/${images[popupImageIndex].image}`} alt={`Image ${popupImageIndex}`} />
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
        <h6>{houses.title}, {houses.city}</h6>
        <span class="BedroomIcon"><i class="fa fa-bed" aria-hidden="true"></i>{houses.beds}</span>
         <span class="ShowerIcon"> <i class="fa fa-bath" aria-hidden="true"></i>{houses.bathrooms}</span>
        <p class="mt-4">{houses.description}</p>
        <h6>Key features:</h6>
        <ul>
            <li>{houses.features}</li>
        </ul>
        <p class="PropertyRecom">We highly recommend viewing this property.</p>
      </div>
      <div class="col-md-4 mb-5 SideProfileInfo">
        <form>
            <h4 class="mt-3">PKR <span>{houses.price}</span></h4>
            <div class="form-group">
              <input type="text" class="form-control mb-4" id="exampleInputName1"  placeholder="Name" required/>
              <input type="email" class="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp"
                 placeholder="Email" required/>
              <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Phone" required/>
              <button type="submit" class="formbtn mt-4">Send Email</button>
              <button type="submit" class="formbtn mt-4">Send Request For Negotiation</button>
            </div>
          </form>
         
          
    </div>
    </div>
   </div>
</section>


    </Layout>
  );
};

export default HouseDetails;

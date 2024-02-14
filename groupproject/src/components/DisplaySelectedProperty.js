import React from 'react'
import { useParams } from 'react-router-dom';
import Properties from "../database/Properties.json"
import "../styles/displayselectedproperty.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"
import formatPrice from '../utils/formatPrice';
import bedIcon from "../Images/bed-icon.png";
import bathIcon from "../Images/bath-icon.png";

function DisplaySelectedProperty() {
    let { property_id } = useParams();
    property_id = Number(property_id);
    const getPropertyDetails = Properties.properties.filter(property => {
        if (property_id === property.property_id) return property;
    })

    let propertyImgs = Object.values(getPropertyDetails[0].img);
    const renderImgTags = propertyImgs.map((imgLink, index) => {
        return <img key={index} src={imgLink} class='sliderimg'></img>
    });

    const gardenPresent = getPropertyDetails[0].garden ? gardenPresent = "Available" : "Not Available"

    console.log(getPropertyDetails);
    return (
        <div className='carousel-container'>
            <AliceCarousel mouseTrackingEnabled>
                {renderImgTags}
            </AliceCarousel>
            <div className='new-home'>NEW HOME</div>
            <div className='address-info'>
                <p>{getPropertyDetails[0].address.firstLine}</p>
                <p>, {getPropertyDetails[0].address.city}</p>
                <p>, {getPropertyDetails[0].address.postcode}</p>
            </div>
            <div className='price-info'>
                <p>{'£' + formatPrice(getPropertyDetails[0].price)}</p>
            </div>
            <ul className='property-info'>
            <li>{getPropertyDetails[0].type}</li>
            <li><img className='bed-icon' src={bedIcon}></img> </li>
            <li>{getPropertyDetails[0].bedrooms}</li>
            <li><img className='bath-icon' src={bathIcon}></img> </li>
            <li>{getPropertyDetails[0].bathrooms}</li>
            <li>Garden {gardenPresent}</li>
            </ul>
        </div>
    )
}

export default DisplaySelectedProperty

import React from 'react';
import { Link } from 'react-router-dom';
import "./searchItem.css";

export const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img alt={item.name} className="siImg"
        src={item.photos[0] ? item.photos[0] : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1" }  
        />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">
                Studio Apartment with Air conditioning
            </span>
            <span className="siFeatures">
                {item.description}
            </span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today
            </span>
        </div>
        <div className="siDetails">
        {item.rating && 
            <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>
        }
            
            <div className="siDetailsTexts">
                <span className="siPrice">${item.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                    <button className="siCheckButton">See availability</button>
                </Link>
                
            </div>
        </div>
    </div>  
  )
}

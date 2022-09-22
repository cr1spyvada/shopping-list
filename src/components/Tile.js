import React from "react";
import "../styles/Tile.scss";

const Tile = ({ data }) => {
  const { title, description, price, rating, brand, category, thumbnail } =
    data;
  return (
    <div className="tile">
      <img src={thumbnail} alt="Thumbnail not found :(" />
      <div className="details">
        <div className="row">
          <h3>{title}</h3>
          <h4>${price}</h4>
        </div>
        <div className="row">{description}</div>
        <div className="row">
          <span>{rating}⭐</span> <span>{brand}</span>
        </div>
      </div>
    </div>
  );
};

export default Tile;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/favouritePage.css";

function FavouritesPage() {
  const [favourite, setFavourite] = useState([]);

  function removeFavourite(item) {
    const updatedFav = favourite.filter((el) => el.login !== item.login);
    setFavourite(updatedFav);
    localStorage.setItem("favourites", JSON.stringify(updatedFav));
  }

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourite(savedFav);
  }, []);

  return (
    <div className="favPageWrapper">
      <div className="favPage">
        <div className="favHeader">
          <h1>Favourites</h1>
          <Link to="/" className="backHomeLink">
            &larr; Back to Search
          </Link>
        </div>

        {favourite.length === 0 ? (
          <div className="noFavsBox">
            <p>No favourites added yet.</p>
          </div>
        ) : (
  
          <div className="favGrid">
            {favourite.map((item) => (
              <div key={item.login} className="favUserCard">
                <div className="favUserInfo">
                  <img
                    src={item.avatar_url}
                    alt={item.login}
                    className="favAvatar"
                  />
                  <Link to={`/user/${item.login}`} className="favUserLink">
                    {item.login}
                  </Link>
                </div>
                <button
                  className="removeFavBtn"
                  onClick={() => removeFavourite(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouritesPage;

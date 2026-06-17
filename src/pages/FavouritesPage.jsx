import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <>
      <h1>Favourites Page</h1>

      {favourite.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        favourite.map((item) => (
          <div
            key={item.login}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <button onClick={() => removeFavourite(item)}>Remove</button>
            <img
              src={item.avatar_url}
              alt={item.login}
              width="50"
              height="50"
              style={{ borderRadius: "50%" }}
            />

            <Link to={`/user/${item.login}`}>{item.login}</Link>
          </div>
        ))
      )}
    </>
  );
}

export default FavouritesPage;

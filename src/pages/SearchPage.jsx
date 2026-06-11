import React from "react";
import { Link, useParams } from "react-router-dom";

function SearchPage() {
  const { username, reponame } = useParams();
  return (
    <div>
      <h1>SearchPage</h1>

      <Link to="/">Search</Link>
      <br />
      <Link to={`/user/${username}`}>Profile</Link>
      <br />

      <Link to={`/user/${username}/repo/${reponame}`}>Repo</Link>
      <br />

      <Link to="/favourites">Favourites</Link>
    </div>
  );
}

export default SearchPage;

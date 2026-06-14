import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/SearchPage.css";
import Spinner from "../components/spinner";

function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  async function handleSearch() {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (response.status === 404) {
        setError("User not found.Please check the username.");
        return;
      }
      navigate(`/user/${username}`);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>SearchPage</h1>
      <Link to="/">Search</Link>
      <br />

      <div className="searchBar">
        <input
          type="text"
          placeholder="Type Github username"
          onChange={handleUsername}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        ></input>
        <button onClick={handleSearch}>SEARCH PROFILE</button>
      </div>
      {isLoading && <Spinner />}
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default SearchPage;

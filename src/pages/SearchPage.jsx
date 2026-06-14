import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/SearchPage.css";

function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handleSearch() {
    navigate(`/user/${username}`);
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
    </>
  );
}

export default SearchPage;

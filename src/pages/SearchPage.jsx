import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/SearchPage.css";
import Spinner from "../components/spinner";

function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Browser History
  //1.Intialize state from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("recentUsernames");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });

  //2.Sync to localStorage whenever "history" state changes
  useEffect(() => {
    localStorage.setItem("recentUsernames", JSON.stringify(history));
  }, [history]);

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
      //saving username on successful search
      setHistory((prev) => {
        const updated = [username, ...prev.filter((u) => u !== username)];
        if (updated.length > 5) {
          updated.pop();
        }
        return updated;
      });

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
        {history.length > 0 && (
          <div className="searchHistory">
            <p>Recent Searches:</p>
            {history.map((user) => (
              <button key={user} onClick={() => navigate(`/user/${user}`)}>
                {user}
              </button>
            ))}
          </div>
        )}
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

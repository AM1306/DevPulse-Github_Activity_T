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
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("recentUsernames");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });

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

      setHistory((prev) => {
        const updated = [username, ...prev.filter((u) => u !== username)];
        if (updated.length > 5) {
          updated.pop();
        }
        return updated;
      });

      navigate(`/user/${username}`);
    } catch (error) {
      setError("Something went wrong. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="searchPage">
      <h1>DEVPULSE</h1>
      <h2>GitHub Activity Tracker</h2>
      <Link to="/favourites" className="favouriteLink">
        Favourites
      </Link>
      <br />

      {/* Main Search wrapper container */}
      <div className="searchContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Type Github username"
            onChange={handleUsername}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button onClick={handleSearch}>SEARCH PROFILE</button>
        </div>

        {/* Moved recent searches below the input bar */}
        {history.length > 0 && (
          <div className="searchHistory">
            <p>Recent Searches:</p>
            <div className="historyTags">
              {history.map((user) => (
                <button key={user} onClick={() => navigate(`/user/${user}`)}>
                  {user}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading && <Spinner />}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SearchPage;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import Spinner from "../components/spinner";
import useFetch from "../hooks/useFetch";
import "../CSS/repoDetails.css";

function RepoDetailPage() {
  const { username, reponame } = useParams();
  const [commits, setCommits] = useState([]);
  const [readme, setReadme] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const {
    data: repoDetails,
    isLoading,
    error,
  } = useFetch(`https://api.github.com/repos/${username}/${reponame}`);

  useEffect(() => {
    async function FetchRepoData() {
      try {
        //Last 5 commits
        const commitsInfo = await fetch(
          `https://api.github.com/repos/${username}/${reponame}/commits`,
        );
        if (!commitsInfo.ok) {
          setFetchError(`Response Error: ${commitsInfo.status}`);
          return;
        }
        const commitsRes = await commitsInfo.json();
        const commitsLast5 = commitsRes.slice(0, 5);
        console.log(commitsLast5);
        setCommits(commitsLast5);

        //README content
        const readmeInfo = await fetch(
          `https://api.github.com/repos/${username}/${reponame}/readme`,
        );

        if (readmeInfo.ok) {
          const readmeRes = await readmeInfo.json();
          const decodedReadme = window.atob(readmeRes.content);
          setReadme(decodedReadme);
        }
      } catch (err) {
        console.error(err);
        setFetchError("Something went wrong");
      }
    }
    FetchRepoData();
  }, [username, reponame]);

  return (
    <div className="repoDetailPageWrapper">
      <div className="repoDetailPage">
        <div className="repoDetailHeader">
          <h1>Repository Details</h1>
          <button
            className="backBtn"
            onClick={() => navigate(`/user/${username}`)}
          >
            &larr; Back to Profile
          </button>
        </div>

        {isLoading && <Spinner />}
        {error && <p className="error">{error}</p>}
        {fetchError && <p className="error">{fetchError}</p>}

        {/* Organized Main Content Layout Container */}
        <div className="repoDetailGrid">
          <RepoCard repo={repoDetails} commitsLast={commits} readme={readme} />
        </div>
      </div>
    </div>
  );
}

export default RepoDetailPage;

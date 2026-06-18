import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import Spinner from "../components/spinner";
import useFetch from "../hooks/useFetch";

function RepoDetailPage() {
  const { username, reponame } = useParams();
  const [commits, setCommits] = useState([]);
  const [readme, setReadme] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  //using the useFetch hook
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
    <div>
      <h1>RepoDetailPage</h1>
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
      {fetchError && <p>{fetchError}</p>}
      <RepoCard repo={repoDetails} commitsLast={commits} readme={readme} />

      <button onClick={() => navigate(`/user/${username}`)}>
        &larr; Back to Profile
      </button>
    </div>
  );
}

export default RepoDetailPage;

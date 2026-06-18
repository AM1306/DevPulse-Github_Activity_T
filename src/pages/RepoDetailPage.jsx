import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import Spinner from "../components/spinner";

function RepoDetailPage() {
  const { username, reponame } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchRepoData() {
      setIsLoading(true);
      setError(null);

      try {
        const repoRes = await fetch(
          `https://api.github.com/repos/${username}/${reponame}`,
        );
        if (!repoRes.ok) {
          setError(`Response Status: ${repoRes.status}`);
          return;
        }
        const repoData = await repoRes.json();
        console.log(repoData);
        setRepoDetails(repoData);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    FetchRepoData();
  }, [username, reponame]);

  return (
    <div>
      <h1>RepoDetailPage</h1>
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
      <RepoCard repo={repoDetails} />
    </div>
  );
}

export default RepoDetailPage;

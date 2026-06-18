import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RepoCard from "../components/RepoCard";
import Spinner from "../components/spinner";

function RepoDetailPage() {
  const { username, reponame } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commits,setCommits]=useState([]);

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

        //Last 5 commits
        const commitsInfo=await fetch(`https://api.github.com/repos/${username}/${reponame}/commits`);
        if(!commitsInfo.ok){
          setError(`Response Error: ${commitsInfo.status}`);
          return;
        }
        const commitsRes= await commitsInfo.json();
        const commitsLast5=commitsRes.slice(0,5);
        console.log(commitsLast5);
        setCommits(commitsLast5);

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
      <RepoCard repo={repoDetails} commitsLast={commits} />
    </div>
  );
}

export default RepoDetailPage;

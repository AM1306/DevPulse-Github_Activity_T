import React from "react";
import { Link, useParams } from "react-router-dom";

function RepoDetailPage() {
  const { username, reponame } = useParams();
  return (
    <div>
      <h1>RepoDetailPage</h1>
      <h2>Username: {username}</h2>
      <h2>Repo: {reponame}</h2>

      <Link to={`/user/${username}/repo/${reponame}`}>Repo</Link>
    </div>
  );
}

export default RepoDetailPage;

import React from "react";
import formatDate from "../utils/formatDate";

function RepoCard({ repo, commitsLast }) {
  if (!repo) return null;
  return (
    <>
      <h3>Repository Name: {repo.name}</h3>
      <h3>Description: {repo.description}</h3>
      <h3>Star Count: {repo.stargazers_count}</h3>
      <h3>Fork Count: {repo.forks_count}</h3>
      <h3>Open Issues: {repo.open_issues_count}</h3>
      <h3>Primary Language: {repo.language}</h3>

      <div className="commitList">
        <h2>Last 5 Commits Details</h2>
        {commitsLast.map((c) => (
          <div key={c.sha}>
            <p>Commit message: {c.commit.message}</p>
            <p>Author: {c.commit.author.name}</p>
            <p>Date: {formatDate(c.commit.author.date)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default RepoCard;

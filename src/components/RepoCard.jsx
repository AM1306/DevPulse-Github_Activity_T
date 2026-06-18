import React from "react";

function RepoCard({ repo }) {
  if (!repo) return null;
  return (
    <>
      <h3>Repository Name: {repo.name}</h3>
      <h3>Description: {repo.description}</h3>
      <h3>Star Count: {repo.stargazers_count}</h3>
      <h3>Fork Count: {repo.forks_count}</h3>
      <h3>Open Issues: {repo.open_issues_count}</h3>
      <h3>Primary Language: {repo.language}</h3>
    </>
  );
}

export default RepoCard;

import React from "react";
// Add any other imports your RepoCard currently uses

function RepoCard({ repo, commitsLast, readme }) {
  if (!repo) return null;

  return (
    <div className="repoCard">
      {/* 1. Top Section: Core Details Layout */}
      <div className="repoMetaSection">
        <h2>{repo.name}</h2>
        {repo.description && (
          <p className="repoDescription">{repo.description}</p>
        )}

        {/* Metric Badges Grid */}
        <div className="repoStatsGrid">
          <div className="statItem">
            <strong>Star Count:</strong>{" "}
            <span>{repo.stargazers_count || 0}</span>
          </div>
          <div className="statItem">
            <strong>Fork Count:</strong> <span>{repo.forks_count || 0}</span>
          </div>
          <div className="statItem">
            <strong>Open Issues:</strong>{" "}
            <span>{repo.open_issues_count || 0}</span>
          </div>
          <div className="statItem">
            <strong>Primary Language:</strong>{" "}
            <span>{repo.language || "None"}</span>
          </div>
        </div>
      </div>

      {/* 2. Bottom Section: Split Columns for Commits and Readme */}
      <div className="repoDetailsContentGrid">
        {/* Left Column: Commits */}
        <div className="commitsContainer">
          <h3>Last 5 Commits Details</h3>
          {commitsLast && commitsLast.length > 0 ? (
            <div className="commitsList">
              {commitsLast.map((c, index) => (
                <div key={c.sha || index} className="commitCard">
                  <p className="commitMsg">
                    <strong>Message:</strong> {c.commit?.message}
                  </p>
                  <p className="commitMeta">
                    <span>
                      <strong>Author:</strong> {c.commit?.author?.name}
                    </span>
                    <span> • </span>
                    <span>
                      <strong>Date:</strong>{" "}
                      {new Date(c.commit?.author?.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="noDataText">No recent commits found.</p>
          )}
        </div>

        {/* Right Column: Readme Document */}
        {readme && (
          <div className="readmeContainer">
            <h3>README.md</h3>
            <div className="readmeContent">
              <pre>{readme}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RepoCard;

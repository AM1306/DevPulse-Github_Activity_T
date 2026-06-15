import React from "react";

function UserCard({ profile }) {
  if (!profile) {
    return <p>No profile data available yet.</p>;
  }
  return (
    <>
      <div className="avatar">
        <img src={profile.avatar_url}></img>
      </div>

      <div className="profileName">
        <h2>{profile.name}</h2>
      </div>

      <div className="profileBio">
        <h2>{profile.bio}</h2>
      </div>

      <div className="profileLocation">
        <h2>{profile.location}</h2>
      </div>

      <div className="profilefollowCount">
        <h2>{profile.followers}</h2>
      </div>

      <div className="profileFollowing">
        <h2>{profile.following}</h2>
      </div>

      <div className="profilePublicRepo">
        <h2>{profile.public_repos}</h2>
      </div>

      <div className="profileURL">
        <a href={profile.html_url} target="_blank">
          View on Github
        </a>
      </div>
    </>
  );
}

export default UserCard;

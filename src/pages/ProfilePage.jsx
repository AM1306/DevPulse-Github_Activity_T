import React from "react";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  const { username } = useParams();

  return (
    <div>
      <h1>ProfilePage</h1>
      <Link to={`/user/${username}`}>Profile</Link>
      <h2>{username}</h2>
    </div>
  );
}

export default ProfilePage;

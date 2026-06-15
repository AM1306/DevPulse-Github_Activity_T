import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [repo, setRepo] = useState([]);
  const [languages, setLanguages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    async function fetchProfileData() {
      setIsLoading(true);
      setError(null);

      try {
        //Fetch profile
        const profileRes = await fetch(
          `https://api.github.com/users/${username}`,
        );
        if (profileRes.status === 404) {
          setError("User not found");
          return;
        }
        const profileData = await profileRes.json();
        setProfile(profileData);

        //Fetch repos
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars`,
        );
        const reposData = await reposRes.json();
        setRepo(reposData.slice(0, 6));

        //fetch languages for each repo and aggregate
        const top6 = reposData.slice(0, 6);
        const langTotal ={};
        for (const repo of top6) {
          const langRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/languages`,
          );
          const langData = await langRes.json();

          for (const [lang, bytes] of Object.entries(langData)) {
            langTotal[lang] = (langTotal[lang] || 0) + bytes;
          }
        }
        setLanguages(langTotal);
      } catch (error) {
        setError("Something went wrong. Please try again later.", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfileData();
  }, [username]);

  return (
    <div>
      <h1>ProfilePage</h1>
      <Link to={`/user/${username}`}>Profile</Link>
    </div>
  );
}

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import UserCard from "../components/userCard";
import LanguageChart from "../components/languageChart";

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
        console.log(profileData);
        setProfile(profileData);

        //Fetch repos
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars`,
        );
        if (!reposRes.ok) {
          setError("User not found or API limit reached.");
          return;
        }
        const reposData = await reposRes.json();
        setRepo(reposData.slice(0, 6));

        //fetch languages for each repo and aggregate
        const top6 = reposData.slice(0, 6);

        //optimized parallel fetching
        const languagePromises = top6.map(async (repo) => {
          const res = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/languages`,
          );
          return res.json();
        });
        //wait for all of them to finish at the same time
        const languageResult = await Promise.all(languagePromises);

        //Aggregate
        const langTotal = {};
        for (const langData of languageResult) {
          for (const [lang, bytes] of Object.entries(langData)) {
            langTotal[lang] = (langTotal[lang] || 0) + bytes;
          }
        }

        setLanguages(langTotal);
      } catch (error) {
        console.error("Fetch error:", error);
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
      {isLoading && <Spinner />}
      {error && <p className="error">{error}</p>}
      <UserCard profile={profile} />
      <br />
      <div className="repoList">
        {repo.map((r) => (
          <div key={r.id}>
            <Link to={`/user/${username}/repo/${r.name}`}>{r.name}</Link>
          </div>
        ))}
      </div>
      <LanguageChart languages={languages} />
    </div>
  );
}

export default ProfilePage;

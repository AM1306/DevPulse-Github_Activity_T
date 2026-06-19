DevPulse — GitHub Activity Tracker

DevPulse is a multi-page React application that lets you explore any GitHub user's profile, repositories, programming languages, and recent commit activity — all pulled live from the public GitHub REST API.

Features:
1.Search any GitHub username and navigate to their profile
2.View avatar, bio, location, followers, following, and public repo count
3.See top 6 repositories sorted by star count
4.Language distribution doughnut chart (aggregated across repos)
5.Last 5 commits per repository with author and timestamp
6.README viewer for any repository
7.Save favourite profiles to revisit later
8.Recent search history saved between sessions

Setup & Installation

Prerequisites:
Node.js (v18 or above)
npm

1.Install dependencies: npm install
2.Start the development server: npm run dev
3. Open in browser:
No API key is required — the app uses the public GitHub REST API.

PAGES:
#Search Page (/): Search for any GitHub username. Shows a loading spinner during the API call, an error message for invalid usernames, and a history of recent searches.
<img width="1278" height="593" alt="image" src="https://github.com/user-attachments/assets/9c231e2c-e76d-4c9c-8a7f-ab1e4b1522d2" />

#Profile Page (/user/:username): Displays the user's avatar, bio, stats, top 6 repositories, and a language distribution chart. Includes a Favourites button to save the profile.
<img width="1169" height="661" alt="image" src="https://github.com/user-attachments/assets/c333d4dd-fed0-4538-9c82-1215f85d1bde" />

#Repository Detail Page (/user/:username/repo/:reponame):Shows repo metadata, last 5 commits with author and date, and the rendered README content.
<img width="1075" height="590" alt="image" src="https://github.com/user-attachments/assets/1debac62-2674-41e9-8dbe-b2f2944a8e7c" />

#Favourites Page (/favourites): Lists all saved profiles with avatar and username. Click any to navigate to their profile, or remove them individually.
<img width="1204" height="503" alt="image" src="https://github.com/user-attachments/assets/52f1fdb2-a157-408c-8ce8-183dcc5f4e00" />


API Limitations

The app uses the unauthenticated GitHub REST API which has the following limits:

-60 requests per hour per IP address
-The Profile page makes up to 8 API calls at once (profile + repos + 6 language fetches) — this can consume your rate limit quickly during testing
-If you hit the limit, the app will show an error message and recover automatically after the hour resets
-To increase the limit to 5,000 requests/hour, you can add a GitHub personal access token — this is not implemented in the current version

Author
Made by Aadhya — Phase 2 Internship Project

import React from "react";
import FavouritesPage from "./pages/FavouritesPage";
import ProfilePage from "./pages/ProfilePage";
import RepoDetailPage from "./pages/RepoDetailPage";
import SearchPage from "./pages/SearchPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SearchPage /> },
    { path: "/user/:username", element: <ProfilePage /> },
    { path: "/user/:username/repo/:reponame", element: <RepoDetailPage /> },
    { path: "/favourites", element: <FavouritesPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

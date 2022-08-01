import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleLogout, setToggleLogout] = useState(false);

  const [user] = useAuthState(auth);

  const username = user?.displayName
    ? user?.displayName
    : user?.email.split("@")[0];
  const userPicture = user?.photoURL ? `${user?.photoURL}` : "/user_image.png";

  const handleSearchOnClick = () => {
    if (!searchQuery) return;
    navigate(`/search/${searchQuery}/1`);
  };

  const handleSearchOnEnter = (key) => {
    if (!searchQuery) return;
    if (key === "Enter") navigate(`/search/${searchQuery}/1`);
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      setToggleLogout(false);
      navigate("/login");
    } catch (error) {
      <p>{error.message}</p>;
    }
  };

  return (
    <div className="bg-default z-50 fixed top-0 left-0 right-0 flex justify-center py-3 shadow-sm">
      <div className="flex justify-between items-center container px-3">
        <div>
          <Link to="/" className="logo flex items-center gap-2 rounded-full">
            <img src="/logo.svg" alt="The Quran logo" className="w-9" />
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-zinc-100 border border-zinc-300 text-zinc-800 p-2 pl-11 w-[28rem] max-w-sm rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => handleSearchOnEnter(e.key)}
          />
          <div className="absolute top-0 left-0 h-full flex items-center justify-center px-3">
            <button onClick={handleSearchOnClick}>
              <img src="/ic_search.svg" alt="search" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-1 hover:bg-zinc-300 rounded-full">
            <img src="/ic_setting.svg" alt="setting" />
          </button>

          {user ? (
            <button className="relative">
              <div
                onClick={() => setToggleLogout(!toggleLogout)}
                className="cursor-pointer flex items-center gap-2 "
              >
                <p>{username}</p>
                <img
                  src={userPicture}
                  alt="Profile"
                  className="w-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/ic_arrow_down.svg"
                  alt="arrow down"
                  className="scale-90"
                />
              </div>

              <div
                onClick={onLogout}
                className={
                  toggleLogout
                    ? "absolute right-0 top-8 bg-zinc-300 hover:bg-zinc-400 py-1 px-3 rounded-md"
                    : "hidden"
                }
              >
                Logout
              </div>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-zinc-800 py-1 px-2 rounded-md hover:bg-zinc-300"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

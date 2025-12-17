import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import "../../css/search/SearchBar.css";

const JAMENDO_CLIENT_ID = "YOUR_JAMENDO_CLIENT_ID";

const SearchBar = ({ setSearchSongs }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchSongs([]);
      return;
    }

    const fetchSongs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.jamendo.com/v3.0/tracks", {
          params: {
            client_id: "ea61a820",
            format: "json",
            limit: 20,
            namesearch: query,
            audioformat: "mp32",
            include: "musicinfo",
          },
        });

        setSearchSongs(res.data.results);
      } catch (error) {
        console.error("Jamendo search failed:", error);
        setSearchSongs([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSongs, 400);
    return () => clearTimeout(debounce);
  }, [query, setSearchSongs]);

  return (
    <div className="searchbar-root">
      <div className="searchbar-input-wrapper">
        <input
          className="searchbar-input"
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <CiSearch className="searchbar-icon" size={20} />
      </div>
      {!query && !loading && (
        <p className="searchbar-empty">Search songs to display 🎧</p>
      )}
      {loading && <p className="searchbar-loading">Searching...</p>}
    </div>
  );
};

export default SearchBar;

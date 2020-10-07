import React, { useState, useEffect } from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Results from "../Results";
import "./Home.css";
const Home = () => {
  const initialText = "";
  const [searchText, setSearchText] = useState(initialText);
  const API_URL = 'https://base.amberstudent.com/api/v0/';
  const [showText, setShowText] = useState(false);
  const [lessCharacters, setLessCharacters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    console.log("-->", searchText);
    if (searchText.length === 0) {
      setShowText(false);
    } else if (searchText.length >= 3) {
      axios
        .get(
          `${API_URL}regions?sort_key=search_name&sort_order=desc&states=active&search_name=${searchText}`
        )
        .then((resp) => {
          const { result } = resp.data.data;
          console.log(result);

          for (let index = 0; index < 5; index++) {
            if (result[index].secondary_name.length > 0) {
              let recent = result[index].secondary_name.split(",")[0];
              if (!recentSearch.includes(recent)) {
                recentSearch.unshift(recent);
                setRecentSearch((recentSearch) => recentSearch.slice(0, 4));
              }
              console.log("the recents", recentSearch);
              setLessCharacters(false);
              setSearchResults(result.slice(index, index + 5));
              break;
            }
          }

          setShowText(true);
        })
        .catch((err) => {});
    } else {
      setSearchResults([]);
      setLessCharacters(true);
      setShowText(true);
    }
  }, [searchText]);
  return (
    <div className="Home">
      <div className="Home_headers">
        <h1>Home away from Home</h1>
        <h4>
          Book your student accommodation near top universities across the
          globe.
        </h4>
      </div>

      <div className="Home_search">
        <input
          type="text"
          placeholder="Search By College or City"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {searchText.length !== 0 ? (
          <CancelOutlinedIcon
            className="CancelIcon"
            onClick={() => setSearchText(initialText)}
          />
        ) : (
          <KeyboardArrowDownIcon
            onClick={() => setShowText(!showText)}
            className="Spacing"
          />
        )}

        <button>
          <SearchIcon className="SearchIcon" /> Search
        </button>
        {showText && (
          <Results
            searchText={searchText}
            searchResults={searchResults}
            recentSearch={recentSearch}
            lessCharacters={lessCharacters}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

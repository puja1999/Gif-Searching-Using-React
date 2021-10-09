import React, { useState } from "react";
import './App.css';

const GIPHY_API =
  "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=20&offset=9&q=";

const GifSearch = () => {
  let [search, setSearch] = useState("");
  let [gifs, setGifs] = useState([]);
  let [loading, setLoading] = useState(false);

  let searchGif = () => {
    if (search.length > 0) {
      setLoading(true);

      fetch(GIPHY_API + search)
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((result) => {
          setGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch(() => {
          setLoading(false);
          alert("Something went wrong");
        });
    }
  };
  return (
    <>
      <div className="header">
        <div>
          <input
            type="text"
            placeholder="Search GIFs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchGif}>Search</button>
        </div>
      </div>
      <div className="result">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="list">
            {gifs.map((gif) => {
              return (
                <div className="item">
                  <img src={gif} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default GifSearch;

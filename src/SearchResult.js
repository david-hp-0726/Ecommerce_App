import React from "react";
import { Link } from "react-router-dom";
import "./SearchResult.css";
import { useStateValue } from "./StateProvider";
import productItems from "./data/productItems";
import SearchResultProduct from "./SearchResultProduct";
import SearchIcon from "@mui/icons-material/Search";

function SearchResult() {
  const [{ keyword }, dispatch] = useStateValue();

  const updateKeyword = (typedWord) => {
    dispatch({
      type: "UPDATE_KEYWORD",
      keyword: typedWord,
    });
  };

  const filteredItems = productItems.filter((item) => {
    return item.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="searchResult">
      {filteredItems.length === 0 ? (
        <div className="searchResult__empty">
          <p className="searchResult__noResults">No results for {keyword}</p>
          <p className="searchResult__tryChecking">
            Try checking your spelling or use more general terms
          </p>
          <div className="searchResult__suggest">
            <h2>Suggested Keywords</h2>
          </div>
          <div className="searchResult__suggestedKeywords">
            <Link
              to="/searchResult"
              onClick={() => updateKeyword("All Items")}
              className="searchResult__lineOne"
            >
              <SearchIcon />
              <p>All Items</p>
            </Link>
            <Link
              to="/searchResult"
              onClick={() => updateKeyword("iPad")}
              className="searchResult__lineOne"
            >
              <SearchIcon />
              <div>iPad</div>
            </Link>
            <Link
              to="/searchResult"
              onClick={() => updateKeyword("Apple")}
              className="searchResult__lineOne"
            >
              <SearchIcon />
              <p>Apple</p>
            </Link>
            <Link
              to="/searchResult"
              onClick={() => updateKeyword("speaker")}
              className="searchResult__lineTwo"
            >
              <SearchIcon />
              <div>speaker</div>
            </Link>
            <Link
              to="/searchResult"
              onClick={() => updateKeyword("mixer")}
              className="searchResult__lineTwo"
            >
              <SearchIcon />
              <p>mixer</p>
            </Link>
            <Link
              to="/searchResult"
              onClick={() => updateKeyword("whisk")}
              className="searchResult__lineTwo"
            >
              <SearchIcon />
              <div>whisk</div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="searchResult__found">
          <h2>Results</h2>
          <div className="searchResult__items">
            {filteredItems.map((item) => (
              <SearchResultProduct item={item}></SearchResultProduct>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;

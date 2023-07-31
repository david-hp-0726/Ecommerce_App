import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Header() {
  const [{ user, basket, keyword }, dispatch] = useStateValue();
  const [typedWord, setTypedWord] = useState("");
  const { pathname } = useLocation();

  const updateTypedWord = (event) => {
    const newTypedWord = event.target.value;
    setTypedWord(newTypedWord);
    window.localStorage.setItem("typedWord", newTypedWord);
  };

  const updateKeyword = () => {
    dispatch({
      type: "UPDATE_KEYWORD",
      keyword: typedWord,
    });
  };

  useEffect(() => {
    if (pathname !== "/searchResult") {
      setTypedWord("");
      window.localStorage.setItem("typedWord", "");
    } else if (keyword.toLowerCase() === "all items") {
      setTypedWord("ALL ITEMS");
      window.localStorage.setItem("typedWord", "ALL ITEMS");
    } else if (keyword != typedWord) {
      setTypedWord(keyword);
      window.localStorage.setItem("typedWord", keyword);
    }
  }, [pathname, keyword]);

  useEffect(() => {
    setTypedWord(window.localStorage.getItem("typedWord"));
    dispatch({
      type: "UPDATE_KEYWORD",
      keyword: window.localStorage.getItem("typedWord"),
    });
  }, []);

  return (
    <nav className="header">
      {/* logo ---> image */}
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      {/* search bar */}
      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          placeholder="search for items"
          value={typedWord}
          onChange={updateTypedWord}
        />
        <Link to="/searchResult" onClick={updateKeyword}>
          <SearchIcon className="header__searchIcon" />
        </Link>
      </div>
      {/* 3 links */}
      <div className="header__nav">
        {/* 1st link */}

        {user ? (
          <Link to="/" className="header__link" onClick={() => signOut(auth)}>
            <div className="header__option">
              <span className="header__optionLineOne">
                Hello {user.email.split("@")[0]}
              </span>
              <span className="header__optionLineTwo">Sign out</span>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Please</span>
              <span className="header__optionLineTwo">Sign in</span>
            </div>
          </Link>
        )}

        {/* 2nd link */}
        <Link to="/orders" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        {/* 3rd link */}
        <Link to="/checkout">
          <div className="header__optionBasket">
            {/* shopping basket */}
            <ShoppingBasketIcon />
            {/* number of items */}
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length === 0 ? "" : basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;

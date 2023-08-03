import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import chentechLogo from "../static/chentech.png";

function Header() {
  const [{ user, basket, keyword }, dispatch] = useStateValue();
  const [typedWord, setTypedWord] = useState("");
  const { pathname } = useLocation();
  const [displayDropdown, setDisplayDropdown] = useState(false);
  let dropdownRef = useRef();

  // Manage search bar
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

  // Manage log out button
  useEffect(() => {
    let handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDisplayDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <nav className="header minWidth">
      {/* logo ---> image */}
      <div className="header__logoContainer">
        <Link to="/" className="header__logoContainer">
          <img className="header__logo" src={chentechLogo} alt="" />
        </Link>
      </div>
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
          <div className="dropdown">
            <Link className="header__link" ref={dropdownRef}>
              <div className="header__option">
                <span className="header__optionLineOne defaultCursor">
                  Hello {user.email.split("@")[0]}
                </span>
                <span
                  className="header__optionLineTwo"
                  onClick={() => setDisplayDropdown(true)}
                >
                  Sign out
                </span>
              </div>
              <i class={`arrow ${displayDropdown ? "display" : ""}`}></i>
              <div
                className={`dropdown-content defaultCursor ${
                  displayDropdown ? "display" : ""
                }`}
              >
                <button
                  className="dropdown-button"
                  onClick={() => signOut(auth)}
                >
                  sign out
                </button>
              </div>
            </Link>
          </div>
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
              {basket?.length === 0 ? " " : basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;

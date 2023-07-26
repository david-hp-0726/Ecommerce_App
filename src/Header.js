import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useStateValue } from "./StateProvider";

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const [typedWord, setTypedWord] = useState("");
  const { pathname } = useLocation();

  const updateTypedWord = (event) => {
    const newTypedWord = event.target.value;
    setTypedWord(newTypedWord);
  }

  const updateKeyword = () => {
    dispatch({
      type: "UPDATE_KEYWORD",
      keyword: typedWord
    })
  }
  
  useEffect(() => {
    if (pathname !== '/searchResult') {
      setTypedWord("")
    }
  }, [pathname])
  
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
          placeholder="search for item"
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
        <Link to="/login" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Hello David</span>
            <span className="header__optionLineTwo">Sign in</span>
          </div>
        </Link>

        {/* 2nd link */}
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        {/* 3rd link */}
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
        </Link>

        {/* 4th link */}
        <Link to="/checkout">
          <div className="header__optionBasket">
            {/* shopping basket */}
            <ShoppingBasketIcon />
            {/* number of items */}
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;

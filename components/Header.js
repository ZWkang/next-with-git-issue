import React from "react";

const {
  header: { avatar, username = "" }
} = require("../config/client-config");

import "./Header.scss";
const Header = () => {
  return (
    <header className="pageHeader">
      <div className="pageHeader-container">
        <nav className="pageHeader-navbar">
          <a className="pageHeader-navbar-userinfo" href="/">
            {avatar ? (
              <img
                className="pageHeader-navbar-userinfo__avatar"
                src={avatar}
              />
            ) : null}
            <span className="pageHeader-navbar-userinfo__username">
              {username}
            </span>
          </a>
          <div className="pageHeader-navbar-bloglinks">
            <a
              aria-label="test"
              className="pageHeader-navbar-bloglinks__link"
              href="/"
            >
              首页
            </a>
            {/* <a
              href="/tags"
              aria-label="test"
              className="pageHeader-navbar-bloglinks__link"
            >
              分类
            </a>
            <a
              href="/about"
              aria-label="test"
              className="pageHeader-navbar-bloglinks__link"
            >
              关于我
            </a> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

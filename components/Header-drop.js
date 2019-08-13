import React from "react";
import "./header.scss";

const Header = props => {
  return (
    <nav id="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div />
        </div>
        <div className="navbarIndex">
          <div className="navbar-start">
            <a className="navbar-item">
              <span className="navbar-item-description">首页</span>
            </a>
            {/* <a className="navbar-item">
              <span className="navbar-item-description">分类</span>
            </a>
            <a className="navbar-item">
              <span className="navbar-item-description">关于我</span>
            </a> */}
          </div>
          {/* <div className="navbar-end" /> */}
        </div>
      </div>
    </nav>
  );
};
export default Header;

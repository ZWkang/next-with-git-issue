import React from "react";

import "./footer.scss";

function firstLetter(str) {
  return str ? str.substr(0, 1) : undefined;
}

const Footer = props => {
  const {
    github,
    link,
    githubDescription,
    linkDescription,
    designmsg,
    copyright,
    filing
  } = props;
  return (
    <footer id="footer">
      <ul className="link-icons">
        <li className="link-icons-item">
          {github ? (
            <a
              href={github}
              // data-description={firstLetter(githubDescription)}
              target="_blank"
              noreferrer="true"
            >
              {firstLetter(githubDescription)}
            </a>
          ) : null}
          {link ? (
            <a
              // data-description={firstLetter(linkDescription)}
              href={link}
              target="_blank"
              noreferrer="true"
            >
              {firstLetter(linkDescription)}
            </a>
          ) : null}
        </li>
      </ul>
      <div className="footer-messages">
        <p className="footer-messages__designmsg">{designmsg}</p>
        <p className="footer-messages__copyright">{copyright}</p>
        <p className="footer-messages__filing">{filing}</p>
      </div>
    </footer>
  );
};

export default Footer;

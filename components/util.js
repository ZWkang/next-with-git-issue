import React from "react";
import Footer from "./Footer";

const {
  footer: {
    github,
    link,
    linkDescription,
    githubDescription,
    designmsg,
    copyright,
    filing
  }
} = require("../config/client-config");

export const RenderFooter = () => (
  <Footer
    github={github}
    link={link}
    linkDescription={linkDescription}
    githubDescription={githubDescription}
    designmsg={designmsg}
    copyright={copyright}
    filing={filing}
  />
);

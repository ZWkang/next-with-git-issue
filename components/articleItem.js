import React from "react";
import Link from "next/link";

const { detailPrefix } = require("../config/client-config");

import "./articleitem.scss";

const ArticleItem = props => {
  const { title, preview, link } = props;

  return (
    <>
      <section className="article-item">
        <Link href={`${detailPrefix}/[id]`} as={link}>
          <a className="article-item__link">
            <h2 className="article-item__title">{title}</h2>
          </a>
        </Link>

        <p className="article-item__preview"> {preview}</p>
        <Link href={`${detailPrefix}/[id]`} as={link}>
          <a className="article-item__link">阅读></a>
        </Link>
      </section>
    </>
  );
};

export default ArticleItem;

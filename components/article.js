import React from "react";
import Head from "next/head";

import { test } from "./test";
import "./github-markdown-css.scss";
import "./article.scss";

import AllIssueData from "../issue.json";

class Article extends React.PureComponent {
  render() {
    const { id } = this.props;
    let pageJson = {};
    if (id) {
      pageJson = AllIssueData[id] || {};
    }

    const { bodyHTML: html, title = "首页", createdAt } = pageJson;
    return (
      <article className="article markdown-body">
        <Head>
          <title>{title}</title>
          />
        </Head>
        <div className="article__wrapper">
          <h1 className="article__title">{title}</h1>
          <div className="article-description">
            <span className="article-description__time">{createdAt}</span>
          </div>
          <div
            className="article__content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
    );
  }
}

export default Article;

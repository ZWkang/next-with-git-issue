import React from "react";
import ArticleItem from "./articleItem";
import AllJsonData from "../issue.json";
import "./articlelist.scss";

const ArticleList = props => {
  const jsonMapKeys = Object.keys(AllJsonData);
  const ArticleListData = jsonMapKeys.map(key => {
    return AllJsonData[key];
  });
  return (
    <div className="article-list">
      {ArticleListData.map(item => {
        return (
          <ArticleItem
            title={item.title}
            link={item.virtualPath}
            preview={item.preview}
            key={item.databaseId}
          />
        );
      })}
    </div>
  );
};

export default ArticleList;

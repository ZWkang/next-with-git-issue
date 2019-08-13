import React, { useEffect } from "react";
import Layout from "../components/Layout";

import Header from "../components/Header";
// import ArticleList from "../components/articleList";
import MarkupPosition from "../components/MarkupPosition";
// import AllJsonData from "";
// import Footer from "../components/Footer";
import { RenderFooter } from "../components/util";

import dynamic from "next/dynamic";

const ArticleList = dynamic(() => import("../components/articleList"));

const renderLayoutBody = props => {
  return (
    <>
      <MarkupPosition />
      <Header />
      <ArticleList />
    </>
  );
};
const Index = () => {
  return <Layout body={renderLayoutBody} footer={RenderFooter} />;
};

Index.getInitialProps = () => ({});

export default Index;

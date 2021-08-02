import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import Header from "../components/Header";
import MarkupPosition from "../components/MarkupPosition";
import { RenderFooter } from "../components/util";

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

import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
// import Article from "";
import MarkupPosition from "../../components/MarkupPosition";
import dynamic from "next/dynamic";

// import "highlight.js/styles/github.css";
// import hljs from "highlight.js/lib/highlight";
// import javascript from "highlight.js/lib/languages/javascript";

import { RenderFooter } from "../../components/util";

const Article = dynamic(() => import("../../components/article"));

import { useRouter } from "next/router";

function Detail(props) {
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   hljs.registerLanguage("javascript", javascript);
  // }, []);

  function handleBodyRender() {
    return (
      <>
        <MarkupPosition />
        <Header />
        <Article id={id} />
      </>
    );
  }
  return (
    <>
      <Layout body={handleBodyRender} footer={RenderFooter} />
    </>
  );
}

Detail.getInitialProps = ({ props }) => ({});
export default Detail;

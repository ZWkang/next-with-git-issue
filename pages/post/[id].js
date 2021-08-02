import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { RenderFooter } from "../../components/util";
import MarkupPosition from "../../components/MarkupPosition";

const Article = dynamic(() => import("../../components/article"));

function Detail(props) {
  const router = useRouter();
  const { id } = router.query;

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
    <Layout body={handleBodyRender} footer={RenderFooter} />
  );
}

export default Detail;

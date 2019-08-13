import react from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";

export default props => (
  <div>
    <Head>
      <title>about page</title>
    </Head>
    <Layout body={() => <h1>zheli</h1>} />
  </div>
);

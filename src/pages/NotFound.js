import React from "react";
import Header from "parts/Header";
import PageErrorMessage from "parts/PageErrorMessage";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";

const NotFound = () => {
  return (
    <>
      <Header theme="black" position="relative" />
      <PageErrorMessage />
      <Sitemap />
      <Footer />
    </>
  );
};

export default NotFound;

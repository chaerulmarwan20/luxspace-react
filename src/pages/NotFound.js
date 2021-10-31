import React from "react";
import Document from "parts/Document";
import Header from "parts/Header";
import PageErrorMessage from "parts/PageErrorMessage";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";

const NotFound = () => {
  return (
    <Document>
      <Header theme="black" position="relative" />
      <PageErrorMessage />
      <Sitemap />
      <Footer />
    </Document>
  );
};

export default NotFound;

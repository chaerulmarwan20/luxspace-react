import React from "react";
import Header from "parts/Header";
import Breadcrumb from "components/Breadcrumb";
import ProductDetails from "parts/Details/ProductDetails";
import Suggestion from "parts/Details/Suggestion";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";

const Details = () => {
  return (
    <>
      <Header theme="black" position="relative" />
      <Breadcrumb
        list={[
          { url: "/", name: "Home" },
          { url: "/categories/1", name: "Office Room" },
          { url: "/categories/1/products/1", name: "Details" },
        ]}
      />
      <ProductDetails />
      <Suggestion />
      <Sitemap />
      <Footer />
    </>
  );
};

export default Details;

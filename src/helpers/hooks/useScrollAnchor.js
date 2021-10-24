import { useLayoutEffect } from "react";

const useScrollAnchor = () => {
  useLayoutEffect(() => {
    const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");
    smoothScrollAnchor.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        if (document.getElementById(this.getAttribute("href").replace("#", "")))
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
      });
    });
  }, []);
};

export default useScrollAnchor;

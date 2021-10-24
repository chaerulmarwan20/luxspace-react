import { useLayoutEffect } from "react";
import { addClass } from "helpers/utils";

const useModalDOM = () => {
  return useLayoutEffect(() => {
    const modalTriggers = document.getElementsByClassName("modal-trigger");
    const modalWrapperClassNames = "fixed inset-0 bg-black opacity-35";
    const arrModalTriggers = Array.from(modalTriggers);

    const openModal = (e) => {
      const modalWrapper = document.createElement("div");
      const modalOverlay = document.createElement("div");
      const modalContent = document.createElement("div");

      modalOverlay.addEventListener("click", () => modalWrapper.remove());

      addClass(
        modalWrapper,
        "fixed inset-0 z-40 flex items-center justify-center w-100 min-h-screen"
      );
      addClass(modalOverlay, modalWrapperClassNames);
      addClass(modalContent, "bg-white p-0 md:p-6 z-10");

      modalContent.innerHTML = e.target.attributes?.["data-content"].value;

      modalWrapper.append(modalOverlay);
      modalWrapper.append(modalContent);
      document.body.append(modalWrapper);
    };

    arrModalTriggers.forEach((item) =>
      item.addEventListener("click", openModal)
    );

    return () => {
      arrModalTriggers.forEach((item) =>
        item.removeEventListener("click", openModal)
      );
    };
  }, []);
};

export default useModalDOM;

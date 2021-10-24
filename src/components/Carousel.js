import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import { addClass, removeClass } from "helpers/utils";

const Carousel = ({ children, refContainer }) => {
  const [index, setIndex] = useState(0);

  const refDragHandler = useRef(null);
  const posInitial = useRef();
  const posX1 = useRef();
  const posX2 = useRef();
  const posFinal = useRef();
  const isAllowShift = useRef(true);
  const cards = useRef();

  const containerClientRect = refContainer.current.getBoundingClientRect();

  const threshold = 100;
  const itemToShow = window.innerWidth < 768 ? 1 : 4;
  const directionLeft = "DIRECTION_LEFT";
  const directionRight = "DIRECTION_RIGHT";

  const cardCount = cards.current?.length || 0;
  const cardSize = cards.current?.[0].offsetWidth || 0;

  const checkIndex = useCallback(
    (e) => {
      if (e.propertyName === "left") {
        setTimeout(() => {
          removeClass(refDragHandler.current, "transition-all duration-200");
        }, 200);
      }

      const isMobile = window.innerWidth < 768 ? 0 : -1;
      if (index <= 0) {
        refDragHandler.current.style.left = 0;
        setIndex(0);
      } else if (index >= cardCount - itemToShow) {
        refDragHandler.current.style.left = `${-(
          (cardCount - itemToShow + isMobile) *
          cardSize
        )}px`;
        setIndex(cardCount - itemToShow);
      } else if (index === cardCount || index === cardCount - 1) {
        refDragHandler.current.style.left = `${(cardCount - 1) * cardSize}px`;
        setIndex(cardCount - 1);
      }

      isAllowShift.current = true;
    },
    [cardCount, cardSize, index, itemToShow]
  );

  const shiftItem = useCallback(
    (direction) => {
      addClass(refDragHandler.current, "transition-all duration-200");

      if (isAllowShift.current) {
        if (direction === "DIRECTION_LEFT") {
          setIndex((prev) => prev + 1);
          refDragHandler.current.style.left = `${
            posInitial.current - cardSize
          }px`;
        } else if (direction === "DIRECTION_RIGHT") {
          setIndex((prev) => prev - 1);
          refDragHandler.current.style.left = `${
            posInitial.current + cardSize
          }px`;
        }
      }

      isAllowShift.current = false;
    },
    [cardSize]
  );

  const onDragMove = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      if (e.type === "touchmove") {
        posX2.current = posX1.current - e.touches[0].clientX;
        posX1.current = e.touches[0].clientX;
      } else {
        posX2.current = posX1.current - e.clientX;
        posX1.current = e.clientX;
      }

      refDragHandler.current.style.left = `${
        refDragHandler.current.offsetLeft - posX2.current
      }px`;
    },
    [posX1, posX2]
  );

  const onDragEnd = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      posFinal.current = refDragHandler.current.offsetLeft;

      if (posFinal.current - posInitial.current < -threshold) {
        shiftItem(directionLeft);
      } else if (posFinal.current - posInitial.current > threshold) {
        shiftItem(directionRight);
      } else {
        refDragHandler.current.style.left = `${posInitial.current}px`;
      }

      document.onmouseup = null;
      document.onmousemove = null;
    },
    [shiftItem]
  );

  const onDragStart = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      posInitial.current = refDragHandler.current.offsetLeft;

      if (e.type === "touchstart") {
        posX1.current = e.touches[0].clientX;
      } else {
        posX1.current = e.clientX;
        document.onmouseup = onDragEnd;
        document.onmousemove = onDragMove;
      }
    },
    [onDragEnd, onDragMove]
  );

  const onClick = useCallback((e) => {
    e = e || window.event;
    !isAllowShift.current && e.preventDefault();
  }, []);

  useLayoutEffect(() => {
    const refForwardDragHandler = refDragHandler.current;

    refForwardDragHandler.onmousedown = onDragStart;
    refForwardDragHandler.addEventListener("touchstart", onDragStart);
    refForwardDragHandler.addEventListener("touchend", onDragEnd);
    refForwardDragHandler.addEventListener("touchmove", onDragMove);
    refForwardDragHandler.addEventListener("click", onClick);
    refForwardDragHandler.addEventListener("transitionend", checkIndex);

    return () => {
      refForwardDragHandler.removeEventListener("touchstart", onDragStart);
      refForwardDragHandler.removeEventListener("touchend", onDragEnd);
      refForwardDragHandler.removeEventListener("touchmove", onDragMove);
      refForwardDragHandler.removeEventListener("click", onClick);
      refForwardDragHandler.removeEventListener("transitionend", checkIndex);
    };
  }, [onDragStart, onDragEnd, onDragMove, onClick, checkIndex]);

  useLayoutEffect(() => {
    if (refDragHandler.current) {
      cards.current = refDragHandler.current.getElementsByClassName("card");
    }
  }, []);

  return (
    <div
      className="flex -mx-4 flex-row relative"
      ref={refDragHandler}
      style={{ paddingLeft: containerClientRect.left - 16 }}
    >
      {children}
    </div>
  );
};

export default Carousel;

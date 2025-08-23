import { addClass, removeClass, toggleClass } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {

  // change the .header_wrapper (pos, size, border) docked/floating state by scrolling up/down
  const scrollableWrapper =
    document.getElementsByClassName("scrollable_wrapper")[0];
  scrollableWrapper.onscroll = () => {
    if (scrollableWrapper.scrollTop > 0) {
      addClass("class", "header_wrapper", "floating");
    } else {
      removeClass("class", "header_wrapper", "floating");
    }
  };
});
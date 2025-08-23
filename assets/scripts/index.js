import { addClass, removeClass, toggleClass } from "./main.js";

/** take the data-filter of the pressed button and change its style,
    affecting the other buttons too */
function switchShowcaseButtons(activeFilter) {
  document.querySelectorAll(".showcase_filter > button")
  .forEach(button => {
    if (button.dataset.filter === activeFilter) {
      button.classList.add("enabled");
      button.classList.remove("disabled");
    } else {
      button.classList.remove("enabled");
      button.classList.add("disabled");
    }
  });
}

// apply the selected filter to show only the projects based on data-filter
function applyShowcaseFilters(activeFilter) {
  const showcaseItems = document.querySelectorAll(".showcase_item");
  showcaseItems.forEach(item => {
    if (item.dataset.filter.includes(activeFilter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// change portfolio_col_filter buttons style based on active/clicked
function switchPortfolioButtons(activeFilter) {
  document.querySelectorAll(".portfolio_col_filter > button")
  .forEach(button => {
    if (button.dataset.filter === activeFilter) {
      button.classList.add("enabled");
      button.classList.remove("disabled");
    }
    else {
      button.classList.remove("enabled");
      button.classList.add("disabled");
    }
  });
}

function applyPortfolioFilters(activeFilter) {
  const portfolioGrid = document.getElementsByClassName("portfolio_grid")[0];
  if (activeFilter === "1col") {
    portfolioGrid.classList.add("portfolio_1col");
    portfolioGrid.classList.remove("portfolio_2col");
  }
  else if (activeFilter === "2col") {
    portfolioGrid.classList.add("portfolio_2col");
    portfolioGrid.classList.remove("portfolio_1col");
  }
}

// #region ANIM-PRECONFIG
/* let heroWords = [
  "Video Editor?",
  "Motion Designer?",
  "Graphic Designer?",
  "Branding Designer?",
  "Web Designer?",
  "3D Designer?"
]; */

let heroWords = [
  "Editor de Vídeo?",
  "Animador Gráfico?",
  "Designer Gráfico?",
  "Designer de Marca?",
  "Designer de Sites?",
  "Designer 3D?",
];

let customPath1 =
  "M0.751,0.015 c-0.013,0.007,-0.026,0.016,-0.039,0.025 c-0.089,0.038,-0.213,0.042,-0.255,0.142 c-0.025,0.053,-0.027,0.126,-0.083,0.157 c-0.11,0.042,-0.177,-0.018,-0.24,0.116 c-0.031,0.034,-0.059,0.029,-0.074,0.084 C0.039,0.641,0.016,0.743,0,0.846 c0,0.193,0.279,0.141,0.408,0.154 c0.079,0.002,0.153,-0.027,0.23,-0.036 c0.318,0.034,0.402,-0.059,0.345,-0.376 c-0.029,-0.153,-0.01,-0.304,0.003,-0.457 C0.973,0.017,0.912,0.007,0.819,0.001 c-0.024,-0.002,-0.047,0.003,-0.069,0.014",
  customPath2 =
    "M0.321,0.059 c-0.018,0.007,-0.035,0.017,-0.054,0.022 c-0.157,0.016,-0.136,0.083,-0.172,0.208 C0.06,0.367,0.012,0.441,0.005,0.529 c-0.016,0.083,0.015,0.401,0.08,0.449 c0.017,0.01,0.039,0.012,0.059,0.012 c0.301,-0.03,0.826,0.153,0.828,-0.313 c0.005,-0.059,-0.002,-0.121,-0.043,-0.166 c-0.012,-0.015,-0.024,-0.031,-0.029,-0.05 c-0.016,-0.057,0.02,-0.109,0.049,-0.155 C1,0.014,0.792,-0.048,0.577,0.033 c-0.027,0.009,-0.052,0.023,-0.08,0.026 c-0.058,0.001,-0.118,-0.027,-0.175,0",
  customPath3 =
    "M0.393,0.325 c0.017,-0.013,0.005,-0.044,0.008,-0.063 c0.012,-0.036,0.045,-0.079,0.082,-0.092 c0.032,-0.002,0.06,-0.013,0.082,-0.039 c0.049,-0.047,0.127,-0.123,0.196,-0.083 c0.021,0.038,0.05,0.048,0.088,0.062 c0.098,0.041,0.15,0.152,0.094,0.256 c-0.019,0.041,0.001,0.07,0.02,0.105 c0.053,0.099,0.037,0.226,0.021,0.338 c-0.034,0.155,-0.288,0.16,-0.414,0.171 c-0.162,0.039,-0.145,0.024,-0.274,-0.059 c-0.052,-0.021,-0.112,0.011,-0.089,-0.041 c0.021,-0.043,0.026,-0.069,-0.011,-0.102 c-0.068,-0.067,-0.178,-0.047,-0.165,-0.173 c0,-0.068,0.005,-0.137,0.034,-0.197 c0.012,-0.026,0.025,-0.054,0.024,-0.083 C0.088,0.241,-0.02,0.19,0.003,0.101 C0.039,-0.006,0.194,-0.002,0.286,0.001 c0.041,0.004,0.089,0.035,0.081,0.086 c-0.022,0.068,-0.103,0.092,-0.129,0.161 c-0.023,0.055,0.021,0.062,0.06,0.068 c0.027,0.003,0.069,0.021,0.094,0.009";

let path1_preCompiled = [
  "M1,0 C0.88889,0 0.77778,0 0.66667,0 0.55556,0 0.44444,0 0.33333,0 0.22222,0 0.11111,0 0,0 0,0.11111 0,0.22222 0,0.33333 0,0.44444 0,0.55556 0,0.66667 0,0.77778 0,0.88889 0,1 0.11111,1 0.22222,1 0.33333,1 0.44444,1 0.55556,1 0.66667,1 0.77778,1 0.88889,1 1,1 1,0.88889 1,0.77778 1,0.66667 1,0.55556 1,0.44444 1,0.33333 1,0.22222 1,0.11111 1,0 ",
  "M0.751,0.015 C0.738,0.022 0.725,0.031 0.712,0.04 0.623,0.078 0.499,0.082 0.457,0.182 0.432,0.235 0.43,0.308 0.374,0.339 0.264,0.381 0.197,0.321 0.134,0.455 0.103,0.489 0.075,0.484 0.06,0.539 0.039,0.641 0.016,0.743 0,0.846 0,1.039 0.279,0.987 0.408,1 0.487,1.002 0.561,0.973 0.638,0.964 0.956,0.998 1.04,0.905 0.983,0.588 0.954,0.435 0.973,0.284 0.986,0.131 0.973,0.017 0.912,0.007 0.819,0.001 0.795,-0.001 0.772,0.004 0.75,0.015 ",
],
  path2_preCompiled = [
    "M0.33333,0 C0.22222,0 0.11111,0 0,0 0,0.11111 0,0.22222 0,0.33333 0,0.44444 0,0.55556 0,0.66667 0,0.77778 0,0.88889 0,1 0.11111,1 0.22222,1 0.33333,1 0.44444,1 0.55556,1 0.66667,1 0.77778,1 0.88889,1 1,1 1,0.88889 1,0.77778 1,0.66667 1,0.55556 1,0.44444 1,0.33333 1,0.22222 1,0.11111 1,0 0.88889,0 0.77778,0 0.66667,0 0.55556,0 0.44444,0 0.33333,0 ",
    "M0.321,0.059 C0.303,0.066 0.286,0.076 0.267,0.081 0.11,0.097 0.131,0.164 0.095,0.289 0.06,0.367 0.012,0.441 0.005,0.529 -0.011,0.612 0.02,0.93 0.085,0.978 0.102,0.988 0.124,0.99 0.144,0.99 0.445,0.96 0.97,1.143 0.972,0.677 0.977,0.618 0.97,0.556 0.929,0.511 0.917,0.496 0.905,0.48 0.9,0.461 0.884,0.404 0.92,0.352 0.949,0.306 1,0.014 0.792,-0.048 0.577,0.033 0.55,0.042 0.525,0.056 0.497,0.059 0.439,0.06 0.379,0.032 0.322,0.059 ",
  ],
  path3_preCompiled = [
    "M0.5,0 C0.55556,0 0.61111,0 0.66667,0 0.72222,0 0.77778,0 0.83333,0 0.88889,0 0.94445,0 1,0 1,0.06667 1,0.13333 1,0.2 1,0.26667 1,0.33333 1,0.4 1,0.46667 1,0.53333 1,0.6 1,0.66667 1,0.73333 1,0.8 1,0.86667 1,0.93333 1,1 0.93333,1 0.86667,1 0.8,1 0.73333,1 0.66667,1 0.6,1 0.53333,1 0.46667,1 0.4,1 0.33333,1 0.26667,1 0.2,1 0.13333,1 0.06667,1 0,1 0,0.93333 0,0.86667 0,0.8 0,0.73333 0,0.66667 0,0.6 0,0.53333 0,0.46667 0,0.4 0,0.33333 0,0.26667 0,0.2 0,0.13333 0,0.06667 0,0 0.05556,0 0.11111,0 0.16667,0 0.22222,0 0.27778,0 0.33333,0 0.38889,0 0.44444,0 0.5,0 ",
    "M0.393,0.325 C0.41,0.312 0.398,0.281 0.401,0.262 0.413,0.226 0.446,0.183 0.483,0.17 0.515,0.168 0.543,0.157 0.565,0.131 0.614,0.084 0.692,0.008 0.761,0.048 0.782,0.086 0.811,0.096 0.849,0.11 0.947,0.151 0.999,0.262 0.943,0.366 0.924,0.407 0.944,0.436 0.963,0.471 1.016,0.57 1,0.697 0.984,0.809 0.95,0.964 0.696,0.969 0.57,0.98 0.408,1.019 0.425,1.004 0.296,0.921 0.244,0.9 0.184,0.932 0.207,0.88 0.228,0.837 0.233,0.811 0.196,0.778 0.128,0.711 0.018,0.731 0.031,0.605 0.031,0.537 0.036,0.468 0.065,0.408 0.077,0.382 0.09,0.354 0.089,0.325 0.088,0.241 -0.02,0.19 0.003,0.101 0.039,-0.006 0.194,-0.002 0.286,0.001 0.327,0.005 0.375,0.036 0.367,0.087 0.345,0.155 0.264,0.179 0.238,0.248 0.215,0.303 0.259,0.31 0.298,0.316 0.325,0.319 0.367,0.337 0.392,0.325 ",
  ];
// #endregion

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, TextPlugin, MorphSVGPlugin, ScrollTrigger, ScrollSmoother);
  
  // #region Animate Hero Elements
  let heroMaxTl = gsap.timeline({paused: true, repeat: -1});
  
  let heroCursorTl = gsap.timeline();
  heroCursorTl.to(".animated_cursor", {
    opacity: 0,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power3.inOut"
  }, 0)
  
  let heroWordsTl = gsap.timeline({repeat: -1});
  heroWords.forEach((word) => {
    let heroWordTl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 2.5 });
    heroWordTl.to(".animated_words", {
      duration: 2.5,
      text: word,
      ease: "power2.inOut"
    });
    heroWordTl.to(".lower_phrase", {
      opacity: 1,
        y: "55%",
        duration: 0.5,
        ease: "none"
    });
    heroWordsTl.add(heroWordTl);
    heroMaxTl.add(heroCursorTl, 0);
    heroMaxTl.add(heroWordsTl, 0);
  });

  ScrollTrigger.create({
    trigger: "#hero",
    scroller: ".scrollable_wrapper", // use the .scrollable_wrapper instead of the body
    start: "top bottom",
    end: "bottom top",
    animation: heroMaxTl,
    toggleActions: "play pause resume pause"
  });
  // #endregion

  // #region Animate About Grid Img (clip-paths)
  MorphSVGPlugin.convertToPath("#about_rect1, #about_rect2, #about_rect3");
  const aboutImg1 = document.getElementsByClassName("about_img")[0],
    aboutImg2 = document.getElementsByClassName("about_img")[1],
    aboutImg3 = document.getElementsByClassName("about_img")[2];

  let aboutGridTl = gsap.timeline({paused: true, repeat: -1});

  let aboutImagesTl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
  aboutImagesTl.to("#about_rect1", 0.5, {
      morphSVG: { shape: customPath1, shapeIndex: [-12], type: "linear", precompile: path1_preCompiled },
      delay: 1, ease: "Power1.inOut"
    });
    aboutImagesTl.to("#about_rect2", 0.5, {
      morphSVG: { shape: customPath2, shapeIndex: [-2], type: "linear", precompile: path2_preCompiled },
      delay: 1, ease: "Power1.inOut"
    });
    aboutImagesTl.to("#about_rect3", 0.5, {
      morphSVG: { shape: customPath3, shapeIndex: [18], type: "linear", precompile: path3_preCompiled },
      delay: 1, ease: "Power1.inOut"
    });

  aboutGridTl.add(aboutImagesTl);

  ScrollTrigger.create({
    trigger: ".about_grid",
    scroller: ".scrollable_wrapper",
    start: "top bottom",
    end: "bottom top",
    animation: aboutGridTl,
    toggleActions: "play pause resume pause"
  });
  // #endregion

  // #region Animate Experience Cards
  function animateTlCards (item) {
    let timeline = gsap.timeline();
    timeline.fromTo(item.querySelector(".tl_icon_wrapper"), {opacity: 0, scale: 0}, {duration: 0.5, opacity: 1, scale: 1}, 0);
    timeline.fromTo(item.querySelector(".tl_icon"), {scale: 1.5}, {duration: 1.2, scale: 1}, 0);
    timeline.fromTo(item.querySelector(".tl_date"), {opacity: 0}, {duration: 1, opacity: 1}, 0);
    timeline.fromTo(item.querySelector(".tl_title"), {opacity: 0}, {duration: 1, opacity: 1}, 0);
    timeline.fromTo(item.querySelector(".tl_paragraph"), {opacity: 0}, {duration: 1, opacity: 1}, 0);
    timeline.fromTo(item.querySelector(".tl_card"), {height: "0%"}, {duration: 0.8, ease: "power1.out", height: "100%"}, 0);
    return timeline;
  }

  document.querySelectorAll(".tl_item").forEach(item => {
    ScrollTrigger.create({
      trigger: item,
      horizontal: true,
      scroller: ".timeline_wrapper",
      start: "left center+=100",
      end: "right center-=100",
      animation: animateTlCards(item),
      toggleActions: "restart reset restart reset"
    });
  });

  document.querySelectorAll(".tl_item").forEach(item => {
    ScrollTrigger.create({
      trigger: item,
      scroller: ".scrollable_wrapper",
      start: "top bottom",
      end: "bottom top",
      animation: animateTlCards(item),
      toggleActions: "restart reset restart reset",
    });
  });
  // #endregion

  // open hidden menu when clicked on dropdown button
  document
    .getElementsByClassName("header_dropdown_btn")[0]
    .addEventListener("click", () => {
      toggleClass("class", "header_btn_wrapper", "toggled");
      toggleClass("class", "header_hidden_menu", "toggled");
      toggleClass("class", "arrow_down_icon", "toggled");
      document
        .querySelector(".hidden_menu_nav > ul")
        .classList.toggle("toggled");
    });

  // change the .header_wrapper (pos, size, border) docked/floating state by scrolling up/down
  const scrollableWrapper =
    document.getElementsByClassName("scrollable_wrapper")[0];
  scrollableWrapper.onscroll = () => {
    if (scrollableWrapper.scrollTop > 0) {
      addClass("class", "header_wrapper", "floating");
      addClass("class", "header_btn_wrapper", "floating_header");
    } else {
      removeClass("class", "header_wrapper", "floating");
      removeClass("class", "header_btn_wrapper", "floating_header");
    }
  };

  document.querySelectorAll(".link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        const id = href.substring(hashIndex + 1);
        document.getElementById(id).scrollIntoView({behavior: "smooth"});
      }
    });
  });

  // #region Buttons, Showcase href, Portfolio columns
  document.getElementsByClassName("header_btns")[0].onclick = () => {
    document.getElementById("contacts").scrollIntoView({behavior: "smooth"});
  }

  document.querySelector(".scrolldown_btn > button").onclick = () => {
    document.getElementById("showcase").scrollIntoView({behavior: "smooth"});
  }

  // change the filters on the showcase Section
  document.getElementsByClassName("showcase_filter")[0].addEventListener("click", event => {
    if (event.target.nodeName === "BUTTON" && event.target.classList.contains("disabled")) {
      switchShowcaseButtons(event.target.dataset.filter);
      applyShowcaseFilters(event.target.dataset.filter);
    }
  });

  document.getElementsByClassName("showcase_grid")[0].addEventListener("click", event => {
    if (event.target.nodeName === "IMG" && event.target.dataset.url) {
      window.location.href = event.target.dataset.url;
    }
  });

  document.getElementsByClassName("portfolio_col_filter")[0].addEventListener("click", event => {
    if (event.target.nodeName === "BUTTON" && event.target.classList.contains("disabled")) {
      switchPortfolioButtons(event.target.dataset.filter);
      applyPortfolioFilters(event.target.dataset.filter);
    }
  });
  // #endregion

  /*   document.querySelectorAll(".overscroll_x_wrapper").forEach(wrapper => {
    wrapper.addEventListener("wheel", event => {
      if (event.target.classList.contains("overscroll_y_wrapper")) {}
      else {
        event.preventDefault();
        wrapper.scrollLeft += event.deltaY;
      }
    });
  }); */
});

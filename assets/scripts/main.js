// #region FUNCTIONS TO EXPORT
export function addClass(elementType, element, classToAdd) {
  if (elementType === "id") {
    document.getElementById(element).classList.add(classToAdd);
  } else {
    document.getElementsByClassName(element)[0].classList.add(classToAdd);
  }
}
export function removeClass(elementType, element, classToRemove) {
  if (elementType === "id") {
    document.getElementById(element).classList.remove(classToRemove);
  } else {
    document.getElementsByClassName(element)[0].classList.remove(classToRemove);
  }
}
export function toggleClass(elementType, element, classToToggle) {
  if (elementType === "id") {
    document.getElementById(element).classList.toggle(classToToggle);
  } else {
    document.getElementsByClassName(element)[0].classList.toggle(classToToggle);
  }
}
// #endregion

// tweak mask for overscrolled divs based on top position and height
function fadesOnOverscrollYWrapper(visibleWrapper) {
  visibleWrapper.addEventListener("scroll", () => {
    const top = visibleWrapper.scrollTop <= 0;
    const tolerance = visibleWrapper.scrollHeight * 0.025;
    const bottom =
      visibleWrapper.scrollTop + visibleWrapper.clientHeight >=
      visibleWrapper.scrollHeight - tolerance;
    visibleWrapper.classList.toggle("scrolling", !top && !bottom);
    visibleWrapper.classList.toggle("bottom", bottom);
  });
}

// copy attributes from one div(toCopy) to another div(toPaste) based on array of Attributes (selected)
function copySelectedAttributes (toCopy, toPaste, selected = []) {
  [...toCopy.attributes].forEach(attr => {
    if (selected.includes(attr.name)) {
      toPaste.setAttribute(attr.name, attr.value); 
    }
  });
  selected.forEach(name => {
    if (!toPaste.getAttribute(name)) {
      toPaste.setAttribute(name, "");
    }
  });
}

// remove attributes from the specified element(el), but don't remove the attributes included in array (exception)
function removeAllAtrributesExcept (el, exception = []) {
  [...el.attributes].forEach(attr => {
    if (!exception.includes(attr.name)) {
      el.removeAttribute(attr.name);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, TextPlugin, MorphSVGPlugin, ScrollTrigger, ScrollSmoother);

  // enable the fade on overscroll-y wrappers when it's on the viewport
  const overscrollYWrappers = document.querySelectorAll(".overscroll_y_wrapper");
  overscrollYWrappers.forEach(wrapper => {
    ScrollTrigger.create({
      trigger: wrapper,
      scroller: ".scrollable_wrapper",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {fadesOnOverscrollYWrapper(wrapper);}
    });
  });

  // open media_modal with clicked media (IMG, VIDEO) inside .media_holder divs
  document.querySelectorAll(".media_holder").forEach(holder => {
    holder.addEventListener("click", event => {
        if (event.target.nodeName === "IMG") {
          const modal = document.getElementsByClassName("media_modal")[0];
          modal.style.display = "flex";
          const mediaFrame = modal.children[0];
          copySelectedAttributes(event.target, mediaFrame, ["src", "alt"]);
          mediaFrame.classList.add("opened");
        }
        else if (event.target.nodeName === "VIDEO") {
          const modal = document.getElementsByClassName("media_modal")[0];
          modal.style.display = "flex";
          const mediaFrame = modal.children[1];
          copySelectedAttributes(event.target, mediaFrame, ["src", "playsinline", "disablepictureinpicture", "disableremoteplayback", "controls"]);
          mediaFrame.classList.add("opened");
        }
    });});

  // after the media_modal is opened, if user clicks outside of media, close modal and remove (IMG, VIDEO) element attributes   
  document.getElementsByClassName("media_modal")[0].addEventListener("click", function (event) {
    if (event.target === this) {
      [...document.getElementsByClassName("media_modal")[0].children]
      .forEach(child => {
        removeAllAtrributesExcept(child, []);
      });
      this.style.display = "none";
    }
  });


});

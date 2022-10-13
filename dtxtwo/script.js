const accordions = document.querySelectorAll(".answers_flex");

document.addEventListener("DOMContentLoaded", () => {
  accordions.forEach((accordion) => {
    const expandedHeight = accordion.scrollHeight;

    const closedHeight = accordion.querySelector("p.q").scrollHeight;
    console.log({ expandedHeight, closedHeight });
    accordion.setAttribute("data-expanded-height", expandedHeight);
    accordion.setAttribute("data-height", closedHeight);
    accordion.style.height = `${closedHeight}px`;
    accordion.classList.remove("open");

    accordion.addEventListener("click", (e) => {
      if (accordion.classList.contains("open")) {
        accordion.classList.remove("open");
        accordion.style.height = `${accordion.getAttribute("data-height")}px`;
      } else {
        accordion.classList.add("open");
        accordion.style.height = `${accordion.getAttribute(
          "data-expanded-height"
        )}px`;
      }
    });
  });
});

const links = document.querySelectorAll(".button-position a");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });

    toggleNavigation();
  });
});

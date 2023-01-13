const slider = (active, inActive) => {
  const onboardings = document.querySelectorAll(inActive);

  const button = document.querySelectorAll(`${inActive} .next`);
  button.forEach((current) => {
    current.addEventListener("click", () => {
      const index = current.getAttribute("data-next-index");
      onboardings.forEach((current) => current.classList.remove(active));
      document
        .querySelector(`${inActive}[data-index="${index}"]`)
        .classList.add(active);
    });
  });
};

slider("transition--visible", ".transition");
slider("transition-mobile--visible", ".transition-mobile");

// Simple animation for scroll effect
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("section");
  const triggerBottom = window.innerHeight * 0.8;

  elements.forEach(section => {
    const boxTop = section.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      section.classList.add("show");
    }
  });
});

console.log("TAO.cl");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

console.log("TAO.cl");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry.intersectionRatio);

    if (
      entry.isIntersecting
      // && entry.intersectionRatio > 0.2
    ) {
      entry.target.classList.add("reveal-active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

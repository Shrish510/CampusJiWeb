document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      // e.preventDefault(); // This would prevent navigation
      // Add navigation logic here when other pages are created
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".team-member").forEach((member) => {
    member.style.opacity = "0";
    member.style.transform = "translateY(20px)";
    member.style.transition = "all 0.6s ease";
    observer.observe(member);
  });

  document.querySelectorAll(".linkedin-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      // Add actual LinkedIn profile links here
      alert("LinkedIn profile link would open here");
    });
  });

  // Removed redundant header loading logic. auth.js now handles this.
});

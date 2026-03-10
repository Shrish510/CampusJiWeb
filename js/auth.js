

window.getBasePath = window.getBasePath || function() {
    let path = window.location.pathname;
    if (path.includes('/CampusJiWeb/')) {
        path = path.split('/CampusJiWeb/')[1];
    }
    const parts = path.split('/').filter(p => p !== '' && !p.endsWith('.html'));
    return parts.length > 0 ? '../'.repeat(parts.length) : './';
};
var basePath = window.getBasePath();


document.addEventListener("DOMContentLoaded", function () {
  const protectedPages = ["parcel-hub.html", "grievance.html", "lost-and-found.html"];
  const currentPage = window.location.pathname.split("/").pop();

  const isProtected = protectedPages.includes(currentPage);

  if (localStorage.getItem("isLoggedIn") !== "true" && isProtected) {
    window.location.href = basePath + "login/";
    return;
  }
});

// Navigation Dropdown script
document.getElementById("service-nav").addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});

// Navigation Dropdown script
document.getElementById("service-nav").addEventListener("change", function () {
  if (this.value) {
    window.location.href = this.value;
  }
});

// Script to set the "Last updated" time dynamically
(function() {
  const timeElement = document.getElementById('status-time');
  if (timeElement) {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute:'2-digit', hour12: true });
    const formattedDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    timeElement.textContent = `Last updated: ${formattedDate}, ${formattedTime}`;
  }
})();

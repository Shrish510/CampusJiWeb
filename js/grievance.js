// Add Supabase client initialization
const SUPABASE_URL = "https://jqiifqmiucpqeiytqhkk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
  const grievanceForm = document.getElementById("grievanceForm");
  const grievanceTableBody = document.getElementById("grievanceTableBody");
  const adminGrievanceTableBody = document.getElementById(
    "adminGrievanceTableBody"
  );
  const adminControls = document.getElementById("adminControls");
  const userView = document.getElementById("userView");
  const adminView = document.getElementById("adminView");
  const toggleViewBtn = document.getElementById("toggleViewBtn");

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userEmail = userInfo.email || "anonymous";
  const isAdmin =
    userInfo.permission === "admin" &&
    userEmail === "admin.iimrohtak@gmail.com";

  // Show admin controls if user is the specific grievance admin
  if (isAdmin) {
    adminControls.style.display = "block";
    showAdminView(); // Start with admin view for admins
  }

  // Toggle between user and admin views
  toggleViewBtn.addEventListener("click", function () {
    if (userView.style.display === "none") {
      showUserView();
    } else {
      showAdminView();
    }
  });

  function showUserView() {
    userView.style.display = "block";
    adminView.style.display = "none";
    toggleViewBtn.textContent = "Switch to Admin View";
    fetchAndDisplayUserGrievances();
  }

  function showAdminView() {
    userView.style.display = "none";
    adminView.style.display = "block";
    toggleViewBtn.textContent = "Switch to User View";
    fetchAndDisplayAllGrievances();
  }

  // Fetch and display user's grievances only
  async function fetchAndDisplayUserGrievances() {
    const { data, error } = await supabase
      .from("grievance_redressal")
      .select("*")
      .eq("user_id", userEmail)
      .order("id", { ascending: true });

    if (error) {
      grievanceTableBody.innerHTML =
        '<tr><td colspan="4">Error loading grievances.</td></tr>';
      return;
    }

    grievanceTableBody.innerHTML = "";
    if (data && data.length > 0) {
      data.forEach((grievance) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${grievance.user_id || "anonymous"}</td>
                    <td>${grievance.subject}</td>
                    <td class="status-${grievance.status.toLowerCase()}">${
          grievance.status.charAt(0).toUpperCase() +
          grievance.status.slice(1).replace("_", " ")
        }</td>
                    <td>${grievance.remarks || ""}</td>
                `;
        grievanceTableBody.appendChild(row);
      });
    } else {
      grievanceTableBody.innerHTML =
        '<tr><td colspan="4">No grievances found.</td></tr>';
    }
  }

  // Fetch and display all grievances for admin
  async function fetchAndDisplayAllGrievances() {
    const { data, error } = await supabase
      .from("grievance_redressal")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      adminGrievanceTableBody.innerHTML =
        '<tr><td colspan="6">Error loading grievances.</td></tr>';
      return;
    }

    adminGrievanceTableBody.innerHTML = "";
    if (data && data.length > 0) {
      data.forEach((grievance) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${grievance.user_id || "anonymous"}</td>
                    <td>${grievance.subject}</td>
                    <td>${grievance.description}</td>
                    <td>
                        <select class="status-select" data-id="${
                          grievance.id
                        }" data-current="${grievance.status}">
                            <option value="unresolved" ${
                              grievance.status === "unresolved"
                                ? "selected"
                                : ""
                            }>Unresolved</option>
                            <option value="in_progress" ${
                              grievance.status === "in_progress"
                                ? "selected"
                                : ""
                            }>In Progress</option>
                            <option value="resolved" ${
                              grievance.status === "resolved" ? "selected" : ""
                            }>Resolved</option>
                            <option value="rejected" ${
                              grievance.status === "rejected" ? "selected" : ""
                            }>Rejected</option>
                        </select>
                    </td>
                    <td>
                        <textarea class="remarks-textarea" data-id="${
                          grievance.id
                        }" rows="2" placeholder="Add admin remarks here...">${
          grievance.remarks || ""
        }</textarea>
                    </td>
                    <td>
                        <button class="save-btn" data-id="${
                          grievance.id
                        }">Save</button>
                    </td>
                `;
        adminGrievanceTableBody.appendChild(row);
      });

      // Add event listeners for status changes and save buttons
      addAdminEventListeners();
    } else {
      adminGrievanceTableBody.innerHTML =
        '<tr><td colspan="6">No grievances found.</td></tr>';
    }
  }

  // Add event listeners for admin controls
  function addAdminEventListeners() {
    // Save button event listeners
    document.querySelectorAll(".save-btn").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const grievanceId = this.getAttribute("data-id");
        const statusSelect = document.querySelector(
          `.status-select[data-id="${grievanceId}"]`
        );
        const remarksTextarea = document.querySelector(
          `.remarks-textarea[data-id="${grievanceId}"]`
        );

        const newStatus = statusSelect.value;
        const newRemarks = remarksTextarea.value;

        const { data, error } = await supabase
          .from("grievance_redressal")
          .update({
            status: newStatus,
            remarks: newRemarks,
          })
          .eq("id", grievanceId);

        if (error) {
          alert("Error updating grievance: " + error.message);
        } else {
          alert("Grievance updated successfully!");
          fetchAndDisplayAllGrievances(); // Refresh the table
        }
      });
    });
  }

  // Insert new grievance into Supabase on form submit
  grievanceForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const subject = document.getElementById("grievanceSubject").value.trim();
    const description = document
      .getElementById("grievanceDescription")
      .value.trim();

    // Validate required fields
    if (!subject || !description) {
      alert("Subject and Description are mandatory fields.");
      return;
    }

    const { data, error } = await supabase.from("grievance_redressal").insert([
      {
        subject,
        description,
        status: "unresolved",
        remarks: null,
        user_id: userEmail,
      },
    ]);
    console.log("Insert result:", { data, error });

    if (error) {
      alert("Error submitting grievance: " + error.message);
      return;
    }

    alert("Grievance submitted successfully!");
    grievanceForm.reset();
    if (isAdmin && adminView.style.display !== "none") {
      fetchAndDisplayAllGrievances();
    } else {
      fetchAndDisplayUserGrievances();
    }
  });

  // Initial fetch based on user role
  if (isAdmin) {
    fetchAndDisplayAllGrievances();
  } else {
    fetchAndDisplayUserGrievances();
  }
});

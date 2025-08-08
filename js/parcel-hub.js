document.addEventListener("DOMContentLoaded", function () {
  const supabaseUrl = "https://jqiifqmiucpqeiytqhkk.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const hasParcelPermission = userInfo.permission === "parcel";
  const currentUser = userInfo.email || "Unknown User";

  const serviceLoginSection = document.getElementById("service-login-section");
  const serviceDashboard = document.getElementById("service-dashboard");
  const serviceLoginForm = document.getElementById("service-login-form");
  const logoutServiceBtn = document.getElementById("logout-service");
  const addParcelForm = document.getElementById("add-parcel-form");
  const searchInput = document.getElementById("search-parcel");
  const searchBtn = document.getElementById("search-btn");
  const parcelsList = document.getElementById("parcels-list");
  const loadingSpinner = document.getElementById("loading-spinner");
  const noParcels = document.getElementById("no-parcels");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeModal = document.querySelector(".close");

  let currentFilter = "all";
  let allParcels = [];

  init();

  function init() {
    displayCurrentUserInfo();

    if (hasParcelPermission) {
      showServiceDashboard();
    } else {
      serviceLoginSection.style.display = "block";
      serviceDashboard.style.display = "none";
    }

    loadParcels();

    setupEventListeners();
  }

  function setupEventListeners() {
    if (hasParcelPermission) {
      addParcelForm.addEventListener("submit", handleAddParcel);
    }

    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleSearch();
      }
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const status = this.dataset.status;
        setActiveFilter(status);
        filterParcels();
      });
    });

    closeModal.addEventListener("click", closeModalFunc);
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModalFunc();
      }
    });

    document.getElementById("company").addEventListener("change", function () {
      const otherCompanyInput = document.getElementById("other-company");
      if (this.value === "Other") {
        otherCompanyInput.style.display = "block";
        otherCompanyInput.required = true;
      } else {
        otherCompanyInput.style.display = "none";
        otherCompanyInput.required = false;
        otherCompanyInput.value = "";
      }
    });
  }

  function showServiceDashboard() {
    serviceLoginSection.style.display = "none";
    serviceDashboard.style.display = "block";
  }

  async function handleAddParcel(e) {
    e.preventDefault();

    const recipientName = document.getElementById("recipient-name").value;
    const company = document.getElementById("company").value;
    const contactNumber = document.getElementById("contact-number").value;
    const tokenNumber = document.getElementById("token-number").value;
    const otherCompany = document.getElementById("other-company").value;

    const finalCompany = company === "Other" ? otherCompany : company;

    // Validate token number
    if (!tokenNumber || tokenNumber.trim() === "") {
      showModal("Token number is required!", "error");
      return;
    }

    const parsedTokenNumber = parseInt(tokenNumber);
    if (isNaN(parsedTokenNumber)) {
      showModal("Token number must be a valid number!", "error");
      return;
    }

    const parcelData = {
      name: recipientName,
      company: finalCompany,
      contact: contactNumber,
      token_no: parsedTokenNumber,
      status: "pending",
      added_by: currentUser,
      added_at: new Date().toISOString(),
    };

    console.log("Data being sent to database:", parcelData);

    try {
      // Try explicit column mapping
      const insertData = {
        name: recipientName,
        company: finalCompany,
        contact: contactNumber,
        token_no: parsedTokenNumber,
        status: "pending",
        added_by: currentUser,
        added_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("parcel_data")
        .insert([insertData])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      showModal("Parcel added successfully!", "success");
      addParcelForm.reset();
      document.getElementById("other-company").style.display = "none";
      loadParcels();
    } catch (error) {
      console.error("Error adding parcel:", error);
      showModal("Error adding parcel. Please try again.", "error");
    }
  }

  async function loadParcels() {
    showLoading(true);

    try {
      const { data, error } = await supabase
        .from("parcel_data")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      allParcels = data || [];
      filterParcels();
    } catch (error) {
      console.error("Error loading parcels:", error);
      showModal("Error loading parcels. Please try again.", "error");
    } finally {
      showLoading(false);
    }
  }

  async function markAsCollected(parcelId) {
    if (!hasParcelPermission) {
      showModal(
        "You don't have permission to mark parcels as collected.",
        "error"
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("parcel_data")
        .update({
          status: "collected",
          collected_by: currentUser,
          collected_at: new Date().toISOString(),
        })
        .eq("id", parcelId);

      if (error) throw error;

      showModal("Parcel marked as collected!", "success");
      loadParcels();
    } catch (error) {
      console.error("Error updating parcel:", error);
      showModal("Error updating parcel. Please try again.", "error");
    }
  }

  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
      filterParcels();
      return;
    }

    const filteredParcels = allParcels.filter(
      (parcel) =>
        parcel.name.toLowerCase().includes(searchTerm) ||
        parcel.contact.toString().includes(searchTerm) ||
        (parcel.token_no && parcel.token_no.toString().includes(searchTerm))
    );

    displayParcels(filteredParcels);
  }

  function setActiveFilter(status) {
    currentFilter = status;

    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    document.querySelector(`[data-status="${status}"]`).classList.add("active");
  }

  function filterParcels() {
    let filteredParcels = allParcels;

    if (currentFilter !== "all") {
      filteredParcels = allParcels.filter(
        (parcel) => parcel.status === currentFilter
      );
    }

    displayParcels(filteredParcels);
  }

  function displayParcels(parcels) {
    if (parcels.length === 0) {
      parcelsList.innerHTML = "";
      noParcels.style.display = "block";
      return;
    }

    noParcels.style.display = "none";

    const parcelsHTML = parcels
      .map(
        (parcel) => `
            <div class="parcel-card">
                <div class="parcel-header-info">
                    <div class="parcel-recipient">${escapeHtml(
                      parcel.name
                    )}</div>
                    <div class="parcel-status ${parcel.status}">${
          parcel.status
        }</div>
                </div>
                
                <div class="parcel-details">
                    <div class="parcel-detail">
                        <div class="parcel-detail-label">Token No.</div>
                        <div class="parcel-detail-value">${
                          parcel.token_no || "N/A"
                        }</div>
                    </div>
                    <div class="parcel-detail">
                        <div class="parcel-detail-label">Company</div>
                        <div class="parcel-detail-value">${escapeHtml(
                          parcel.company
                        )}</div>
                    </div>
                    <div class="parcel-detail">
                        <div class="parcel-detail-label">Contact</div>
                        <div class="parcel-detail-value">${parcel.contact}</div>
                    </div>
                    <div class="parcel-detail">
                        <div class="parcel-detail-label">Received On</div>
                        <div class="parcel-detail-value">${formatDate(
                          parcel.created_at
                        )}</div>
                    </div>
                    ${
                      parcel.added_by
                        ? `
                    <div class="parcel-detail">
                        <div class="parcel-detail-label">Added By</div>
                        <div class="parcel-detail-value">${escapeHtml(
                          parcel.added_by
                        )}</div>
                    </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="parcel-actions">
                    ${
                      parcel.status === "pending" && hasParcelPermission
                        ? `<button class="btn btn-success" onclick="markAsCollected(${parcel.id})">
                            <i class="fas fa-check"></i> Mark Collected
                        </button>`
                        : parcel.status === "collected"
                        ? `<span class="parcel-collected-text">✓ Collected</span>`
                        : `<span class="parcel-pending-text">⏳ Pending Collection</span>`
                    }
                </div>
            </div>
        `
      )
      .join("");

    parcelsList.innerHTML = parcelsHTML;
  }

  function showLoading(show) {
    if (show) {
      loadingSpinner.style.display = "block";
      parcelsList.innerHTML = "";
      noParcels.style.display = "none";
    } else {
      loadingSpinner.style.display = "none";
    }
  }

  function showModal(message, type) {
    modalMessage.textContent = message;
    modalMessage.className = type;
    modal.style.display = "block";

    setTimeout(() => {
      closeModalFunc();
    }, 3000);
  }

  function closeModalFunc() {
    modal.style.display = "none";
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function displayCurrentUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    console.log("Current user info:", userInfo);

    if (userInfo.email) {
      console.log(
        `Logged in as: ${userInfo.email} (${userInfo.role || "user"})`
      );
    }
  }

  window.markAsCollected = markAsCollected;
});

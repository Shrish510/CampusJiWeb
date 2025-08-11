import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  const BUCKET = "lostnfound";
  const TABLE = "lost_and_found";

  // UI Elements
  const ctaNew = document.getElementById("cta-new-listing");
  const formSection = document.getElementById("form-section");
  const formTitle = document.getElementById("form-title");
  const listingForm = document.getElementById("listing-form");
  const messageBox = document.getElementById("form-message");
  const cancelBtn = document.getElementById("cancel-form");
  const closeBtn = document.getElementById("close-form");
  const searchInput = document.getElementById("search-listings");
  const searchBtn = document.getElementById("search-btn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const listingsList = document.getElementById("listings-list");
  const loadingSpinner = document.getElementById("loading-spinner");
  const noListings = document.getElementById("no-listings");

  // Current user info from localStorage
  let currentUserEmail = null;
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    currentUserEmail = userInfo?.email || null;
  } catch (_) {}

  let allListings = [];
  // default to lost tab
  let currentFilter = "lost";
  let searchTerm = "";

  function showForm() {
    // We only list lost items from this UI; found items are marked via toggle later
    formTitle.innerHTML =
      '<i class="fas fa-clipboard-list"></i> List a Lost Item';
    formSection.classList.remove("hidden");
    messageBox.textContent = "";
    listingForm.reset();
  }

  function hideForm() {
    formSection.classList.add("hidden");
  }

  // Event Listeners
  ctaNew?.addEventListener("click", showForm);
  cancelBtn?.addEventListener("click", hideForm);
  closeBtn?.addEventListener("click", hideForm);

  async function uploadImageIfAny(file) {
    if (!file) return null;
    const ext = file.name.split(".").pop();
    const filePath = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  }

  function parseContact(email, phone) {
    return { email, phone };
  }

  function renderCard(item) {
    const wrapper = document.createElement("div");
    wrapper.className = "listing-card";

    const isFound = !!item.found;
    const badgeClass = isFound ? "finder" : "owner";
    const badgeText = isFound ? "Found" : "Lost";
    const icon = isFound
      ? "fas fa-hand-holding-heart"
      : "fas fa-search-location";

    const contact =
      typeof item.contact === "string"
        ? JSON.parse(item.contact)
        : item.contact || {};

    wrapper.innerHTML = `
      <div class="listing-header">
        <div class="listing-title">
          <i class="${icon}"></i> ${escapeHtml(item.title || "Untitled")}
        </div>
        <div>
          <span class="listing-badge ${badgeClass}">${badgeText}</span>
          ${
            item.found
              ? '<span class="listing-badge resolved">Resolved</span>'
              : ""
          }
        </div>
      </div>
      
      <div class="listing-details">
        <div class="listing-detail">
          <span class="listing-detail-label">Posted by</span>
          <span class="listing-detail-value">${escapeHtml(
            item.name || "Anonymous"
          )}</span>
        </div>
        <div class="listing-detail">
          <span class="listing-detail-label">Date</span>
          <span class="listing-detail-value">${new Date(
            item.created_at
          ).toLocaleDateString()}</span>
        </div>
      </div>
      
      ${
        item.img_url
          ? `<img class="listing-image" src="${item.img_url}" alt="item image" loading="lazy"/>`
          : ""
      }
      
      <div class="listing-description">${escapeHtml(
        item.description || ""
      )}</div>
      

      <div class="listing-contact" data-contact='${JSON.stringify(contact)}'>

        <div><strong>Email:</strong> ${contact.email || "-"}</div>
        <div><strong>Phone:</strong> ${contact.phone || "-"}</div>
      </div>

      ${renderOwnerControls(item, contact)}
    `;

    return wrapper;
  }

  function renderOwnerControls(item, contact) {
    const isOwner =
      currentUserEmail &&
      contact?.email &&
      currentUserEmail.toLowerCase() === contact.email.toLowerCase();
    if (!isOwner) return "";
    const toggleLabel = item.found ? "Mark as Lost" : "Mark as Found";
    return `
      <div class="form-actions" style="justify-content:flex-end;margin-top:0.75rem;">
        <button class="btn ${
          item.found ? "btn-secondary" : "btn-success"
        }" data-action="toggle-status" data-id="${item.id}" data-next="${
      item.found ? "false" : "true"

    }" data-owner-email="${escapeHtml(contact.email || "")}">

          <i class="fas ${
            item.found ? "fa-undo" : "fa-check"
          }"></i> ${toggleLabel}
        </button>
      </div>
    `;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function filterListings(listings) {
    return listings.filter((item) => {
      // First apply tab filter based on found boolean
      const matchesFilter =
        (currentFilter === "lost" && !item.found) ||
        (currentFilter === "found" && item.found);
      if (!matchesFilter) return false;

      // Then apply search filter only within the current tab
      const matchesSearch =
        !searchTerm ||
        (item.title && item.title.toLowerCase().includes(searchTerm)) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm)) ||
        (item.name && item.name.toLowerCase().includes(searchTerm));

      return matchesSearch;
    });
  }

  function renderListings() {
    const filteredListings = filterListings(allListings);

    listingsList.innerHTML = "";

    if (filteredListings.length === 0) {
      noListings.style.display = "block";
      loadingSpinner.style.display = "none";
      return;
    }

    noListings.style.display = "none";
    loadingSpinner.style.display = "none";

    filteredListings.forEach((item) => {
      const card = renderCard(item);
      listingsList.appendChild(card);
    });
  }

  async function loadListings() {
    loadingSpinner.style.display = "block";
    noListings.style.display = "none";
    listingsList.innerHTML = "";

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading listings:", error);
      loadingSpinner.style.display = "none";
      noListings.style.display = "block";
      noListings.innerHTML =
        '<i class="fas fa-exclamation-triangle"></i><p>Failed to load listings</p>';
      return;
    }

    allListings = data || [];
    renderListings();
  }

  listingForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageBox.textContent = "Submitting...";
    messageBox.className = "form-message";

    const listingType = "owner"; // UI lists lost items
    const name = document.getElementById("name").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const email = currentUserEmail; // Use stored email from localStorage
    const phoneEl = document.getElementById("phone");
    const phone = phoneEl.value.trim();
    const imageFile = document.getElementById("image").files[0];

    // Additional client-side validation
    if (!name || !title || !description || !phone || !imageFile) {
      messageBox.textContent = "Please fill out all fields and attach a photo.";
      messageBox.className = "form-message error";
      return;
    }
    if (!email) {
      messageBox.textContent = "Please log in to create a listing.";
      messageBox.className = "form-message error";
      return;
    }
    if (phoneEl && !phoneEl.checkValidity()) {
      messageBox.textContent =
        phoneEl.title || "Please enter a valid phone number.";
      messageBox.className = "form-message error";
      return;
    }

    try {
      let imgUrl = null;
      if (imageFile) {
        imgUrl = await uploadImageIfAny(imageFile);
      }

      const payload = {
        name,
        title,
        description,
        contact: parseContact(email, phone),
        img_url: imgUrl,
        found: false, // new listings are lost by default
      };

      const { data, error } = await supabase
        .from(TABLE)
        .insert([payload])
        .select();
      if (error) throw error;

      messageBox.textContent = "Listing created successfully!";
      messageBox.className = "form-message success";
      hideForm();
      await loadListings();

      setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "form-message";
      }, 3000);
    } catch (err) {
      console.error(err);
      messageBox.textContent = `Error: ${
        err.message || "Failed to create listing"
      }`;
      messageBox.className = "form-message error";
    }
  });

  // Delegate click for owner toggle buttons
  listingsList?.addEventListener("click", async (e) => {
    const target = e.target.closest("[data-action='toggle-status']");
    if (!target) return;

    const rowId = target.getAttribute("data-id");
    const nextVal = target.getAttribute("data-next") === "true";

    const ownerEmail = target.getAttribute("data-owner-email") || "";

    console.log("Toggling status:", {
      rowId,
      nextVal,
      currentUserEmail,
      ownerEmail,
    });

    try {
      // Check permission using data-owner-email directly; no JSON parsing
      const isOwner =
        currentUserEmail &&
        ownerEmail &&
        currentUserEmail.toLowerCase() === ownerEmail.toLowerCase();

      if (!isOwner) {
        alert("You can only update your own listings.");
        return;
      }

      const { data, error } = await supabase
        .from(TABLE)
        .update({ found: nextVal })
        .eq("id", rowId)
        .select();

      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }

      console.log("Update successful:", data);

      // After update, reload and switch to corresponding tab if needed
      await loadListings();

      // If item marked found, show Found tab; if marked lost, show Lost tab
      currentFilter = nextVal ? "found" : "lost";

      // Update filter button UI state
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("active", b.dataset.filter === currentFilter);
      });

      renderListings();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(`Failed to update status: ${err.message || "Unknown error"}`);
    }
  });

  // Search functionality
  searchBtn?.addEventListener("click", () => {
    searchTerm = searchInput.value.toLowerCase().trim();
    renderListings();
  });

  searchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchTerm = searchInput.value.toLowerCase().trim();
      renderListings();
    }
  });

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      // Clear search when switching tabs
      searchTerm = "";
      searchInput.value = "";
      renderListings();
    });
  });

  // Initial load
  loadListings();
});

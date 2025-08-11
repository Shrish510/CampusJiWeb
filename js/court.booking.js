import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

let supabase = null;
try {
  if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY
  ) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("✅ Supabase client initialized successfully");
  } else {
    console.warn(
      "Supabase credentials not configured. Using local storage for demo."
    );
  }
} catch (error) {
  console.error("Failed to initialize Supabase:", error);
}

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let allBookings = [];
let currentUser = null;
let currentUserEmail = null;

function getCourtName(court) {
  const num = parseInt(court, 10);
  if (num === 1) return "Badminton Court 1";
  if (num === 2) return "Badminton Court 2";
  if (num === 3) return "Basketball Court";
  return `Court ${court}`;
}

function getCourtClass(court) {
  const num = parseInt(court, 10);
  if (num === 1) return "court-b1";
  if (num === 2) return "court-b2";
  if (num === 3) return "court-basketball";
  return "court-unknown";
}

const bookingForm = document.getElementById("bookingForm");
const bookingsList = document.getElementById("bookingsList");
const refreshBookingsBtn = document.getElementById("refreshBookings");
const showMyBookingsBtn = document.getElementById("showMyBookings");
const calendar = document.getElementById("calendar");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const currentMonthDisplay = document.getElementById("currentMonth");
const bookingModal = document.getElementById("bookingModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.querySelector(".close");
const messageContainer = document.getElementById("messageContainer");

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Court Booking System initializing...");
  initializeApp();
  setupEventListeners();
  loadBookings();
  renderCalendar();
  console.log("✅ Court Booking System initialized successfully");
});

function initializeApp() {
  console.log("📝 Initializing app...");

  const today = new Date().toISOString().split("T")[0];
  const startDateInput = document.getElementById("startDate");
  if (startDateInput) {
    startDateInput.min = today;
    console.log("📅 Set minimum date to:", today);
  }

  const startTimeInput = document.getElementById("startTime");
  const endTimeInput = document.getElementById("endTime");
  if (startTimeInput) startTimeInput.value = "09:00";
  if (endTimeInput) endTimeInput.value = "10:00";

  // Derive current user name and email from localStorage (set by login.js)
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    currentUserEmail = userInfo?.email || null;
    currentUser =
      userInfo?.name || localStorage.getItem("userName") || "Anonymous";
  } catch (_) {
    currentUser = localStorage.getItem("userName") || "Anonymous";
    currentUserEmail = null;
  }

  const bookerNameInput = document.getElementById("bookerName");
  if (bookerNameInput) bookerNameInput.value = currentUser;

  console.log("👤 Current user:", currentUser, "| email:", currentUserEmail);

  if (!supabase) {
    console.log("🔄 Loading demo data...");
    loadDemoData();
  }
}

function setupEventListeners() {
  console.log("🔗 Setting up event listeners...");

  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
    console.log("✅ Booking form listener added");
  } else {
    console.error("❌ Booking form not found");
  }

  const courtSelect = document.getElementById("courtNumber");
  if (courtSelect) {
    courtSelect.addEventListener("change", handleCourtChange);
    console.log("✅ Court select listener added");
  }

  const startDateInput = document.getElementById("startDate");
  const startTimeInput = document.getElementById("startTime");
  const endTimeInput = document.getElementById("endTime");

  if (startDateInput) {
    startDateInput.addEventListener("change", checkCourtAvailability);
    console.log("✅ Start date listener added");
  }
  if (startTimeInput) {
    startTimeInput.addEventListener("change", checkCourtAvailability);
    console.log("✅ Start time listener added");
  }
  if (endTimeInput) {
    endTimeInput.addEventListener("change", checkCourtAvailability);
    console.log("✅ End time listener added");
  }

  if (refreshBookingsBtn) {
    refreshBookingsBtn.addEventListener("click", loadBookings);
    console.log("✅ Refresh button listener added");
  }
  if (showMyBookingsBtn) {
    showMyBookingsBtn.addEventListener("click", toggleMyBookings);
    console.log("✅ My bookings button listener added");
  }

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => changeMonth(-1));
    console.log("✅ Previous month button listener added");
  }
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => changeMonth(1));
    console.log("✅ Next month button listener added");
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeBookingModal);
    console.log("✅ Modal close listener added");
  }
  window.addEventListener("click", (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  console.log("✅ All event listeners set up successfully");
}

function loadDemoData() {
  const demoBookings = [
    {
      id: 1,
      booker_name: "John Doe",
      court: 1,
      start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(
        Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
      ).toISOString(),
    },
    {
      id: 2,
      booker_name: "Jane Smith",
      court: 2,
      start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000
      ).toISOString(),
    },
  ];

  localStorage.setItem("demoBookings", JSON.stringify(demoBookings));
}

function handleBookingSubmit(e) {
  e.preventDefault();
  console.log("📝 Booking form submitted");

  const formData = new FormData(bookingForm);
  const bookingData = {
    booker_name: formData.get("bookerName"),
    start_date: formData.get("startDate"),
    start_time: formData.get("startTime"),
    end_time: formData.get("endTime"),
    court: formData.get("courtNumber"),
  };

  console.log("📋 Booking data:", bookingData);

  if (!validateBooking(bookingData)) {
    return;
  }

  createBooking(bookingData);
}

function handleCourtChange(e) {
  const courtNumber = e.target.value;
  console.log("🏸 Court selected:", courtNumber);

  checkCourtAvailability();
}

function checkCourtAvailability() {
  const courtSelect = document.getElementById("courtNumber");
  const startDateInput = document.getElementById("startDate");
  const startTimeInput = document.getElementById("startTime");
  const endTimeInput = document.getElementById("endTime");

  if (
    !courtSelect.value ||
    !startDateInput.value ||
    !startTimeInput.value ||
    !endTimeInput.value
  ) {
    return;
  }

  const testBooking = {
    court: courtSelect.value,
    start_date: startDateInput.value,
    start_time: startTimeInput.value,
    end_time: endTimeInput.value,
  };

  console.log("🔍 Checking availability for:", testBooking);

  const startDateTime = new Date(
    `${testBooking.start_date}T${testBooking.start_time}`
  );
  const endDateTime = new Date(
    `${testBooking.start_date}T${testBooking.end_time}`
  );

  const conflicts = allBookings.filter((booking) => {
    let bookingStart, bookingEnd;

    if (typeof booking.start_time === "string") {
      bookingStart = new Date(booking.start_time);
      bookingEnd = new Date(booking.end_time);
    } else {
      bookingStart = new Date(booking.start_time);
      bookingEnd = new Date(booking.end_time);
    }

    const bookingCourt =
      booking.court !== undefined
        ? booking.court
        : booking.court_number !== undefined
        ? booking.court_number
        : null;

    return (
      bookingCourt == testBooking.court &&
      bookingStart < endDateTime &&
      bookingEnd > startDateTime
    );
  });

  if (conflicts.length > 0) {
    console.log("⚠️ Court conflicts detected:", conflicts);

    courtSelect.style.borderColor = "#dc3545";
    courtSelect.title = `${getCourtName(
      testBooking.court
    )} is busy at this time`;
  } else {
    console.log("✅ Court available at this time");
    courtSelect.style.borderColor = "#28a745";
    courtSelect.title = `${getCourtName(testBooking.court)} is available`;
  }
}

function validateBooking(bookingData) {
  console.log("🔍 Starting validation for booking:", bookingData);

  const startDateTime = new Date(
    `${bookingData.start_date}T${bookingData.start_time}`
  );
  const endDateTime = new Date(
    `${bookingData.start_date}T${bookingData.end_time}`
  );
  const now = new Date();

  console.log("📅 Validation details:", {
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    now: now.toISOString(),
    selectedCourt: bookingData.court,
  });

  if (startDateTime <= now) {
    showMessage("Cannot book in the past", "error");
    return false;
  }

  if (endDateTime <= startDateTime) {
    showMessage("End time must be after start time", "error");
    return false;
  }

  if (!bookingData.court) {
    showMessage("Please select a court", "error");
    return false;
  }

  console.log("🔍 Checking against", allBookings.length, "existing bookings");

  const conflicts = allBookings.filter((booking) => {
    let bookingStart, bookingEnd;

    if (typeof booking.start_time === "string") {
      bookingStart = new Date(booking.start_time);
      bookingEnd = new Date(booking.end_time);
    } else {
      bookingStart = new Date(booking.start_time);
      bookingEnd = new Date(booking.end_time);
    }

    const newStart = startDateTime;
    const newEnd = endDateTime;

    const bookingCourt =
      booking.court !== undefined
        ? booking.court
        : booking.court_number !== undefined
        ? booking.court_number
        : null;

    const sameCourt = bookingCourt == bookingData.court;
    const timeOverlap = bookingStart < newEnd && bookingEnd > newStart;
    const isConflict = sameCourt && timeOverlap;

    console.log("🔍 Checking conflict:", {
      bookingId: booking.id,
      bookerName: booking.booker_name,
      bookingCourt: bookingCourt,
      newCourt: bookingData.court,
      bookingStartRaw: booking.start_time,
      bookingStartUTC: bookingStart.toISOString(),
      bookingStartIST: bookingStart.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      bookingEndRaw: booking.end_time,
      bookingEndUTC: bookingEnd.toISOString(),
      bookingEndIST: bookingEnd.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      newStartUTC: newStart.toISOString(),
      newStartIST: newStart.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      newEndUTC: newEnd.toISOString(),
      newEndIST: newEnd.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      sameCourt: sameCourt,
      timeOverlap: timeOverlap,
      isConflict: isConflict,
    });

    return isConflict;
  });

  if (conflicts.length > 0) {
    console.log("❌ Conflicts found:", conflicts);
    const courtName = getCourtName(bookingData.court);

    const conflictDetails = conflicts
      .map(
        (c) =>
          `${c.booker_name} (${new Date(c.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${new Date(c.end_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })})`
      )
      .join(", ");

    showMessage(
      `${courtName} is already booked for this time slot by: ${conflictDetails}. Please choose a different time or court.`,
      "error"
    );
    return false;
  }

  console.log("✅ Validation passed - no conflicts found");
  return true;
}

async function createBooking(bookingData) {
  try {
    console.log("🏀 Creating booking...");

    const startDateTime = new Date(
      `${bookingData.start_date}T${bookingData.start_time}`
    );
    const endDateTime = new Date(
      `${bookingData.start_date}T${bookingData.end_time}`
    );

    console.log(
      "📅 IST Start DateTime:",
      startDateTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    );
    console.log(
      "📅 IST End DateTime:",
      endDateTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    );
    console.log("📅 UTC Start DateTime:", startDateTime.toISOString());
    console.log("📅 UTC End DateTime:", endDateTime.toISOString());

    if (supabase) {
      console.log("☁️ Using Supabase for booking...");
      const { data, error } = await supabase.from("court_booking").insert([
        {
          booker_name: bookingData.booker_name,
          email: currentUserEmail,
          start_time:
            startDateTime
              .toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })
              .replace(" ", "T") + "+05:30",
          end_time:
            endDateTime
              .toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })
              .replace(" ", "T") + "+05:30",
          court: parseInt(bookingData.court),
        },
      ]);

      if (error) {
        console.error("❌ Supabase error:", error);
        throw error;
      }

      console.log("✅ Booking created in Supabase:", data);
    } else {
      console.log("💾 Using localStorage for demo...");
      const newBooking = {
        id: Date.now(),
        booker_name: bookingData.booker_name,
        email: currentUserEmail,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        court: parseInt(bookingData.court),
        created_at: new Date().toISOString(),
      };

      allBookings.push(newBooking);
      localStorage.setItem("demoBookings", JSON.stringify(allBookings));
      console.log("✅ Booking created in localStorage:", newBooking);
    }

    showMessage("Court booked successfully!", "success");
    if (bookingForm) {
      bookingForm.reset();
      initializeApp();
    }
    loadBookings();
    renderCalendar();
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    showMessage("Failed to create booking. Please try again.", "error");
  }
}

async function loadBookings() {
  try {
    if (bookingsList) {
      bookingsList.innerHTML = '<div class="loading">Loading bookings...</div>';
    }

    if (supabase) {
      const { data, error } = await supabase
        .from("court_booking")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) throw error;
      allBookings = data || [];

      allBookings = allBookings.map((booking) => {
        if (booking.court === undefined && booking.court_number !== undefined) {
          booking.court = booking.court_number;
        }
        return booking;
      });

      console.log("📋 Loaded bookings:", allBookings);
    } else {
      const storedBookings = localStorage.getItem("demoBookings");
      allBookings = storedBookings ? JSON.parse(storedBookings) : [];
    }

    displayBookings(allBookings);
  } catch (error) {
    console.error("Error loading bookings:", error);
    showMessage("Failed to load bookings", "error");
    if (bookingsList) {
      bookingsList.innerHTML =
        '<div class="error">Failed to load bookings</div>';
    }
  }
}

async function deleteBooking(bookingId) {
  try {
    // Client-side permission check: only owner (by email) can delete
    const booking = allBookings.find((b) => b.id === bookingId);
    if (!booking) {
      showMessage("Booking not found", "error");
      return;
    }

    const canDelete =
      booking?.email &&
      currentUserEmail &&
      booking.email.toLowerCase() === currentUserEmail.toLowerCase();

    if (!canDelete) {
      showMessage("You can only cancel your own booking", "error");
      return;
    }

    if (supabase) {
      const { error } = await supabase
        .from("court_booking")
        .delete()
        .eq("id", bookingId);

      if (error) throw error;
    } else {
      allBookings = allBookings.filter((booking) => booking.id !== bookingId);
      localStorage.setItem("demoBookings", JSON.stringify(allBookings));
    }

    showMessage("Booking cancelled successfully", "success");
    loadBookings();
    renderCalendar();
  } catch (error) {
    console.error("Error deleting booking:", error);
    showMessage("Failed to cancel booking", "error");
  }
}

function displayBookings(bookings) {
  if (!bookingsList) return;

  if (bookings.length === 0) {
    bookingsList.innerHTML = '<div class="no-bookings">No bookings found</div>';
    return;
  }

  const bookingsHTML = bookings
    .map((booking) => {
      let startTime, endTime;

      if (typeof booking.start_time === "string") {
        startTime = new Date(booking.start_time);
        endTime = new Date(booking.end_time);
      } else {
        startTime = new Date(booking.start_time);
        endTime = new Date(booking.end_time);
      }

      const courtValue =
        booking.court !== undefined
          ? booking.court
          : booking.court_number !== undefined
          ? booking.court_number
          : 1;
      const courtName = getCourtName(courtValue);
      const isOwner =
        booking?.email &&
        currentUserEmail &&
        booking.email.toLowerCase() === currentUserEmail.toLowerCase();
      return `
                <div class="booking-card">
                    <div class="booking-header">
                        <span class="booking-name">${booking.booker_name}</span>
                        <span class="booking-date">${startTime.toLocaleDateString()}</span>
                    </div>
                    <div class="booking-time">
                        <div class="time-slot">
                            <span class="time-label">Court</span>
                            <span class="time-value">${courtName}</span>
                        </div>
                        <div class="time-slot">
                            <span class="time-label">Start Time</span>
                            <span class="time-value">${startTime.toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}</span>
                        </div>
                        <div class="time-slot">
                            <span class="time-label">End Time</span>
                            <span class="time-value">${endTime.toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}</span>
                        </div>
                    </div>
                    <div class="booking-actions">
                        ${
                          isOwner
                            ? `<button class="btn-danger" onclick="deleteBooking(${booking.id})">Cancel Booking</button>`
                            : ""
                        }
                    </div>
                </div>
            `;
    })
    .join("");

  bookingsList.innerHTML = bookingsHTML;
}

let showingMyBookings = false;

function toggleMyBookings() {
  showingMyBookings = !showingMyBookings;

  if (showingMyBookings) {
    const myBookings = allBookings.filter((booking) => {
      const emailMatch =
        booking?.email &&
        currentUserEmail &&
        booking.email.toLowerCase() === currentUserEmail.toLowerCase();
      const nameFallbackMatch =
        !booking?.email && booking.booker_name === currentUser;
      return emailMatch || nameFallbackMatch;
    });
    displayBookings(myBookings);
    if (showMyBookingsBtn) {
      showMyBookingsBtn.textContent = "Show All Bookings";
    }
  } else {
    displayBookings(allBookings);
    if (showMyBookingsBtn) {
      showMyBookingsBtn.textContent = "My Bookings";
    }
  }
}

function renderCalendar() {
  if (!calendar) return;

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const calendarHTML = [];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    calendarHTML.push(`<div class="calendar-header">${day}</div>`);
  });

  const today = new Date();
  let currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    const isCurrentMonth = currentDate.getMonth() === currentMonth;
    const isToday = currentDate.toDateString() === today.toDateString();

    const dayBookings = allBookings
      .filter((booking) => {
        const bookingDate = new Date(booking.start_time);
        return bookingDate.toDateString() === currentDate.toDateString();
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    let dayClass = "calendar-day";
    if (!isCurrentMonth) dayClass += " other-month";
    if (isToday) dayClass += " today";
    if (dayBookings.length > 0) dayClass += " has-bookings";

    const chipsToShow = dayBookings.slice(0, 3);
    const moreCount = Math.max(0, dayBookings.length - 3);

    const chipsHtml = chipsToShow
      .map((booking) => {
        const startTime = new Date(booking.start_time);
        const endTime = new Date(booking.end_time);
        const courtValue =
          booking.court !== undefined
            ? booking.court
            : booking.court_number !== undefined
            ? booking.court_number
            : 1;
        const courtCls = getCourtClass(courtValue);
        const timeText = `${startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
        const nameText = booking.booker_name || "Booked";
        return `<div class="event-chip ${courtCls}"><span class="time">${timeText}</span><span>•</span><span class="name">${nameText}</span></div>`;
      })
      .join("");

    const moreHtml =
      moreCount > 0 ? `<div class="more-chip">+${moreCount} more</div>` : "";

    calendarHTML.push(`
            <div class="${dayClass}" onclick="showDayBookings('${currentDate.toISOString()}')">
                <div class="day-number">${currentDate.getDate()}</div>
                <div class="day-events">${chipsHtml}${moreHtml}</div>
            </div>
        `);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  calendar.innerHTML = calendarHTML.join("");
  if (currentMonthDisplay) {
    currentMonthDisplay.textContent = new Date(
      currentYear,
      currentMonth
    ).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
}

function changeMonth(delta) {
  currentMonth += delta;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  renderCalendar();
}

function hasBookingsOnDate(date) {
  const dateString = date.toDateString();
  return allBookings.some((booking) => {
    const bookingDate = new Date(booking.start_time);
    return bookingDate.toDateString() === dateString;
  });
}

function showDayBookings(dateString) {
  const selectedDate = new Date(dateString);
  const dayBookings = allBookings.filter((booking) => {
    const bookingDate = new Date(booking.start_time);
    return bookingDate.toDateString() === selectedDate.toDateString();
  });

  if (dayBookings.length === 0) {
    showMessage("No bookings for this date", "error");
    return;
  }

  const modalHTML = `
        <h3>Bookings for ${selectedDate.toLocaleDateString()}</h3>
        ${dayBookings
          .map((booking) => {
            let startTime, endTime;

            if (typeof booking.start_time === "string") {
              startTime = new Date(booking.start_time);
              endTime = new Date(booking.end_time);
            } else {
              startTime = new Date(booking.start_time);
              endTime = new Date(booking.end_time);
            }

            const courtValue =
              booking.court !== undefined
                ? booking.court
                : booking.court_number !== undefined
                ? booking.court_number
                : 1;
            const courtName = getCourtName(courtValue);
            return `
                    <div class="booking-card">
                        <div class="booking-header">
                            <span class="booking-name">${
                              booking.booker_name
                            }</span>
                        </div>
                        <div class="booking-time">
                            <div class="time-slot">
                                <span class="time-label">Court</span>
                                <span class="time-value">${courtName}</span>
                            </div>
                            <div class="time-slot">
                                <span class="time-label">Start Time</span>
                                <span class="time-value">${startTime.toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}</span>
                            </div>
                            <div class="time-slot">
                                <span class="time-label">End Time</span>
                                <span class="time-value">${endTime.toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}</span>
                            </div>
                        </div>
                    </div>
                `;
          })
          .join("")}
    `;

  if (modalContent) {
    modalContent.innerHTML = modalHTML;
  }
  if (bookingModal) {
    bookingModal.style.display = "block";
  }
}

function closeBookingModal() {
  if (bookingModal) {
    bookingModal.style.display = "none";
  }
}

function showMessage(message, type) {
  if (!messageContainer) return;

  const messageElement = document.createElement("div");
  messageElement.className = `message ${type}`;
  messageElement.textContent = message;

  messageContainer.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

if (supabase) {
  setInterval(loadBookings, 30000);
}

async function cleanupConflictingBookings() {
  try {
    console.log("🧹 Starting cleanup of conflicting bookings...");

    const { data: allBookingsData, error } = await supabase
      .from("court_booking")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    const conflicts = [];
    const toDelete = [];

    for (let i = 0; i < allBookingsData.length; i++) {
      for (let j = i + 1; j < allBookingsData.length; j++) {
        const booking1 = allBookingsData[i];
        const booking2 = allBookingsData[j];

        if (booking1.court === booking2.court) {
          const start1 = new Date(booking1.start_time);
          const end1 = new Date(booking1.end_time);
          const start2 = new Date(booking2.start_time);
          const end2 = new Date(booking2.end_time);

          if (start1 < end2 && end1 > start2) {
            conflicts.push({ booking1, booking2 });
            if (new Date(booking1.created_at) < new Date(booking2.created_at)) {
              toDelete.push(booking2.id);
            } else {
              toDelete.push(booking1.id);
            }
          }
        }
      }
    }

    console.log("🔍 Found conflicts:", conflicts);
    console.log("🗑️ Bookings to delete:", toDelete);

    if (toDelete.length > 0) {
      for (const id of toDelete) {
        const { error: deleteError } = await supabase
          .from("court_booking")
          .delete()
          .eq("id", id);

        if (deleteError) {
          console.error("❌ Error deleting booking", id, deleteError);
        } else {
          console.log("✅ Deleted conflicting booking", id);
        }
      }

      showMessage(
        `Cleaned up ${toDelete.length} conflicting bookings`,
        "success"
      );
      loadBookings();
    } else {
      showMessage("No conflicting bookings found", "success");
    }
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    showMessage("Error during cleanup", "error");
  }
}

window.cleanupConflictingBookings = cleanupConflictingBookings;

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the date input element by its ID
  const dateInput = document.getElementById('startDate');

  if (dateInput) {
    // Listen for the 'change' event, which fires when a date is selected
    dateInput.addEventListener('change', function() {
      // If the input has a value (a date was chosen)
      if (this.value) {
        // Add the 'date-selected' class to apply our CSS style
        this.classList.add('date-selected');
      } else {
        // If the date is cleared, remove the class to revert to the default style
        this.classList.remove('date-selected');
      }
    });
  }
});

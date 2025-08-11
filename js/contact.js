document.addEventListener('DOMContentLoaded', () => {
    // ---ELEMENT REFERENCES ---
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const showStarredButton = document.getElementById('showStarredButton');
    const allRows = document.querySelectorAll('.contact-row');
    const resultsCounter = document.getElementById('resultsCounter');
    const noResultsDiv = document.getElementById('noResults');
    const tables = document.querySelectorAll('.contact-table');
    const allStarIcons = document.querySelectorAll('.star-icon');

    // --- STATE MANAGEMENT ---
    const STORAGE_KEY = 'campusji_starred_contacts';
    let isShowingStarred = false; // Filter state for starred contacts

    // --- CORE FUNCTIONS ---

    // Creates a unique ID for a contact to use in localStorage
    const getContactId = (row) => {
        const name = row.querySelector('.contact-name').innerText.replace('☆', '').replace('★', '').trim();
        const profession = row.querySelector('.contact-profession').innerText.trim();
        return `${name}-${profession}`;
    };

    // Loads which contacts are starred from the browser's local storage
    const loadStarredStatus = () => {
        const starredContacts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        allRows.forEach(row => {
            const contactId = getContactId(row);
            if (starredContacts[contactId]) {
                const star = row.querySelector('.star-icon');
                star.classList.add('starred');
                star.textContent = '★';
            }
        });
    };

    // Saves the current set of starred contacts to local storage
    const saveStarredStatus = () => {
        const starredContacts = {};
        document.querySelectorAll('.star-icon.starred').forEach(star => {
            const contactId = getContactId(star.closest('.contact-row'));
            starredContacts[contactId] = true;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(starredContacts));
    };

    // Master function to filter and display contacts based on all active criteria
    const filterAndDisplayContacts = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        // 1. Filter individual rows
        allRows.forEach(row => {
            const isStarred = row.querySelector('.star-icon').classList.contains('starred');
            const rowText = row.textContent.toLowerCase();

            const matchesSearch = searchTerm === '' || rowText.includes(searchTerm);
            const matchesStarredFilter = !isShowingStarred || isStarred;

            if (matchesSearch && matchesStarredFilter) {
                row.style.display = ''; // Use default table display
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // 2. Update the results counter message
        resultsCounter.textContent = `Showing ${visibleCount} of ${allRows.length} contacts`;
        noResultsDiv.style.display = visibleCount === 0 ? 'block' : 'none';

        // 3. Hide empty table sections (including headers)
        tables.forEach(table => {
            const body = table.querySelector('tbody');
            if (body) {
                const hasVisibleRows = Array.from(body.querySelectorAll('.contact-row')).some(r => r.style.display !== 'none');
                let header = body.previousElementSibling;
                while (header && header.tagName === 'THEAD') {
                    header.style.display = hasVisibleRows ? '' : 'none';
                    header = header.previousElementSibling;
                }
            }
        });
    };

    // --- EVENT LISTENERS ---

    // When a star icon is clicked
    allStarIcons.forEach(star => {
        star.addEventListener('click', (event) => {
            event.stopPropagation();
            star.classList.toggle('starred');
            star.textContent = star.classList.contains('starred') ? '★' : '☆';
            saveStarredStatus();
            filterAndDisplayContacts(); // Re-apply filters instantly
        });
    });

    // When the "Show Starred" button is clicked
    showStarredButton.addEventListener('click', () => {
        isShowingStarred = !isShowingStarred; // Toggle the filter state
        if (isShowingStarred) {
            showStarredButton.textContent = 'Show All';
            showStarredButton.classList.add('active');
        } else {
            showStarredButton.textContent = 'Show Starred ★';
            showStarredButton.classList.remove('active');
        }
        filterAndDisplayContacts();
    });

    // Search and Clear button actions
    searchButton.addEventListener('click', filterAndDisplayContacts);
    searchInput.addEventListener('keyup', filterAndDisplayContacts); // Live search
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        filterAndDisplayContacts();
    });

    // --- INITIALIZATION ---
    loadStarredStatus();
    filterAndDisplayContacts(); // Run once on page load
});

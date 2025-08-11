import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() {
    const grievanceForm = document.getElementById('grievanceForm');
    const grievanceTableBody = document.getElementById('grievanceTableBody');
    const adminGrievanceTableBody = document.getElementById('adminGrievanceTableBody');
    const adminControls = document.getElementById('adminControls');
    const userView = document.getElementById('userView');
    const adminView = document.getElementById('adminView');
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const userEmail = userInfo.email || 'anonymous';
    const isAdmin = userInfo.permission === 'admin';
    
    // Show admin controls if user is admin
    if (isAdmin) {
        adminControls.style.display = 'block';
        showAdminView(); // Start with admin view for admins
    }

    // Toggle between user and admin views
    toggleViewBtn.addEventListener('click', function() {
        if (userView.style.display === 'none') {
            showUserView();
        } else {
            showAdminView();
        }
    });

    function showUserView() {
        userView.style.display = 'block';
        adminView.style.display = 'none';
        toggleViewBtn.textContent = 'Switch to Admin View';
        fetchAndDisplayUserGrievances();
    }

    function showAdminView() {
        userView.style.display = 'none';
        adminView.style.display = 'block';
        toggleViewBtn.textContent = 'Switch to User View';
        fetchAndDisplayAllGrievances();
    }

    // Fetch and display user's grievances only
    async function fetchAndDisplayUserGrievances() {
        const { data, error } = await supabase
            .from('Grievance Redressal')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error loading grievances:', error);
            grievanceTableBody.innerHTML = '<tr><td colspan="4">Error loading grievances.</td></tr>';
            return;
        }

        grievanceTableBody.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(grievance => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${grievance.id}</td>
                    <td>${grievance.subject}</td>
                    <td class="status-${grievance.status.toLowerCase()}">${grievance.status}</td>
                    <td>${grievance.remarks || ''}</td>
                `;
                grievanceTableBody.appendChild(row);
            });
        } else {
            grievanceTableBody.innerHTML = '<tr><td colspan="4">No grievances found.</td></tr>';
        }
    }

    // Fetch and display all grievances for admin
    async function fetchAndDisplayAllGrievances() {
        const { data, error } = await supabase
            .from('Grievance Redressal')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            adminGrievanceTableBody.innerHTML = '<tr><td colspan="7">Error loading grievances.</td></tr>';
            return;
        }

        adminGrievanceTableBody.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(grievance => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${grievance.id}</td>
                    <td>${grievance.user_id || 'anonymous'}</td>
                    <td>${grievance.subject}</td>
                    <td>${grievance.description}</td>
                    <td>
                        <select class="status-select" data-id="${grievance.id}" data-current="${grievance.status}">
                            <option value="Pending" ${grievance.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Progress" ${grievance.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="Resolved" ${grievance.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                            <option value="Rejected" ${grievance.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </td>
                    <td>
                        <textarea class="remarks-textarea" data-id="${grievance.id}" rows="2">${grievance.remarks || ''}</textarea>
                    </td>
                    <td>
                        <button class="save-btn" data-id="${grievance.id}">Save</button>
                    </td>
                `;
                adminGrievanceTableBody.appendChild(row);
            });

            // Add event listeners for status changes and save buttons
            addAdminEventListeners();
        } else {
            adminGrievanceTableBody.innerHTML = '<tr><td colspan="7">No grievances found.</td></tr>';
        }
    }

    // Add event listeners for admin controls
    function addAdminEventListeners() {
        // Save button event listeners
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const grievanceId = this.getAttribute('data-id');
                const statusSelect = document.querySelector(`.status-select[data-id="${grievanceId}"]`);
                const remarksTextarea = document.querySelector(`.remarks-textarea[data-id="${grievanceId}"]`);
                
                const newStatus = statusSelect.value;
                const newRemarks = remarksTextarea.value;

                const { data, error } = await supabase
                    .from('Grievance Redressal')
                    .update({ 
                        status: newStatus, 
                        remarks: newRemarks 
                    })
                    .eq('id', grievanceId);

                if (error) {
                    alert('Error updating grievance: ' + error.message);
                } else {
                    alert('Grievance updated successfully!');
                    fetchAndDisplayAllGrievances(); // Refresh the table
                }
            });
        });
    }

    // Insert new grievance into Supabase on form submit
    grievanceForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const subject = document.getElementById('grievanceSubject').value;
        const description = document.getElementById('grievanceDescription').value;

        const { data, error } = await supabase
            .from('Grievance Redressal')
            .insert([
                {
                    subject,
                    description,
                    status: 'Pending',
                    remarks: 'Awaiting review.',
                    user_id: userEmail
                }
            ]);
        console.log('Insert result:', { data, error });

        if (error) {
            alert('Error submitting grievance: ' + error.message);
            return;
        }

        grievanceForm.reset();
        if (isAdmin && adminView.style.display !== 'none') {
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

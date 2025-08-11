import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const grievanceForm = document.getElementById('grievanceForm');
const grievanceTableBody = document.getElementById('grievanceTableBody');
const adminTableBody = document.getElementById('adminGrievanceTableBody');
const adminStatusFilter = document.getElementById('adminStatusFilter');
const adminControls = document.getElementById('adminControls');
const adminView = document.getElementById('adminView');

// Show admin sections if present
if (adminControls) adminControls.style.display = 'block';
if (adminView) adminView.style.display = 'block';

async function fetchGrievances() {
    let { data, error } = await supabase
        .from('grievance_redressal')
        .select('id, subject, description, status, remarks')
        .order('created_at', { ascending: false });

    // Fallback if description column doesn't exist
    if (error) {
        ({ data, error } = await supabase
            .from('grievance_redressal')
            .select('id, subject, status, remarks')
            .order('created_at', { ascending: false })
        );
    }

    if (error) {
        console.error('Error fetching grievances:', error);
        return;
    }

    grievanceTableBody.innerHTML = '';
    data.forEach(grievance => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${String(grievance.id).substring(0, 8)}</td>
            <td>${grievance.subject || ''}</td>
            <td>${grievance.description || ''}</td>
            <td class="status-${(grievance.status || 'Pending').toLowerCase()}">${grievance.status || 'Pending'}</td>
            <td>${grievance.remarks || ''}</td>
        `;
        grievanceTableBody.appendChild(row);
    });
}

grievanceForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const subject = document.getElementById('grievanceSubject').value;
    const description = document.getElementById('grievanceDescription').value;

    let { error } = await supabase
        .from('grievance_redressal')
        .insert([
            {
                subject: subject,
                description: description,
                status: 'Pending',
                remarks: 'Awaiting review.'
            }
        ]);

    // Fallback if description column doesn't exist
    if (error) {
        ({ error } = await supabase
            .from('grievance_redressal')
            .insert([
                {
                    subject: subject,
                    status: 'Pending',
                    remarks: 'Awaiting review.'
                }
            ])
        );
    }

    if (error) {
        alert('Error submitting grievance: ' + error.message);
        return;
    }

    alert('Grievance submitted successfully!');
    grievanceForm.reset();
    fetchGrievances(); // Refresh the table
});

// Fetch grievances on page load
fetchGrievances();

// ----------------- Admin rendering & actions -----------------

async function fetchAllGrievancesForAdmin() {
    if (!adminTableBody) return;
    const statusFilter = adminStatusFilter ? adminStatusFilter.value : '';
    let query = supabase
        .from('grievance_redressal')
        .select('id, subject, description, status, remarks')
        .order('created_at', { ascending: false });

    if (statusFilter) {
        query = query.eq('status', statusFilter);
    }

    let { data, error } = await query;
    if (error) {
        // Fallback without description
        query = supabase
            .from('grievance_redressal')
            .select('id, subject, status, remarks')
            .order('created_at', { ascending: false });
        if (statusFilter) {
            query = query.eq('status', statusFilter);
        }
        ({ data, error } = await query);
        if (error) {
            console.error('Error fetching admin grievances:', error);
            return;
        }
    }

    adminTableBody.innerHTML = '';
    data.forEach(grievance => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${String(grievance.id).substring(0, 8)}</td>
            <td>${grievance.subject || ''}</td>
            <td>${grievance.description || ''}</td>
            <td>
                <select class="admin-status" data-id="${grievance.id}">
                    <option value="Pending" ${grievance.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Resolved" ${grievance.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                </select>
            </td>
            <td>
                <input type="text" class="admin-remarks" data-id="${grievance.id}" value="${grievance.remarks || ''}" />
            </td>
            <td>
                <button class="admin-save" data-id="${grievance.id}">Save</button>
            </td>
        `;
        adminTableBody.appendChild(row);
    });

    // Wire up actions
    adminTableBody.querySelectorAll('.admin-save').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const statusEl = adminTableBody.querySelector(`.admin-status[data-id="${id}"]`);
            const remarksEl = adminTableBody.querySelector(`.admin-remarks[data-id="${id}"]`);
            const newStatus = statusEl ? statusEl.value : 'Pending';
            const newRemarks = remarksEl ? remarksEl.value : '';

            const { error } = await supabase
                .from('grievance_redressal')
                .update({ status: newStatus, remarks: newRemarks })
                .eq('id', id);

            if (error) {
                alert('Error updating grievance: ' + error.message);
                return;
            }

            fetchGrievances();
            fetchAllGrievancesForAdmin();
        });
    });
}

if (adminStatusFilter) {
    adminStatusFilter.addEventListener('change', fetchAllGrievancesForAdmin);
}

// If admin table exists on page, render it
if (adminTableBody) {
    fetchAllGrievancesForAdmin();
}

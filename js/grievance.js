import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const grievanceForm = document.getElementById('grievanceForm');
const grievanceTableBody = document.getElementById('grievanceTableBody');

async function fetchGrievances() {
    const { data, error } = await supabase
        .from('grievance_redressal')
        .select('id, subject, status, remarks')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching grievances:', error);
        return;
    }

    grievanceTableBody.innerHTML = ''; // Clear existing rows
    data.forEach(grievance => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${grievance.id.substring(0, 8)}</td>
            <td>${grievance.subject}</td>
            <td class="status-${grievance.status.toLowerCase()}">${grievance.status}</td>
            <td>${grievance.remarks}</td>
        `;
        grievanceTableBody.appendChild(row);
    });
}

grievanceForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const subject = document.getElementById('grievanceSubject').value;

    const { data, error } = await supabase
        .from('grievance_redressal')
        .insert([
            {
                subject: subject,
                status: 'Pending',
                remarks: 'Awaiting review.'
            }
        ]);

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

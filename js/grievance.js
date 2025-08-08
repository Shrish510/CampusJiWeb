// Add Supabase client initialization
const SUPABASE_URL = 'https://jqiifqmiucpqeiytqhkk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlmcW1pdWNwcWVpeXRxaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTE4MDEsImV4cCI6MjA3MDEyNzgwMX0.giovr0elKJhb1pAoH19yfJm1Rp50eOHmQ_Uv8PIy7T4';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function() {
    const grievanceForm = document.getElementById('grievanceForm');
    const grievanceTableBody = document.getElementById('grievanceTableBody');
    
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const userEmail = userInfo.email || 'anonymous'; // Use email from userInfo, fallback to anonymous

    // Fetch and display all grievances from Supabase (no user filter for now)
    async function fetchAndDisplayGrievances() {
        const { data, error } = await supabase
            .from('Grievance Redressal')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            grievanceTableBody.innerHTML = '<tr><td colspan="5">Error loading grievances.</td></tr>';
            return;
        }

        grievanceTableBody.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(grievance => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${grievance.id}</td>
                    <td>${grievance.subject}</td>
                    <td class="status-pending">${grievance.status}</td>
                    <td>${grievance.remarks || ''}</td>
                `;
                grievanceTableBody.appendChild(row);
            });
        } else {
            grievanceTableBody.innerHTML = '<tr><td colspan="5">No grievances found.</td></tr>';
        }
    }

    // Insert new grievance into Supabase on form submit, with user email from userInfo
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
        fetchAndDisplayGrievances();
    });

    // Initial fetch on page load
    fetchAndDisplayGrievances();
});

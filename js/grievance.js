document.addEventListener('DOMContentLoaded', function() {
    const grievanceForm = document.getElementById('grievanceForm');
    const grievanceTableBody = document.getElementById('grievanceTableBody');

    grievanceForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const subject = document.getElementById('grievanceSubject').value;
        const description = document.getElementById('grievanceDescription').value;
        const newRow = document.createElement('tr');
        const newId = grievanceTableBody.rows.length + 1;

        newRow.innerHTML = `
            <td>${newId}</td>
            <td>${subject}</td>
            <td class="status-pending">Pending</td>
            <td>Awaiting review.</td>
        `;

        grievanceTableBody.appendChild(newRow);

        grievanceForm.reset();
    });
});

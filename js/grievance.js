import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const grievanceForm = document.getElementById('grievanceForm');

grievanceForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const subject = document.getElementById('grievanceSubject').value;
  const description = document.getElementById('grievanceDescription').value;

  const { data, error } = await supabase
    .from('grievance_redressal')
    .insert([
      {
        subject,
        description,
        status: 'Pending',
        remarks: 'Awaiting review.',
        user_id: 'anonymous'
      }
    ]);
  
  if (error) {
    alert('Error submitting grievance: ' + error.message);
    return;
  }

  alert('Grievance submitted successfully!');
  grievanceForm.reset();
});

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lwanzqvzxgxsfmqtsbfg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YW56cXZ6eGd4c2ZtcXRzYmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODkzNDksImV4cCI6MjA1OTk2NTM0OX0.K1KFbU_J7xfJw8V-qq6nBud40UbEgI-rJZzAH7-_VP4";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function verifySignUpNoMetadata() {
    const timestamp = Date.now();
    const testEmail = `diagnostic_mar1_nometadata_${timestamp}@example.com`;
    const testPassword = 'Password123!';

    console.log(`--- STARTING NO METADATA TEST ---`);
    console.log(`Email: ${testEmail}`);

    const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        // options: { data: {} } // NO metadata at all, exactly like Auth.tsx handleSignUp
    });

    if (error) {
        console.error(`\nCRITICAL: Sign-up FAILED!`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Status: ${error.status}`);
        console.dir(error, { depth: null });
    } else {
        console.log(`\nSUCCESS: Sign-up completed!`);
        console.log(`User ID: ${data.user?.id}`);
    }
}

verifySignUpNoMetadata();

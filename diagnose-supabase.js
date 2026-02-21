import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fiubzcchficjctlnyvlw.supabase.co';
const supabaseAnonKey = 'sb_publishable_zSOYS3uYZz7uwr4lbg3_sg_oeOm2Iy8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('--- Database Connection Diagnostics ---');
    console.log('Target URL:', supabaseUrl);

    try {
        const { data, error } = await supabase
            .from('system_logs')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Connection Error:', error.message);
            if (error.message.includes('JWT')) {
                console.log('TIP: The provided Key might be invalid. Ensure you are using the "anon public" key starting with "eyJ".');
            }
        } else {
            console.log('✅ Connection Successful!');
            console.log('Current Data Count in logs:', data?.length || 0);
        }
    } catch (err) {
        console.error('❌ Unexpected Error:', err.message);
    }
}

testConnection();

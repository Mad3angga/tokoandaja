import { createClient } from '@supabase/supabase-js';

// Variabel lingkungan untuk URL dan kunci API Supabase
// Dalam produksi, gunakan variabel lingkungan yang sebenarnya
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Membuat klien Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

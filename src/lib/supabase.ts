import { createClient } from '@supabase/supabase-js';

// Variabel lingkungan untuk URL dan kunci API Supabase
// Dalam produksi, gunakan variabel lingkungan yang sebenarnya
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Membuat klien Supabase hanya jika URL dan kunci tersedia
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

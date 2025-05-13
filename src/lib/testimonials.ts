import { supabase } from './supabase';

// Define the testimonial type
export type Testimonial = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  created_at?: string;
};

// Fetch all testimonials from the database
export async function getAllTestimonials(): Promise<Testimonial[]> {
  // Jika supabase client tidak tersedia, kembalikan array kosong
  if (!supabase) {
    console.error('Supabase client tidak tersedia');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }

    return data || [];
  } catch (e) {
    console.error('Exception fetching testimonials:', e);
    return [];
  }
}

// Add a new testimonial to the database
export async function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial | null> {
  // Jika supabase client tidak tersedia, kembalikan null
  if (!supabase) {
    console.error('Supabase client tidak tersedia');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();

    if (error) {
      console.error('Error adding testimonial:', error);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Exception adding testimonial:', e);
    return null;
  }
}

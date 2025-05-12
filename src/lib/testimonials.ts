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
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

// Add a new testimonial to the database
export async function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial | null> {
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
}

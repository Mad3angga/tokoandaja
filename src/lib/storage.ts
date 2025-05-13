import { supabase } from './supabase';

// Fungsi untuk mendapatkan URL publik dari file di Supabase Storage
export function getPublicUrl(bucketName: string, path: string): string {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return '';
  }
  
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}

// Fungsi untuk mengupload file ke Supabase Storage
export async function uploadFile(
  bucketName: string,
  path: string,
  file: File
): Promise<string | null> {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return null;
  }

  const { data, error } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  return getPublicUrl(bucketName, data.path);
}

// Fungsi untuk menghapus file dari Supabase Storage
export async function deleteFile(bucketName: string, path: string): Promise<boolean> {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    return false;
  }

  const { error } = await supabase.storage.from(bucketName).remove([path]);

  if (error) {
    console.error('Error deleting file:', error);
    return false;
  }

  return true;
}

// Define the correct types for Next.js App Router page components
export interface PageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

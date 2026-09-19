import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();
  if (!project) notFound();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">{project.title}</h1>
      <p className="text-gray-500 mt-2">
        Milestone 2 adds upload + chat here.
      </p>
    </main>
  );
}

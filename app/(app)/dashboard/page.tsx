import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Your projects</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <form action="/api/signout" method="post">
          <button className="text-sm text-gray-500 hover:text-black">Sign out</button>
        </form>
      </div>

      {!projects?.length ? (
        <div className="border border-dashed rounded-lg p-12 text-center text-gray-500">
          No projects yet. Milestone 2 will add creation here.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              className="block bg-white p-5 rounded-lg border hover:border-black"
            >
              <div className="font-medium">{p.title}</div>
              {p.description && (
                <div className="text-sm text-gray-500 mt-1">{p.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

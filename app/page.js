import { getAllJobs } from "@/lib/jobs";

function timeAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function HomePage() {
  const jobs = getAllJobs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-2">
          {jobs.length} open roles
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-700 leading-tight max-w-2xl">
          Open roles worth a second look.
        </h1>
        <p className="mt-3 text-ink/70 max-w-xl">
          No noise, no rankings for sale — just the current list, newest first.
        </p>
      </div>

      <ol className="border-t-2 border-ink">
        {jobs.map((job, i) => (
          <li key={job.id} className="border-b-2 border-ink group">
            <a
              href={`/jobs/${job.id}`}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-5 hover:bg-signalLight/60 transition-colors px-2 -mx-2"
            >
              <span className="font-mono text-sm text-ink/40 md:w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl font-600 group-hover:text-signal">
                  {job.title}
                </h2>
                <p className="text-sm text-ink/70">
                  {job.company} — {job.location}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:w-56 shrink-0 md:justify-end">
                <span className="font-mono text-[11px] uppercase tracking-wide bg-ink text-paper px-2 py-1 rounded">
                  {job.type}
                </span>
              </div>
              <span className="font-mono text-xs text-ink/50 md:w-24 shrink-0 md:text-right">
                {timeAgo(job.posted)}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

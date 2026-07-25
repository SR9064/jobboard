import { getAllJobs, getJobById } from "@/lib/jobs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ id: job.id }));
}

export default function JobDetailPage({ params }) {
  const job = getJobById(params.id);
  if (!job) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <a
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-signal"
      >
        ← Back to listings
      </a>

      <div className="mt-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-700">
            {job.title}
          </h1>
          <p className="text-ink/70 mt-1">
            {job.company} — {job.location}
          </p>
        </div>
        <span className="stamp font-mono text-xs text-signal uppercase">
          Open
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 font-mono text-xs uppercase tracking-wide text-ink/60">
        <span className="border border-ink/30 rounded px-2 py-1">
          {job.type}
        </span>
        <span className="border border-ink/30 rounded px-2 py-1">
          {job.salary}
        </span>
        <span className="border border-ink/30 rounded px-2 py-1">
          Posted {job.posted}
        </span>
      </div>

      <p className="mt-8 text-ink/85 leading-relaxed">{job.description}</p>

      {job.responsibilities?.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-600 mb-2">
            What you&apos;ll do
          </h2>
          <ul className="space-y-1.5">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2 text-ink/80">
                <span className="text-signal">—</span>
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {job.requirements?.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-600 mb-2">
            What we&apos;re looking for
          </h2>
          <ul className="space-y-1.5">
            {job.requirements.map((r, i) => (
              <li key={i} className="flex gap-2 text-ink/80">
                <span className="text-rust">—</span>
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {job.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] bg-signalLight text-signal px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <button className="mt-10 bg-ink text-paper font-mono text-sm uppercase tracking-widest px-6 py-3 rounded hover:bg-signal transition-colors">
        Apply for this role
      </button>
    </div>
  );
}

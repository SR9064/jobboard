import jobsData from "@/data/jobs.json";

// In a real app this would hit a database. For this project, we read/write
// an in-memory copy seeded from data/jobs.json so posting a new job works
// during a session without needing a database setup.
let jobs = [...jobsData];

export function getAllJobs() {
  return [...jobs].sort((a, b) => new Date(b.posted) - new Date(a.posted));
}

export function getJobById(id) {
  return jobs.find((job) => job.id === id) || null;
}

export function addJob(job) {
  const newJob = {
    id: String(Date.now()),
    posted: new Date().toISOString().slice(0, 10),
    responsibilities: [],
    requirements: [],
    tags: job.tags
      ? job.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    ...job,
  };
  jobs = [newJob, ...jobs];
  return newJob;
}

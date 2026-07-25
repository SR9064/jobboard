"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full border-2 border-ink/20 bg-paper rounded px-3 py-2 focus:border-signal transition-colors outline-none";
const labelClass =
  "font-mono text-xs uppercase tracking-widest text-ink/60 block mb-1.5";

export default function PostJobForm() {
  const router = useRouter();
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(e.target);
    const payload = {
      title: form.get("title"),
      company: form.get("company"),
      location: form.get("location"),
      type: form.get("type"),
      salary: form.get("salary"),
      description: form.get("description"),
      tags: form.get("tags"),
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      const job = await res.json();
      router.push(`/jobs/${job.id}`);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="title">
          Job title
        </label>
        <input
          className={inputClass}
          id="title"
          name="title"
          required
          placeholder="e.g. Senior Backend Engineer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="company">
            Company
          </label>
          <input className={inputClass} id="company" name="company" required />
        </div>
        <div>
          <label className={labelClass} htmlFor="location">
            Location
          </label>
          <input
            className={inputClass}
            id="location"
            name="location"
            required
            placeholder="e.g. Hyderabad, IN (Onsite)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="type">
            Employment type
          </label>
          <select className={inputClass} id="type" name="type">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="salary">
            Salary range
          </label>
          <input
            className={inputClass}
            id="salary"
            name="salary"
            placeholder="e.g. ₹12L - ₹18L / yr"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="description">
          Description
        </label>
        <textarea
          className={inputClass}
          id="description"
          name="description"
          rows={4}
          placeholder="What will this person actually do?"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          className={inputClass}
          id="tags"
          name="tags"
          placeholder="React, Node.js, AWS"
        />
      </div>

      {error && (
        <p className="text-rust text-sm font-mono">⚠ {error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink text-paper font-mono text-sm uppercase tracking-widest px-6 py-3 rounded hover:bg-signal transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Posting…" : "Post this role"}
      </button>
    </form>
  );
}

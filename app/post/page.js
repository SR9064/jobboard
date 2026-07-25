import PostJobForm from "@/components/PostJobForm";

export default function PostPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-2">
        New listing
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-700 mb-8">
        Post an open role.
      </h1>
      <PostJobForm />
    </div>
  );
}

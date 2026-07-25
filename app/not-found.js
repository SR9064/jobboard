export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-rust mb-3">
        404
      </p>
      <h1 className="font-display text-3xl font-700 mb-3">
        This listing has closed or never existed.
      </h1>
      <a
        href="/"
        className="font-mono text-sm uppercase tracking-widest text-signal underline"
      >
        Back to open roles
      </a>
    </div>
  );
}

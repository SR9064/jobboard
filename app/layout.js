import "./globals.css";

export const metadata = {
  title: "The Wire — Job Board",
  description: "A no-nonsense listings board for open roles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <header className="border-b-2 border-ink">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-baseline justify-between">
            <a href="/" className="font-display text-2xl font-700 tracking-tight">
              The Wire
              <span className="align-top text-xs font-mono ml-1 text-signal">
                JOBS
              </span>
            </a>
            <nav className="font-mono text-xs uppercase tracking-widest flex gap-6">
              <a href="/" className="hover:text-signal">
                Listings
              </a>
              <a
                href="/post"
                className="hover:text-signal border-b border-ink hover:border-signal"
              >
                Post a role
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t-2 border-ink mt-16">
          <div className="max-w-4xl mx-auto px-6 py-6 font-mono text-xs text-ink/60 flex justify-between">
            <span>The Wire — Vol. 1</span>
            <span>Built &amp; shipped with CI/CD</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

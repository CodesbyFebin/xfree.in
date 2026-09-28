import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/canonical';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'How It Works | XFree',
    description: 'Learn how XFree browser-based tools process your data locally for privacy-first execution.',
    alternates: buildAlternates('/how-it-works', locale),
  };
}

export default function HowItWorksPage() {
  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <Header />

      <main id="main-content" className="pt-20">
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
          <header className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-cyber-text font-mono">How XFree Works</h1>
            <p className="text-cyber-muted max-w-2xl mx-auto">
              Most tools process input in your browser. IP, DNS, and WHOIS lookups use a server to query public services.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="cyber-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-glow/10 border border-cyber-glow/20 flex items-center justify-center">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-cyber-text">You Load the Page</h3>
              <p className="text-cyber-muted text-sm">
                The tool page loads in your browser along with all necessary JavaScript code.
              </p>
            </div>

            <div className="cyber-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-glow/10 border border-cyber-glow/20 flex items-center justify-center">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-cyber-text">You Enter Data</h3>
              <p className="text-cyber-muted text-sm">
                Input is typed or pasted directly into the browser interface.
              </p>
            </div>

            <div className="cyber-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-glow/10 border border-cyber-glow/20 flex items-center justify-center">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-cyber-text">Local Processing</h3>
              <p className="text-cyber-muted text-sm">
                Local tools process your input in the browser. Lookup tools query a server for external records.
              </p>
            </div>

            <div className="cyber-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-glow/10 border border-cyber-glow/20 flex items-center justify-center">
                <span className="text-2xl">4</span>
              </div>
              <h3 className="text-lg font-bold text-cyber-text">Instant Results</h3>
              <p className="text-cyber-muted text-sm">
                Local results appear without a lookup request; IP, DNS, and WHOIS results require a network response.
              </p>
            </div>
          </div>

          <div className="cyber-card p-8 space-y-6">
            <h2 className="text-2xl font-bold text-cyber-text text-center">Local Mode</h2>
            <p className="text-cyber-muted text-sm text-center max-w-xl mx-auto">
              Most tools process data locally. IP Lookup, DNS Lookup, and WHOIS Lookup
              send the value you enter to our server for the requested lookup.
              See the <Link href="/privacy" className="text-cyber-glow hover:underline">privacy policy</Link> for the services queried.
            </p>
            <ul className="space-y-2 text-cyber-muted text-sm max-w-md mx-auto">
              <li>✓ Local tools process input in browser JavaScript</li>
              <li>✓ Lookup tools identify their server requests</li>
              <li>✓ Local tools can work after the page loads</li>
            </ul>
          </div>

          <div className="cyber-card p-8 space-y-4 border-cyber-cyan/30">
            <h2 className="text-xl font-bold text-cyber-text">Security Notes</h2>
            <p className="text-cyber-muted text-sm">
              Even in Local Mode, we recommend:
            </p>
            <ul className="list-disc list-inside space-y-1 text-cyber-muted text-sm">
              <li>Close browser tabs when done processing sensitive data</li>
              <li>Clear browser cache periodically</li>
              <li>Do not process truly confidential data on shared computers</li>
              <li>For highly sensitive data, use an air-gapped device</li>
            </ul>
          </div>

          <div className="cyber-card p-8 space-y-4 text-center">
            <h2 className="text-xl font-bold text-cyber-text">Try It Yourself</h2>
            <p className="text-cyber-muted text-sm">
              To inspect a local tool, open its page and watch whether input is sent in the network tab. Start with the{' '}
              <Link href="/tools/json-formatter" className="text-cyber-glow hover:underline">JSON Formatter</Link>, or read the{' '}
              <Link href="/guides" className="text-cyber-glow hover:underline">developer guides</Link> for a deeper technical walkthrough of specific tools.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/tools/regex-tester" className="text-cyber-glow hover:underline">Test a regular expression</Link>
              <Link href="/tools/jwt-decoder" className="text-cyber-glow hover:underline">Inspect a JWT locally</Link>
              <Link href="/tools/xml-sitemap-generator" className="text-cyber-glow hover:underline">Generate an XML sitemap</Link>
              <Link href="/tools/meta-tag-generator" className="text-cyber-glow hover:underline">Create meta tags</Link>
              <Link href="/tools" className="text-cyber-glow hover:underline">Browse all 58 tools</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

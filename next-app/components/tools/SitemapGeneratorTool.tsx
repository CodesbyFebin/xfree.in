'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, Download, Plus, Trash2 } from 'lucide-react';

interface UrlEntry {
  url: string;
}

export function SitemapGeneratorTool() {
  const [urls, setUrls] = useState<UrlEntry[]>([
    { url: 'https://example.com/' },
  ]);
  const [baseUrl, setBaseUrl] = useState('https://example.com');
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    setUrls([...urls, { url: `${baseUrl}/` }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, value: string) => {
    setUrls(urls.map((entry, i) => i === index ? { url: value } : entry));
  };

  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

  const generateSitemap = useCallback(() => {
    const urlElements = urls.filter((entry) => entry.url.trim())
      .map(
        (entry) => `  <url>
    <loc>${escapeXml(entry.url.trim())}</loc>
  </url>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }, [urls]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateSitemap());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateSitemap()], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="text-xs uppercase tracking-wider text-cyber-glow font-mono font-semibold mb-2 block">
          Base URL
        </label>
        <input
          type="url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="w-full max-w-md bg-cyber-bg border border-cyber-border rounded-lg px-3 py-2 text-sm font-mono text-cyber-glow focus:border-cyber-glow focus:outline-none transition-colors"
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wider text-cyber-glow font-mono font-semibold">
            URLs ({urls.length})
          </label>
          <button
            onClick={addUrl}
            className="text-xs text-cyber-glow hover:text-cyber-text font-mono transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            ADD URL
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {urls.map((entry, i) => (
            <div key={i} className="flex items-center gap-2 bg-cyber-bg border border-cyber-border rounded-lg p-2">
              <input
                type="url"
                value={entry.url}
                onChange={(e) => updateUrl(i, e.target.value)}
                className="flex-1 bg-transparent border-none text-xs font-mono text-cyber-glow focus:outline-none"
                placeholder="https://example.com/page"
              />
              <button
                onClick={() => removeUrl(i)}
                className="text-cyber-muted hover:text-rose-400 transition-colors"
                disabled={urls.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-wider text-cyber-glow font-mono font-semibold">
            Generated XML
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-[10px] text-cyber-glow hover:text-cyber-text font-mono transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
            <button
              onClick={handleDownload}
              className="text-[10px] text-cyber-glow hover:text-cyber-text font-mono transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              DOWNLOAD
            </button>
          </div>
        </div>
        <pre className="w-full h-48 bg-cyber-bg border border-cyber-border rounded-lg p-4 font-mono text-xs text-cyber-glow overflow-auto">
          {generateSitemap()}
        </pre>
      </div>

      <div className="text-xs text-cyber-muted">
        <p>Include canonical URLs that return 200. Review the generated file before submitting it to a search engine.</p>
      </div>
    </div>
  );
}

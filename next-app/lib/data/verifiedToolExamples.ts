// Reviewed against the corresponding component's processing logic. These
// deterministic examples are English-only until editorial translations exist.
export const VERIFIED_TOOL_EXAMPLES: Record<string, {
  input: string;
  output: string;
  outputLabel?: string;
  limitation: string;
}> = {
  'json-formatter': {
    input: '{"status":"ok","count":2}',
    output: '{\n  "status": "ok",\n  "count": 2\n}',
    limitation: 'Formatting and syntax validation do not verify that a JSON object matches your application schema.',
  },
  'regex-tester': {
    input: 'Pattern: \\d+; flags: g; text: Order 42, item 7',
    output: 'Matches: 42, 7',
    limitation: 'The widget uses JavaScript regular expressions. A match here does not guarantee the same behavior in another regex engine.',
  },
  'jwt-decoder': {
    input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    output: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}',
    outputLabel: 'DECODED PAYLOAD:',
    limitation: 'Decoding displays claims but does not verify the signature, issuer, audience, expiry, or whether a token has been revoked. Never paste a live token into a service you have not inspected.',
  },
  'xml-sitemap-generator': {
    input: 'https://example.com/',
    output: '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://example.com/</loc>\n  </url>\n</urlset>',
    outputLabel: 'OUTPUT EXCERPT (XML DECLARATION OMITTED):',
    limitation: 'The generator does not crawl your site or confirm that a URL is canonical and returns 200; review each entry before submission.',
  },
  'meta-tag-generator': {
    input: 'Title: Example Page; description: A sample page; URL: https://example.com',
    output: '<title>Example Page</title>\n<meta name="description" content="A sample page">',
    outputLabel: 'OUTPUT EXCERPT:',
    limitation: 'The generated HTML is a starting point. Preview the real page and escape special characters in values before inserting them into HTML.',
  },
  'base64-encode': {
    input: 'Hello World',
    output: 'SGVsbG8gV29ybGQ=',
    limitation: 'This widget uses btoa on a text string. It does not accept files, and non-Latin-1 Unicode characters need UTF-8 conversion before encoding.',
  },
  'base64-decode': {
    input: 'SGVsbG8gV29ybGQ=',
    output: 'Hello World',
    limitation: 'Base64 is reversible encoding, not encryption. The widget uses atob and does not interpret decoded binary data as a file.',
  },
  'url-encode': {
    input: 'Hello World & Test?',
    output: 'Hello%20World%20%26%20Test%3F',
    limitation: 'This uses encodeURIComponent for a URI component, not a complete URL; encoding an entire URL also escapes its separators.',
  },
  'url-decode': {
    input: 'Hello%20World%20%26%20Test%3F',
    output: 'Hello World & Test?',
    limitation: 'This uses decodeURIComponent; malformed percent sequences produce an error, and plus signs are not converted to spaces.',
  },
};

# XFree.in search release follow-ups

Updated 2026-09-29. Production baseline: GitHub merge PR #8 (`cf14636181a73df31d30f0c1c1fd2acf2cd86223`) and live sitemap with 826 URLs. This report supersedes the release-state paragraphs in `xfree-search-plan-2026-09.md`; its 58 provisional tool briefs remain useful as candidate copy, not verified usage rankings or exact output examples.

## Evidence and decisions

- Source audit: every pillar detail template renders English headings and supporting prose; its locale JSON overrides only names and descriptions. The pillars index likewise renders English editorial text. The additional static routes `/blog`, `/contact`, `/faq`, `/roadmap`, `/use-cases`, `/xfree-app`, `/updates` and five update categories render English main bodies in their page sources. `/tools` is an English hub around a mostly English registry. These are now English-only in the generated eligibility manifest. This does not claim those pages are soft 404s.
- The homepage has translated `Home` messages and remains eligible in all ten locales. Five tool-specific translations in each additional locale remain eligible: JSON Formatter, Regex Tester, JWT Decoder, XML Sitemap Generator, and Meta Tag Generator. The shared tool template still has English labels; editorial review of all 45 rendered translations is required before claiming complete localization.
- The sitemap moves from 826 to 205 canonical URLs: ten homepages, 20 English static routes, 58 English tools, 45 translated tools, 55 English pillar details, 13 English categories and four English guides. The generator uses a sitemap index and seven shards strictly for diagnosis; this does not change crawl priority. Truthful guide `lastReviewed` is preserved, dates remain omitted elsewhere.
- Source confirms the homepage already links to featured tools and the hub, and tool pages already link related tools. This change makes links to ineligible locale routes resolve to English. It also adds links from matching tools back to their editorial guides, and makes breadcrumb schema URLs match visible destinations.
- Organization `sameAs` now points to the production source repository `CodesbyFebin/xfree.in`; `disambiguatingDescription` and the About page identify this tools platform without naming unrelated brands. About copy no longer implies that DNS, IP, WHOIS and AI workflows are entirely local.

## A. Translation eligibility

`generate-translation-manifest.ts` emits eligible locales from the source registry and JSON translation fields. English-only route families are enumerated next to the generator in `routeFamilies.ts`. The sitemap, metadata, and navigation consume the same manifest. A new localized body can only be admitted after comparing its rendered `<main>` against English, excluding nav/footer, code samples, proper nouns and technical tokens, and checking that headings, instructions, explanations and FAQs carry meaningful translation. The manifest's current field comparison is a mechanical gate, not editorial quality certification. Track omissions in an editor-owned matrix; do not silently admit a route because its title alone is translated.

## B. Ineligible locale resolution

Keep `200 + noindex, follow + English canonical` for existing untranslated paths. Navigation now points users to the English destination; language switching remains restricted by eligibility. Before converting any historical locale URL to 404 or redirect, inspect its incoming links, direct traffic and saved URLs. A 301 requires a true equivalent; a 404 does not guarantee that crawlers never revisit. Do not mass-redirect old tool slugs to loosely related tools.

## C. Sitemap and historical URLs

`/sitemap.xml` is an index. The shards are `core`, `tools-en`, `tools-locales`, `pillars`, `categories`, `guides`, and `static-locales`. Every entry has the same reciprocal eligible hreflang set, with self-reference and English `x-default`; `lastmod` appears only where tracked. No `priority` or `changefreq` is emitted. `robots.txt` continues to cite `/sitemap.xml`.

The XML sitemap generator widget had a nonstandard namespace, unescaped URLs and `priority`/`changefreq` controls. It now emits the standard `0.9` namespace, escapes URLs, and omits the unused controls; its English and nine translated instructions/descriptions were updated to remove unsupported `lastmod`, video, image, news and priority claims. The old GSC snapshot contains 54 `/tools/` 404s but not their full URL table here. **UNVERIFIED:** whether each is still requested or has a relevant live replacement. Do not implement a redirect from a guessed rename: `/tools/jwt-decoder` is a current, working slug. Obtain the exact GSC export and record source URL, last crawled date, external referrals, current response, replacement intent, and decision (301/404/410). The old `/?q={search_term_string}` observation is likewise historical; current active layout omits `SearchAction`, so do not add a speculative redirect.

## D. Internal links

Current crawl paths: home → featured tool / `/tools`; `/tools` → tool; guide → related tool; tool → matching guide / related tool / pillar. The eligible-link component keeps translated destinations where available and routes other internal links to English without manufacturing an ineligible locale URL. Use anchors that describe the task (for example, “Inspect a JWT locally”), not a fixed number of exact-match keywords. No link-count threshold is asserted.

## E. Tool content and schema

The existing report appendix contains 58 provisional briefs. Rank is from an unverified registry proxy, **not measured usage**. Work through them after getting per-slug landing, tool-start and successful-output counts. Five English tool pages now show deterministic input, output or labeled output excerpt, and a specific limitation (JSON, regex, JWT, XML sitemap, meta tags). For the other 53, confirm title/H1/meta against the widget; run the candidate input in the actual component and capture exact output; add one real limitation; review related links. Existing `SoftwareApplication` schema emits stable canonical `@id`, free offer, `featureList`, category and accessibility; verify that each claim matches runtime behavior. A schema change is not a substitute for a working example, and it does not guarantee rich results or AI citation.

## F. Entity identity

Use “XFree.in” in Organization identity, About/trust content and controlled external listings. Use “XFree <Tool>” beside a visible domain on tool pages. Proposed description now live in schema: “XFree.in is the free developer and SEO tools platform at www.xfree.in, distinct from unrelated products and websites that also use the name XFree.” Only add `sameAs` for owned profiles. Do not imply that the separately deployed AI workspace has identical privacy or license behavior without its own audit.

## G. Outreach drafts (manual, unpublished)

Participate under each community's current rules. There is no universal karma threshold granting promotional permission. Disclose ownership if a link is directly useful; never paste the same draft across subreddits.

- Reddit, JSON: “A formatter helps identify a syntax problem, but keep the original input so you can reproduce it. JSON needs double-quoted keys and does not allow trailing commas. For sensitive payloads, inspect whether a site sends input to a server. I maintain XFree.in's JSON formatter if a browser UI helps.”
- Reddit, JWT: “The payload is encoded, not encrypted. Decoding it is different from verifying its signature, and a token can still grant access while unexpired. Avoid posting real tokens. I built XFree.in's decoder for local inspection; confirm the page's network behavior before using any third-party decoder with a secret.”
- Reddit, sitemap: “List canonical 200 URLs and use `lastmod` only for real updates. Submitting XML helps discovery but does not guarantee indexing. I maintain XFree.in's sitemap generator if you want a browser starting point; review its output against your actual routes.”
- Quora: find a Google-visible question using the exact tool query plus `site:quora.com`; answer directly → show a reproducible example → give a limitation → close with a takeaway. Use “Developer of XFree.in” only if true; disclose any link.
- Product Hunt: “XFree.in — free browser tools for formatting, validation and SEO tasks, with no account for the core catalog.”
- Show HN: “Show HN: XFree.in, an open-source collection of practical browser tools. We built 58 tool pages and welcome feedback on tool behavior and privacy claims.”
- AlternativeTo: factual tool categories, source repository, license and per-tool privacy notes; avoid an unverified ‘all processing is local’ claim.
- Awesome Lists: submit one relevant working tool with a brief use case and follow that list's contribution policy.
- Dev.to: publish an original walkthrough of a local JSON formatting workflow with input, exact output, limitation and source link.

No third-party posts or directory submissions have been made by this code release.

## H. Reddit resource gate

A resource page is **not published**. The initial search returned a Reddit JSON formatter discussion but did not establish recurring, representative complaints or an endorsement. Research at least several directly relevant threads and current query SERPs, cite each, explain a reproducible comparison, and avoid an H1 implying Reddit recommends XFree. Candidate: `/resources/json-formatter-reddit-questions`. A bridge page requires a distinct intent, impressions in two comparable review periods, and an answer missing from the resource/tool pages.

## I. Measurement and thresholds

Export GSC queries **with pages**, country and device for two comparable 28-day windows. Save separate filters: `^xfree(\\.in)?$`; `xfree.*(json|jwt|sitemap|regex|meta)`; trust terms (`safe|privacy|legit|review`); generic tool terms; and `reddit`. Compare CTR only for the same query/country/device and similar position range. Review new brand+tool queries every 14 days. Indexing: segment EN tools, eligible localized tools, pillars, guides, categories and static URLs; track indexed, discovered, crawled-not-indexed and error states after release. A gain in bare `xfree` impressions without the right page/entity is not disambiguation success.

A privacy-safe product funnel should aggregate landing page → tool start → successful output by slug, without logging input, tokens or generated content. Instrumentation and baseline counts are **UNVERIFIED**; do not publish a conversion rate before observing both start and success. Monthly AI citation samples should record query, engine, date, cited URL and entity confusion; an unlinked mention is not a confirmed citation. Re-evaluate at 14 and 28 days after release; indexing is not guaranteed.

## Next owner actions and evidence limits

| Action | Type | State | Evidence needed |
|---|---|---|---|
| Ship eligibility, link and sitemap changes | Code | Preview verification pending | Signed Vercel preview, then production smoke test |
| Review 45 rendered tool translations | Content | Open | Human review of each locale tool body |
| Validate remaining 53 example outputs and limitations | Content | Open; five deterministic examples added | Actual widget output and runtime feature check |
| Reconcile 54 historical 404s | Code | Blocked on exact URL export | GSC URL table and inbound link evidence |
| Submit sitemap index to GSC and segment coverage | Manual | Open | Search Console access |
| Publish community and directory content | Outreach | Unpublished drafts | Current site rules and factual product check |
| Pilot Reddit resource | Content | Gate not met | Representative sourced discussion and search intent |
| Rank tool briefs by demand | Measurement | Blocked on telemetry | Query+page and tool-start/success exports |

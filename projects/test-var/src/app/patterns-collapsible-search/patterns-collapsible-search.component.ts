import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

type Section = { title: string; bodyMd: string; html: string; open: boolean };
type SearchHit = { symbol: string; url: string; context: string };

@Component({
  selector: 'app-patterns-collapsible-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./patterns-collapsible-search.Component.html' ,
  styles: [`
  .search-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto; /* push to the right side */
}


    /* Card shell */
    .card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      max-width: 900px;
      margin: 16px auto;
      overflow: hidden;
    }
    .card-body { padding: 18px 22px; }

    /* Monospace (like your screenshot) */
    .h1, .h2, .content {
      font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    .h1 {
      margin: 0 0 20px;
      font-size: 22px;
      font-weight: 700;
      color: #111827;
      letter-spacing: .2px;
    }

    .h2 {
      display: inline-block;
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #e68e2aff;
      letter-spacing: .2px;
      white-space: pre;
    }

    .panel { border-bottom: 1px solid #f1f5f9; padding: 8px 0 12px; }
    .panel:last-child { border-bottom: none; }
    .summary {
      list-style: none;
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px;
      cursor: pointer; user-select: none;
      padding: 6px 2px;
      border-radius: 8px;
      outline: none;
    }
    .summary::-webkit-details-marker { display: none; }
    .summary:hover { background: #fff7ed; }
    .summary:focus-visible { outline: 3px solid #fed7aa; outline-offset: 2px; }
    .chev { color: #d97706; transition: transform .15s ease; font-weight: 700; }
    details[open] .chev { transform: rotate(180deg); }

    .content { padding: 8px 0 0; }
    .content ul { list-style: none; padding-left: 0; margin: 0 0 14px; }
    .content li { position: relative; padding-left: 22px; margin: 6px 0; line-height: 1.5; }
    .content li::before { content: "–"; position: absolute; left: 0; top: 0; color: #3b82f6; font-weight: 700; }
    .content a { color: inherit; text-decoration: none; }
    .content a:hover { color: #1d4ed8; text-decoration: underline; }

    /* Search UI */
    .search-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .search-input {
      flex: 1;
      border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 10px;
      font-family: inherit; font-size: 14px;
      outline: none;
    }
    .search-input:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px #fde68a; }
    .btn {
      border: 1px solid #f59e0b;
      background: #f59e0b10;
      color: #92400e;
      padding: 8px 10px;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn:hover { background: #f59e0b20; }
    .btn.ghost {
      border-color: #e5e7eb; color: #374151; background: transparent;
    }
    .btn.ghost[disabled] { opacity: .4; cursor: not-allowed; }
    .muted { color: #6b7280; }
    .tiny { font-size: 12px; }
    

    @media (prefers-reduced-motion: reduce) {
      .summary, .chev { transition: none !important; }
    }
  `]
})
export class PatternsCollapsibleComponentSearch implements OnInit {

  md = `
# CODCODA Chart Patterns & Trading Strategies – ${new Date()}

## Search
- Type a keyword (cup, handle, breakout, range, neckline, SMA-150) or a ticker (AAPL), then press Enter or click Search.

## Cup and Handle 
- [AAPL](https://www.tradingview.com/chart/?symbol=AAPL) – resistance 246, handle forming
- [MSFT](https://www.tradingview.com/chart/?symbol=MSFT) – breakout above 398
- [TSLA](https://www.tradingview.com/chart/?symbol=TSLA) – early handle, watch above 252

## Inverted Head & Shoulders
- [AMZN](https://www.tradingview.com/chart/?symbol=AMZN) – neckline 132, right shoulder forming
- [NVDA](https://www.tradingview.com/chart/?symbol=NVDA) – breakout pending above 920

## Rectangle (continuation)
- [META](https://www.tradingview.com/chart/?symbol=META) – range 440–455
- [AMD](https://www.tradingview.com/chart/?symbol=AMD) – testing upper range 150

## SMA-long trend
- [SPY](https://www.tradingview.com/chart/?symbol=SPY) – above SMA-150
- [QQQ](https://www.tradingview.com/chart/?symbol=QQQ) – bullish slope
  `.trim();

  pageTitle = '';
  sections: Section[] = [];

  // Search state
  searchQuery = '';
  searchResults: SearchHit[] = [];
  searchRan = false;

  async ngOnInit(): Promise<void> {
    const { pageTitle, sections } = this.splitIntoSections(this.md);
    this.pageTitle = pageTitle;

    const out: Section[] = [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const html = await marked.parse(s.bodyMd) as string;
      // Open the Search panel by default; otherwise open the first real section.
      const isSearch = s.title.trim().toLowerCase() === '## search';
      out.push({ ...s, html, open: isSearch || (i === 0 && !isSearch) });
    }
    this.sections = out;
  }

  /** Perform a substring search over raw markdown lines; return matching tickers + context. */
  runSearch(): void {
    this.searchRan = true;
    const q = (this.searchQuery || '').trim();
    if (!q) {
      this.searchResults = [];
      return;
    }
    const hits: SearchHit[] = [];

    // Build regex for markdown links like [AAPL](https://...)
    const linkRe = /\[([A-Z0-9.\-]+)\]\((https?:\/\/[^\)]+)\)/g;

    // Search through every line of the markdown body (skip the H1)
    const lines = this.md.split(/\r?\n/).filter(l => !l.startsWith('# '));

    // Case-insensitive substring match for the whole line
    const qLower = q.toLowerCase();

    for (const line of lines) {
      if (!line.trim().startsWith('-')) continue; // only bullet lines contain stocks in this doc
      if (line.toLowerCase().includes(qLower) || this.containsTicker(line, q)) {
        // Extract all tickers in the line
        let m: RegExpExecArray | null;
        linkRe.lastIndex = 0;
        while ((m = linkRe.exec(line)) !== null) {
          const symbol = m[1];
          const url = m[2];
          hits.push({ symbol, url, context: this.trimContext(line) });
        }
      }
    }

    // De-duplicate by symbol (keep first occurrence)
    const seen = new Set<string>();
    this.searchResults = hits.filter(h => {
      if (seen.has(h.symbol)) return false;
      seen.add(h.symbol);
      return true;
    });
  }

  /** Open all current search results in new tabs. */
  openAll(): void {
    for (const r of this.searchResults) {
      window.open(r.url, '_blank', 'noopener');
    }
  }

  /** Helper: does a line contain the exact ticker typed (case-insensitive)? */
  private containsTicker(line: string, q: string): boolean {
    const tickers = this.extractTickers(line);
    const needle = q.trim().toUpperCase();
    return tickers.some(t => t === needle);
  }

  /** Extract tickers from a markdown line. */
  private extractTickers(line: string): string[] {
    const out: string[] = [];
    const linkRe = /\[([A-Z0-9.\-]+)\]\((https?:\/\/[^\)]+)\)/g;
    let m: RegExpExecArray | null;
    while ((m = linkRe.exec(line)) !== null) out.push(m[1]);
    return out;
  }

  /** Clean a bullet line for short context text after the link(s). */
  private trimContext(line: string): string {
    // Remove the leading bullet and any links; keep the descriptive part.
    const noBullet = line.replace(/^\s*-\s*/, '');
    const withoutLinks = noBullet.replace(/\[[^\]]+\]\([^)]+\)/g, '').trim();
    return withoutLinks.replace(/^–\s*/, '').trim();
  }

  /** Split Markdown into optional H1 + H2 sections; keep literal "## " in titles. */
  private splitIntoSections(md: string): { pageTitle: string; sections: Omit<Section,'html'|'open'>[] } {
    const lines = md.split(/\r?\n/);

    let pageTitle = '';
    let currentTitle: string | null = null;
    let currentBody: string[] = [];
    const sections: Omit<Section,'html'|'open'>[] = [];

    const flush = () => {
      if (currentTitle) {
        sections.push({ title: currentTitle, bodyMd: currentBody.join('\n') });
        currentTitle = null;
        currentBody = [];
      }
    };

    for (const raw of lines) {
      const line = raw.replace(/\s+$/,''); // trim right

      // First H1 becomes page title (optional)
      const h1 = line.match(/^#\s+(.*)$/);
      if (h1 && !pageTitle && !currentTitle && currentBody.length === 0) {
        pageTitle = h1[1].trim();
        continue;
      }

      // Each H2 begins a new section — keep "## " visible in the title
      const h2 = line.match(/^##\s+(.*)$/);
      if (h2) {
        flush();
        currentTitle = '## ' + h2[1].trim();
        continue;
      }

      if (currentTitle) currentBody.push(line);
    }
    flush();

    return { pageTitle, sections };
  }
}

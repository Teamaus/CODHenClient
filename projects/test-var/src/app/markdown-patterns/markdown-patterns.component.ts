import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

type Section = { title: string; bodyMd: string; html: string; open: boolean };

@Component({
  selector: 'app-markdown-patterns',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-body">
        <!-- Optional page title (H1) -->
        <h1 *ngIf="pageTitle" class="h1">{{ pageTitle }}</h1>

        <!-- One collapsible <details> per section -->
        <details class="panel" *ngFor="let s of sections; let i = index" [open]="s.open">
          <summary class="summary"><span class="h2">{{ s.title }}</span></summary>
          <div class="content" [innerHTML]="s.html"></div>
        </details>
      </div>
    </div>
  `,
  styles: [`
    /* Shell */
    .card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      max-width: 900px;
      margin: 12px auto;
      overflow: hidden;
    }
    .card-body { padding: 18px 22px; }

    /* Monospace font like the screenshot */
    .h1, .h2, .content { 
      font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; 
    }

    /* Headings (screenshot style) */
    .h1 {
      margin: 0 0 20px;
      font-size: 22px;
      font-weight: 700;
      color: #ef4444; /* red-500 */
      letter-spacing: .2px;
    }
    .h2 {
      display: inline-block;
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #ef4444; /* red-500 */
      letter-spacing: .2px;
    }

    /* Collapsible */
    .panel { 
      margin: 0 0 18px; 
      border-bottom: 1px solid #f1f5f9; 
      padding-bottom: 12px; 
    }
    .summary {
      list-style: none;
      cursor: pointer; user-select: none;
      padding: 6px 0;
      outline: none;
    }
    .summary::-webkit-details-marker { display: none; }
    .summary:focus-visible { outline: 3px solid #94a3b8; outline-offset: 2px; }

    /* Markdown body under each section */
    .content { padding: 8px 0 0; }
    .content ul {
      list-style: none;
      padding-left: 0;
      margin: 0 0 14px;
    }
    .content li {
      position: relative;
      padding-left: 22px;     /* room for the dash */
      margin: 6px 0;
      line-height: 1.5;
    }
    .content li::before {
      content: "–";           /* en dash bullet */
      position: absolute;
      left: 0; top: 0;
      color: #3b82f6;         /* blue-500 */
      font-weight: 700;
    }
    .content a { color: inherit; text-decoration: none; }
    .content a:hover { color: #1d4ed8; text-decoration: underline; }

    /* Motion preference */
    @media (prefers-reduced-motion: reduce) {
      .summary, .content { transition: none !important; }
    }
  `]
})
export class MarkdownPatternsComponent implements OnInit {
  // Paste/replace this Markdown anytime (H1 optional, sections start with ## or *Title*)
  md = `
# Stock Chart Patterns – August 28, 2025

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

  async ngOnInit(): Promise<void> {
    const parsed = this.splitIntoSections(this.md);
    this.pageTitle = parsed.pageTitle;

    const out: Section[] = [];
    for (let i = 0; i < parsed.sections.length; i++) {
      const s = parsed.sections[i];
      const html = await marked.parse(s.bodyMd) as string;
      out.push({ ...s, html, open: i === 0 }); // first open by default
    }
    this.sections = out;
  }

  /**
   * Split Markdown into:
   * - pageTitle: first "# ..." if present
   * - sections: groups starting with "## ..." OR a line exactly "*Title*"
   */
  private splitIntoSections(md: string): { pageTitle: string; sections: Omit<Section,'html'|'open'>[] } {
    const lines = md.split(/\r?\n/);

    let pageTitle = '';
    let title: string | null = null;
    let body: string[] = [];
    const sections: Omit<Section,'html'|'open'>[] = [];

    const flush = () => {
      if (title) {
        sections.push({ title, bodyMd: body.join('\n') });
        title = null;
        body = [];
      }
    };

    for (const raw of lines) {
      const line = raw.replace(/\s+$/,'');

      // H1 (page title)
      const h1 = line.match(/^#\s+(.*)$/);
      if (h1 && !pageTitle && !title && body.length === 0) {
        pageTitle = h1[1].trim();
        continue;
      }

      // H2 starts a new section
      const h2 = line.match(/^##\s+(.*)$/);
      if (h2) {
        flush();
        title = h2[1].trim();
        continue;
      }

      // Legacy *Italic* section title
      const it = line.match(/^\s*\*([^*]+)\*\s*$/);
      if (it) {
        flush();
        title = it[1].trim();
        continue;
      }

      if (title) body.push(line);
    }
    flush();

    return { pageTitle, sections };
  }
}

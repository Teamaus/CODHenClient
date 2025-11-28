import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

type Section = { title: string; html: string; colorClass: string; open: boolean };

@Component({
  selector: 'app-markdown-collapsible',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section aria-label="Trading patterns and strategies">
      <h2 class="app-title">CODCODA – trading patterns & strategies</h2>
    <div class="card">
      <div class="card-body">
        <details *ngFor="let s of sections; let i = index" [open]="s.open" class="panel">
          <summary class="summary" [ngClass]="s.colorClass">
            <span class="dot"></span>
            <span class="title">{{ s.title }}</span>
          </summary>
          <div class="content" [innerHTML]="s.html"></div>
          <div class="sep" *ngIf="i < sections.length - 1"></div>
        </details>
      </div>
    </div>
</section>
  `,
  styles: [`
    /* lightweight card look (no libs) */
    .card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,.04);
      max-width: 820px;
      margin: 12px auto;
      overflow: hidden;
    }
    .card-body { padding: 8px 10px; }

    /* details/summary behavior */
    .panel { padding: 4px 0; }
   .summary {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start; /* align everything left */
  padding: 10px 6px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: .2px;
}
.title {
  flex: none;          /* don’t stretch */
  text-align: left;    /* keep left aligned */
}

.chev {
  margin-left: auto;   /* push chevron to far right */
}
    .summary::-webkit-details-marker { display: none; }
    .summary:hover { background: #f8fafc; }
    .summary:focus { box-shadow: 0 0 0 2px #e2e8f0 inset; }

    .dot { width: 10px; height: 10px; border-radius: 9999px; display: inline-block; }
    .title { line-height: 1.1; }

    .content { padding: 6px 6px 10px 26px; }
    .sep { height: 1px; background: #f1f5f9; margin: 6px 2px; }

    /* markdown polish */
    .content ul { margin: 0; padding-left: 1.25rem; }
    .content li { line-height: 1.45; margin: 3px 0; }
    .content a { text-decoration: none; }
    .content a:hover { text-decoration: underline; }

    /* colored section titles */
    .c-cup   { color: #0f766e; }   .c-cup   .dot { background: #14b8a6; }
    .c-ihs   { color: #7c3aed; }   .c-ihs   .dot { background: #8b5cf6; }
    .c-rect  { color: #b45309; }   .c-rect  .dot { background: #f59e0b; }
    .c-sma   { color: #1d4ed8; }   .c-sma   .dot { background: #3b82f6; }
  `]
})
export class MarkdownCollapsibleComponent implements OnInit {
  md = `
*Cup and Handle*
- [AAPL](https://www.tradingview.com/chart/?symbol=AAPL) – resistance 246, handle forming
- [MSFT](https://www.tradingview.com/chart/?symbol=MSFT) – breakout above 398
- [TSLA](https://www.tradingview.com/chart/?symbol=TSLA) – early handle, watch above 252

*Inverted Head & Shoulders*
- [AMZN](https://www.tradingview.com/chart/?symbol=AMZN) – neckline 132, right shoulder forming
- [NVDA](https://www.tradingview.com/chart/?symbol=NVDA) – breakout pending above 920

*Rectangle (continuation)*
- [META](https://www.tradingview.com/chart/?symbol=META) – range 440–455
- [AMD](https://www.tradingview.com/chart/?symbol=AMD) – testing upper range 150

*SMA-long trend*
- [SPY](https://www.tradingview.com/chart/?symbol=SPY) – above SMA-150
- [QQQ](https://www.tradingview.com/chart/?symbol=QQQ) – bullish slope
  `.trim();

  sections: Section[] = [];

  ngOnInit(): void {
    this.sections = this.parseSections(this.md);
  }

  private parseSections(md: string): Section[] {
  const lines = md.split(/\r?\n/);

  const sections: Section[] = [];
  let currentTitle = '';
  let currentLines: string[] = [];

  const startNew = () => {
    if (!currentTitle) return;
    const html = marked.parse(currentLines.join('\n')) as string;
    sections.push({
      title: currentTitle,
      html,
      colorClass: colorFor(currentTitle),
      open: sections.length === 0  // first section open
    });
    currentTitle = '';
    currentLines = [];
  };

  const colorFor = (title: string): string => {
    const t = title.toLowerCase();
    if (t.includes('cup')) return 'c-cup';
    if (t.includes('inverted') || t.includes('shoulder')) return 'c-ihs';
    if (t.includes('rectangle')) return 'c-rect';
    if (t.includes('sma')) return 'c-sma';
    return 'c-cup';
  };

  for (const raw of lines) {
    const line = raw.trimRight();

    // Title line must be only an italic phrase: *Something*
    const m = line.match(/^\s*\*([^*]+)\*\s*$/);
    if (m) {
      // Close previous section (if any), then start a new one
      startNew();
      currentTitle = m[1].trim();
      continue;
    }

    // Otherwise, accumulate content lines (bullets, blank lines, etc.)
    if (currentTitle) currentLines.push(line);
  }

  // Flush last section
  startNew();

  return sections;
}

}

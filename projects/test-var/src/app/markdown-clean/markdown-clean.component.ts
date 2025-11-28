import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

type Section = { title: string; html: string; open: boolean };

@Component({
  selector: 'app-markdown-clean',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section aria-label="Trading patterns and strategies">
      <h2 class="app-title">CODCODA – trading patterns & strategies</h2>

      <div class="card">
        <div class="card-body">
          <details *ngFor="let s of sections; let i = index" [open]="s.open" class="panel">
            <summary class="summary">
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
    .app-title {
      font-size: 1.6rem;
      font-weight: 600;
      margin: 20px auto;
      text-align: center;
      color: #1f2937; /* neutral gray-800 */
      font-family: "Inter", "Segoe UI", sans-serif;
    }

    .card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      box-shadow: 0 1px 2px rgba(0,0,0,.04);
      max-width: 800px;
      margin: 12px auto;
      overflow: hidden;
      font-family: "Inter", "Segoe UI", sans-serif;
    }
    .card-body { padding: 8px 12px; }

    .panel { padding: 6px 0; }
    .summary {
      list-style: none;
      font-size: 1.1rem;
      font-weight: 600;
      color: #374151; /* neutral gray-700 */
      cursor: pointer;
      padding: 10px;
      border-radius: 6px;
      transition: background .15s ease;
    }
    .summary::-webkit-details-marker { display: none; }
    .summary:hover { background: #f9fafb; }
    .summary:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }

    .content { padding: 6px 12px 12px 16px; color: #111827; font-size: 0.95rem; }
    .content ul { margin: 0; padding-left: 1.2rem; }
    .content li { margin: 4px 0; line-height: 1.5; }
    .content a { color: #2563eb; text-decoration: none; }
    .content a:hover { text-decoration: underline; }

    .sep { height: 1px; background: #f3f4f6; margin: 6px 0; }
  `]
})
export class MarkdownCleanComponent implements OnInit {
  md = `
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

  sections: Section[] = [];

  ngOnInit(): void {
    this.sections = this.parseSections(this.md);
  }

  private parseSections(md: string): Section[] {
    // Split at headings (## ...)
    const blocks = md.split(/^##\s+/m).filter(Boolean);
    const sections: Section[] = blocks.map((b, i) => {
      const [titleLine, ...rest] = b.split('\n');
      const title = titleLine.trim();
      const html = marked.parse(rest.join('\n')) as string;
      return { title, html, open: i === 0 };
    });
    return sections;
  }
}

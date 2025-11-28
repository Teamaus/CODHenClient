import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-md-raw-styled',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wrap" aria-label="CODCODA – trading patterns & strategies">
      <pre class="md-source" [innerHTML]="styledMd"></pre>
    </section>
  `,
  styles: [`
    .wrap { max-width: 960px; margin: 16px auto; padding: 0 8px; }

    /* pleasant monospace stack (mac/win/linux) */
    .md-source {
      font: 500 16px/1.55 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      background: #fff;
      color: #111827;             /* default text */
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0,0,0,.04);
      padding: 18px 20px;
      margin: 0;
      white-space: pre-wrap;      /* wrap long lines */
    }

    /* colors to match your screenshot vibe */
    .tok-hash     { color: #ea580c; }  /* orange for #, ## and heading text */
    .tok-heading  { color: #ea580c; font-weight: 600; }
    .tok-dash     { color: #2563eb; }  /* blue list dash */
    .tok-text     { color: #111827; }
    .tok-link a   { color: #111827; text-decoration: none; border-bottom: 1px dotted #9ca3af; }
    .tok-link a:hover { text-decoration: underline; }
  `]
})
export class MdRawStyledComponent {
  // <-- paste your markdown here (keep the # and ##)
  private md = `
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

  // Tiny formatter: keeps raw Markdown look, but wraps tokens with spans/links for styling
  styledMd = this.renderMd(this.md);

  private renderMd(src: string): string {
    const lines = src.split(/\r?\n/);

    const esc = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,'&gt;');

    const linkify = (s: string) =>
      s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
        (_m, txt, href) => `<span class="tok-link">[<a href="${href}" target="_blank" rel="noopener noreferrer">${esc(txt)}</a>]</span>(${esc(href)})`);

    const out: string[] = [];

    for (const raw of lines) {
      if (/^#{1,6}\s+/.test(raw)) {
        // heading line -> keep hashes visible & orange
        const m = raw.match(/^(#{1,6})\s+(.*)$/)!;
        out.push(
          `<span class="tok-hash">${esc(m[1])}</span> ` +
          `<span class="tok-heading">${esc(m[2])}</span>`
        );
        continue;
      }
      if (/^\s*-\s+/.test(raw)) {
        // bullet line -> blue dash + linkified text
        const m = raw.match(/^(\s*)-\s+(.*)$/)!;
        out.push(
          `${esc(m[1])}<span class="tok-dash">-</span> ` +
          `${linkify(m[2])}`
        );
        continue;
      }
      // blank or regular text (linkify)
      out.push(linkify(esc(raw)));
    }

    return out.join('\n');
  }
}

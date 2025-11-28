import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-patterns-md-orange',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wrap">
      <h2 class="page-title">CODCODA – trading patterns & strategies</h2>

      <div class="card">
        <div class="card-body md" [innerHTML]="html"></div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 840px; margin: 16px auto; font-family: "Inter","Segoe UI",system-ui,sans-serif; }
    .page-title { text-align:center; font-weight:700; font-size:1.7rem; color:#111827; margin: 8px 0 18px; }

    .card { background:#fff; border:1px solid #e5e7eb; border-radius:14px; box-shadow:0 1px 2px rgba(0,0,0,.04); }
    .card-body { padding: 16px 20px; font-family:"Inter","Segoe UI",system-ui,sans-serif; }

    /* Markdown styling */
    .md h1, .md h2, .md h3 {
      font-weight: 700;
      font-family:"Inter","Segoe UI",system-ui,sans-serif;
      margin: 1.2em 0 0.6em;
      color: #ea580c; /* nice orange */
    }
    .md h1 { font-size: 1.6rem; }
    .md h2 { font-size: 1.3rem; }
    .md h3 { font-size: 1.1rem; }

    .md ul { margin: 0 0 1em 1.2rem; padding: 0; }
    .md li { margin: 4px 0; line-height: 1.5; }
    .md a { color: #2563eb; text-decoration: none; }
    .md a:hover { text-decoration: underline; }
  `]
})
export class PatternsMdOrangeComponent implements OnInit {
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

  html = '';

  async ngOnInit(): Promise<void> {
    this.html = await marked.parse(this.md);
  }
}

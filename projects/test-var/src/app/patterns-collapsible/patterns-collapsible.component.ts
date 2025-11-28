import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { parseMarkdown, SectionModel } from '../parseJson';

type Section = { title: string; bodyMd: string; html: string; open: boolean };

@Component({
  selector: 'app-patterns-collapsible',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-body">
        <!-- Optional H1 page title; remove the first # line in md to hide -->
        <h1 *ngIf="pageTitle" class="h1">{{ pageTitle }}</h1>

        <!-- One collapsible panel per ## section -->
        <details class="panel" *ngFor="let s of json.sections; let i = index" open="false">
          <summary class="summary" *ngIf="s.title.trim().toLowerCase() !== '## search';else searchSection">
            <span class="h2">{{ s.title }}</span>
            <span class="chev" aria-hidden="true">▾</span>
          </summary>
          <div class="content" *ngIf="s.kind== 'stocks'">
            <ul>
      <li *ngFor="let st of s.stocks">
        <label>
          <input type="checkbox" />
          <a  [href]="st.url" target="_blank" rel="noopener">{{ st.symbol }}</a>
          – {{ st.note }}
        </label>
        <button class="btn">googlesheet report</button>
      
      </li>
    </ul>
          </div>
          <!--<div class="content" [innerHTML]="s.html" *ngIf="s.title.trim().toLowerCase() !== '## search'" ></div>-->
        </details>
      </div>
    </div>
    <ng-template #searchSection>
        <summary class="summary">
            <span class="search-h2">## Search
                <input
          type="text"
          placeholder="Type ticker or criteria or 'marked' to see your selection..."
          class="search-input"
        />
        <button type="button" class="btn">
          Search
        </button>
        
    
           
          </span>
          <!--<div class="content"></div>-->

          </summary>
          <hr/>
          
    </ng-template>
  `,
  styles: [`
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

    /* Page title (neutral) */
    .h1 {
      margin: 0 0 20px;
      font-size: 22px;
      font-weight: 700;
      color: #111827;
      letter-spacing: .2px;
    }

    /* ORANGE section titles (literal "## " included in text) */
    .h2 {
      display: inline-block;
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #e68e2aff; /* orange-600 */
      letter-spacing: .2px;
      white-space: pre; /* preserves the space after ## */
    }

    /* Collapsible summary row */
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
    .summary:hover { background: #fff7ed; } /* subtle orange-tinted hover */
    .summary:focus-visible { outline: 3px solid #fed7aa; outline-offset: 2px; }
    .chev { color: #d97706; transition: transform .15s ease; font-weight: 700; }
    details[open] .chev { transform: rotate(180deg); }

    /* List body (blue en–dash bullets, like screenshot) */
    .content { padding: 8px 0 0; }
    .content ul { list-style: none; padding-left: 0; margin: 0 0 14px; }
    .content li {
      position: relative;
      padding-left: 22px; margin: 6px 0; line-height: 1.5;
    }
    .content li::before {
      content: "–"; position: absolute; left: 0; top: 0;
      color: #3b82f6; font-weight: 700;
    }
    .content a { color: inherit; text-decoration: none; }
    .content a:hover { color: #1d4ed8; text-decoration: underline; }
    .search-inline {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto; /* push to the right side */
}

.search-input {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 4px 6px;
  font-family: inherit;
  font-size: 14px;
}
.search-input:focus {
  border-color: #f59e0b;
  outline: none;
  box-shadow: 0 0 0 2px #fde68a;
}

    @media (prefers-reduced-motion: reduce) {
      .summary, .chev { transition: none !important; }
    }
    /* Looks like .h2, but is a flex row with a growing input */
.search-h2 {
  /* h2 look */
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #e68e2aff;            /* orange-600 */
  letter-spacing: .2px;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  white-space: pre;            /* keep the '## ' spacing */

  /* layout */
  display: flex; 
  align-items: center; 
  gap: 8px;
  flex: 1 1 auto;              /* lets it expand inside .summary (which is flex) */
}

/* Growing input */
.search-h2 input[type="text"] {
  flex: 1 1 auto;              /* this makes it grow */
  min-width: 0;                /* allow shrink in flex containers */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 10px;
  font: inherit;               /* same monospace */
  font-weight: 400;            /* normal text weight inside field */
}

/* Optional button styling (matches your existing .btn look) */
.search-h2 .btn {
  border: 1px solid #f59e0b;
  background: #f59e0b10;
  color: #92400e;
  padding: 8px 10px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.search-h2 .btn:hover { background: #f59e0b20; }

  `]
})

export class PatternsCollapsibleComponent implements OnInit {
    
  md = `
# CODCODA Chart Patterns & Trading Strategies – ${new Date()}
## Search 
-[AAPL](https://www.tradingview.com/chart/?symbol=AAPL) – (Cup and Handle) resistance 246, handle forming
-[AMD](https://www.tradingview.com/chart/?symbol=AMD) – (Rectangle) testing upper range 150
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
  json:{pageTitle:string,sections:SectionModel[]}  = {pageTitle:"",sections:[]}

  async ngOnInit(): Promise<void> {
    const { pageTitle, sections } = this.splitIntoSections(this.md);
    this.json = parseMarkdown(this.md)
    console.log("JSON:",this.json)
    this.pageTitle = pageTitle;

    const out: Section[] = [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      const parsedhtml = await marked.parse(s.bodyMd) as string;
      const html=parsedhtml
      
      out.push({ ...s, html, open: i === 0 }); // open first by default
    }
    this.sections = out;
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
        currentTitle = '## ' + h2[1].trim(); // <-- keep literal ## in the title
        continue;
      }
      
      if (currentTitle) currentBody.push(line);
    }
    flush();

    return { pageTitle, sections };
  }
}
